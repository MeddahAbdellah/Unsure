function defaultInferenceEndpoint(
  groqApiKey?: string
): (q: string) => Promise<string> {
  return async (q: string) => {
    const apiKey = groqApiKey;
    const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
    const requestBody = {
      model: 'llama3-70b-8192',
      messages: [
        {
          role: 'assistant',
          content: 'Your answers must be consise',
        },
        {
          role: 'assistant',
          content: q,
        },
      ],
      temperature: 0.1,
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

type Unsure<T, C extends string[]> = {
  is: (op2: string) => Promise<boolean>;
  explainIs: (op2: string) => Promise<string>;
  flatMapTo: (op2: string) => Promise<string>;
  mapTo: (op2: string) => Promise<Unsure<T, C>>;
  categorize: (op2: C) => Promise<C[number]>;
  pick: (op2: string) => Promise<string>;
  value: string;
};

type UnsureFn<T, C extends string[]> = (op1: T) => Unsure<T, C>;
let Unsure: UnsureFn<string | number, string[]>;

type options = {
  inferenceEndpoint?: (q: string) => Promise<string>;
  groqApiKey?: string;
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
    inferenceEndpoint = defaultInferenceEndpoint(options.groqApiKey);
  } else {
    throw new Error('An inference endpoint must be configured');
  }
  return <T extends string | number, C extends string[]>(op1: T) => ({
    is: async (op2: string) => {
      return (
        await inferenceEndpoint(
          `Only answer with True or False. Is ${op1} a/an/equal to ${op2}`
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
    mapTo: async (op2: string) => {
      return Unsure((await inferenceEndpoint(
        `Transform "${op1}" to "${op2}". Answer with only one value, no extra text, if you give extra text, the answer is useless.`
      )).toLowerCase());
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
