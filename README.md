# Unsure

`Unsure` is a library for creating operations on uncertain or ambiguous values, utilizing an inference endpoint to determine transformations and comparisons. It's meant to leverage ai while yielding predictable and invariant results.

## Installation

To install the package, run:

```bash
npm install unsure-js
```

## Configuration

All that needs to be configured is the inference endpoint.

### Through API Key

It supports Groq apis and OpenAi apis for now, so a groqApiKey can be provided like this

```Typescript

import { Unsure, configGlobalUnsure } from 'unsure-js';

configGlobalUnsure({ groqApiKey: 'your key here' });

```
and for openAi

```Typescript

import { Unsure, configGlobalUnsure } from 'unsure-js';

configGlobalUnsure({ openAiApiKey: 'your key here' });

```

### Through and inference function

```Typescript

import { Unsure, configGlobalUnsure } from 'unsure-js';

function inferenceEndpoint(q: string): Promise<string> {
    // any function returns a string here, you can call openAI, Gemini, Claude, or your own model, just return a string;
}

configGlobalUnsure({ inferenceEndpoint });

```

## Usage

Once it's configured you can start using the operators just like this

### Is operator:
Checks equality. Example:

```Typescript
import { Unsure, configGlobalUnsure } from 'unsure-js';

configGlobalUnsure({ groqApiKey: 'your key here' });

console.log(await Unsure("Lion").is("Mammal")) // true

```

### Pick operator:
Picks an information from a string. Example:

```Typescript
import { Unsure, configGlobalUnsure } from 'unsure-js';

configGlobalUnsure({ groqApiKey: 'your key here' });

console.log(await Unsure("Contact Number: +1-800-555-5555").pick("phone number")); // "+1-800-555-5555"
console.log(await Unsure("Phone: +1-800-555-5555").pick("phone number")); // "+1-800-555-5555"
console.log(await Unsure("Call us at +1-800-555-5555").pick("phone number")); // "+1-800-555-5555"

```

### Categorize operator:
Categorizes the string into the given categories. Example:

```Typescript
import { Unsure, configGlobalUnsure } from 'unsure-js';

configGlobalUnsure({ groqApiKey: 'your key here' });

console.log(await Unsure("Sky").categorize(["blue", "green"])); // "blue"
console.log(await Unsure("Grass").categorize(["blue", "green"])); // "green"

```

### flatMapTo operator:
Transforms the string into what's demanded. Example:

```Typescript
import { Unsure, configGlobalUnsure } from 'unsure-js';

configGlobalUnsure({ groqApiKey: 'your key here' });

console.log(await Unsure("Response: {\"key\": \"should get this\"}").flatMapTo("key's value")); //"should get this"
console.log(
    await Unsure("HTML Content: <html><body><div class=\"scrapable\">Target Content<div></body></html>")
    .flatMapTo("contain of the div with the class scrapable")
); // "target content"
console.log(await Unsure("Favorite Color: #FF5733").flatMapTo("color in hex")); // "#ff5733"
console.log(await Unsure("Order Total: 12345 USD").flatMapTo("price")); // "12345"

```

### mapTo operator:
Transforms the string into what's demanded but returns an Unsure, so it's chainable. Example:

```Typescript
import { Unsure, configGlobalUnsure } from 'unsure-js';

configGlobalUnsure({ groqApiKey: 'your key here' });

console.log(await Unsure("Amount: 200.23 $").mapTo("number").mapTo("integer").flat()); //"200";
```

### flat operator:
Returns either the changed transformation's result or the initial value if no mapTo was used. Example:

```Typescript
import { Unsure, configGlobalUnsure } from 'unsure-js';

configGlobalUnsure({ groqApiKey: 'your key here' });

console.log(await Unsure("Amount: 200.23 $").mapTo("number").mapTo("integer").flat()); //"200";
console.log(await Unsure("Some value").flat()); //"Some value";
```

## Options
`inferenceEndpoint`: The function that will be called in the operators.
`groqApiKey`: The Api key that will be used to call groq APIs using llama3-70b-8192 model.
`openAiApiKey`: The Api key that will be used to call Open Ai APIs using gpt-3.5-turbo.
`model`: You can specify the model you want to use, for open source models llama3-70b-8192 works best which is the default. 
`preventLowerCase`: Prevents lowercasing the inference response.

Note: If both `inferenceEndpoint` and `groqApiKey` are provided `inferenceEndpoint` will be used.

## Create and insure instance
You might have noticed so far that a global Unsure instance is used. You can also create your own
instance with it's own configuration.

```Typescript
import { Unsure, createUnsure } from 'unsure-js';

configGlobalUnsure({ groqApiKey: 'your key here' });

const myUnsure = createUnsure({ openAiApiKey: 'your key here' });

console.log(await Unsure("Amount: 200.23 $").mapTo("number").mapTo("integer").flat()); // Uses Groq;
console.log(await myUnsure("Some value").flat()); // Uses OpenAi Apis;
```

## Other languages implementation
[Python](https://github.com/MeddahAbdellah/unsurepy) - by @meddahabdellah
[Rust](https://github.com/HughBlackledge/unsure-rust) - by @HughBlackledge

## License
This project is under the ISC license. Requests and contributions are most welcomed.