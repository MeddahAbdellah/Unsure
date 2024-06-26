type SystemPromptRole = 'assistant' | 'system';

function defaultInferenceEndpoint(
  apiKey?: string,
  model: string = 'llama3-70b-8192',
  apiUrl : string = 'https://api.groq.com/openai/v1/chat/completions',
  systemPromptRole: SystemPromptRole = 'assistant'
): (q: string) => Promise<string> {
  return async (q: string) => {
    const requestBody = {
      model,
      messages: [
        {
          role: systemPromptRole,
          content: 'Your answers must be concise.',
        },
        {
          role: 'user',
          content: q,
        },
      ],
      temperature: 0,
    };
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()).choices[0].message.content;
    return data;
  };
}

const defaultGroqInferenceEndpoint = (groqApiKey:string,model:string='llama3-70b-8192') => defaultInferenceEndpoint(groqApiKey, model, 'https://api.groq.com/openai/v1/chat/completions','assistant');

const defaultOpenAiChatGpt4Endpoint = (openAiApiKey:string,model:string='gpt-3.5-turbo') => defaultInferenceEndpoint(openAiApiKey, model, 'https://api.openai.com/v1/chat/completions','system');

type Unsure<T, C extends string[]> = {
  is: (op2: string) => Promise<boolean>;
  explainIs: (op2: string) => Promise<string>;
  flatMapTo: (op2: string) => Promise<string>;
  mapTo: (op2: string) => Unsure<T, C>;
  flat: () => Promise<string>;
  categorize: (op2: C) => Promise<C[number]>;
  pick: (op2: string) => Promise<string>;
  value: string;
};

type UnsureFn<T, C extends string[]> = (op1: T, mapToOp2List?: string[]) => Unsure<T, C>;
let Unsure: UnsureFn<string | number, string[]>;

type options = {
  inferenceEndpoint?: (q: string) => Promise<string>;
  groqApiKey?: string;
  openAiApiKey?: string;
  model?: string;
  preventLowerCase?: boolean;
};
function configGlobalUnsure(options: options): void {
  Unsure = createUnsure(options);
}

function createUnsure(options: options) {
  let inferenceEndpoint;
  if (options?.inferenceEndpoint) {
    inferenceEndpoint = options.inferenceEndpoint;
  } else if (options?.groqApiKey) {
    inferenceEndpoint = defaultGroqInferenceEndpoint(options.groqApiKey, options.model);
  } else if (options?.openAiApiKey) {
    inferenceEndpoint = defaultOpenAiChatGpt4Endpoint(options.openAiApiKey, options.model);
  }
  else {
    throw new Error('An inference endpoint must be configured');
  }
  return <T extends string | number, C extends string[]>(op1: T, mapToOp2List?: string[]) => ({
    is: async (op2: string) => {
      return (
        await inferenceEndpoint(
          `Only answer with True or False. ${op1} is a/an ${op2}`
        )
      )
        .toLowerCase()
        .includes('true');
    },
    closeTo: async (op2: string) => {
      return (
        await inferenceEndpoint(
          `Only answer with True or False. Is ${op1} close in meaning to ${op2}`
        )
      )
        .toLowerCase()
        .includes('true');
    },
    explainIs: async (op2: string) => {
      return await inferenceEndpoint(
        `Is "${op1}" a/an/equal to "${op2}" and why ?`
      );
    },
    mapTo: (op2: string) => {
      if (!mapToOp2List) {
        return Unsure(op1.toString(), [op2]);
      }
      mapToOp2List.push(op2);
      return Unsure(op1.toString(), mapToOp2List);
    },
    flat: async () => {
      let result = op1.toString();
      if (!mapToOp2List) {
        return result;
      }
      for (const op2 of mapToOp2List) {
        result = await inferenceEndpoint(`Transform "${result}" to "${op2}". Answer with only one value, no extra text, if you give extra text, the answer is useless.`);
      }
      return options.preventLowerCase ? result : result.toLowerCase();
    },
    flatMapTo: async (op2: string) => {
      const response = await inferenceEndpoint(
        `Transform "${op1}" to "${op2}". Answer with only one value, no extra text, if you give extra text, the answer is useless.`
      );
      return options.preventLowerCase ? response : response.toLowerCase();
    },
    categorize: async (op2: C) => {
      const response = await inferenceEndpoint(
        `From these categories "${op2.join(
          ', '
        )}". In which category "${op1}" fits. Answer with only one value, no extra text, if you give extra text, the answer is useless.`
      );
      return options.preventLowerCase ? response : response.toLowerCase();
    },
    pick: async (op2: string) => {
      const response = await inferenceEndpoint(
        `From this text "${op2}". Pick the value of "${op1}". Answer with only one value, no extra text, if you give extra text, the answer is useless.`
      );
      return options.preventLowerCase ? response : response.toLowerCase();
    },
    value: op1.toString(),
  });;
}

export { Unsure, configGlobalUnsure, createUnsure };
