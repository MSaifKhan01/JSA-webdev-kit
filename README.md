

---

# jsa-webdev-kit

`jsa-webdev-kit` is a lightweight utility library designed to simplify web development. It includes functions for generating unique IDs, formatting dates, and interacting with OpenAI's GPT models for generative AI tasks.

I am working to enhance this library and add more functionality.

---

## Installation

Install the package via npm:

```bash
npm install jsa-webdev-kit
```

---

## Features

- **`UniqueIdFn`**: Generates unique IDs with customizable length, grouping, and separators.
- **`getFormattedDateTime`**: Formats the current date and time in multiple styles.
- **`aiAgent`**: Provides an interface to interact with OpenAI's GPT models for structured and generative AI responses.



      **`I am working to enhance this library and add more functionality.`**

---

## Functions

### 1. `UniqueIdFn`

Generates a unique ID with customizable length, grouping, and separators.

#### Parameters

- **`length`** (optional, `number`, default: `20`): Total length of the unique ID.
- **`groupLength`** (optional, `number`, default: `4`): Length of each group in the ID.
- **`separator`** (optional, `string`, default: `""`): Character used to separate groups.

#### Example Usage

```javascript
const { UniqueIdFn } = require("jsa-webdev-kit");

// Generate a unique ID with a hyphen as separator
const uniqueId = UniqueIdFn(25, 5, "-");
console.log(uniqueId); // Output: "abcde-fghij-klmno-pqrst-uvwxy"

// Generate a unique ID without a separator
const uniqueId2 = UniqueIdFn(10, 4);
console.log(uniqueId2); // Output: "m5pi6ks9rm"

// Generate a unique ID with a custom length and no separator
const uniqueId3 = UniqueIdFn(15, 5, "");
console.log(uniqueId3); // Output: "abcde12345fghij"
```

---

### 2. `getFormattedDateTime`

Formats the current date and time into various styles for different use cases.

#### Parameters

- **`format`** (optional, `string`, default: `'ISO'`): Specifies the desired format for the date and time.

#### Available Format Options

| **Format**    | **Description**                                                  | **Example**                  |
|---------------|------------------------------------------------------------------|------------------------------|
| `'ISO'`       | ISO-8601 format.                                                | `2025-01-13T15:30:45.123Z`  |
| `'short'`     | Short date format.                                              | `01/13/2025`                |
| `'long'`      | Full date with weekday name.                                     | `Monday, January 13, 2025`  |
| `'24h'`       | Military (24-hour) time.                                        | `15:30`                     |
| `'12h'`       | 12-hour clock format with AM/PM.                                | `03:30 PM`                  |
| `'full'`      | Full date and time in a human-readable format.                  | `Monday, January 13, 2025 15:30:45` |
| `'unix'`      | Unix timestamp (seconds since epoch).                           | `1736814645`                |
| `'custom'`    | Custom slash-separated format.                                  | `2025/01/13`                |
| `'dash'`      | Dash-separated format.                                          | `13-01-2025`                |
| `'rfc'`       | RFC-1123 format for email headers.                              | `Mon, 13 Jan 2025 15:30:45 GMT` |
| `'human'`     | Localized human-readable format.                                | `1/13/2025, 3:30:45 PM`     |

#### Example Usage

```javascript
const { getFormattedDateTime } = require("jsa-webdev-kit");

// Get current date in ISO format
console.log(getFormattedDateTime("ISO")); // Output: "2025-01-13T15:30:45.123Z"

// Get current date in short format
console.log(getFormattedDateTime("short")); // Output: "01/13/2025"

// Get current time in 12-hour clock format
console.log(getFormattedDateTime("12h")); // Output: "03:30 PM"

// Get current date in custom dash-separated format
console.log(getFormattedDateTime("dash")); // Output: "13-01-2025"
```

---

### 3. `aiAgent`

Interacts with OpenAI's GPT models to generate structured and detailed responses to user queries.

#### Parameters

- **`apiKey`** (`string`): OpenAI API key (required).
- **`userQuestion`** (`string`): The user's input question or request (required).
- **`defaultTemplate`** (`string`, optional): A default template to format responses.
- **`model`** (`string`, default: `"gpt-3.5-turbo"`): OpenAI model to use.
- **`maxTokens`** (`number`, default: `300`): Maximum number of tokens in the response.
- **`temperature`** (`number`, default: `0.7`): Sampling temperature for response generation.


#### Example Usage

```javascript
const { aiAgent } = require("jsa-webdev-kit");

const apiKey = "**-**************"; // Replace with your OpenAI API key
const userQuestion = "What is Jaundice?";

async function main() {
    try {
        const answer = await aiAgent(apiKey, userQuestion);
        console.log("AI Response:\n", answer);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();
```

**Output Example:**
```
AI Response:
- **Introduction:** Machine learning is a branch of artificial intelligence (AI) that focuses on building systems that learn from data and improve from experience without being explicitly programmed.
- **Definition:** Machine learning involves algorithms that identify patterns in data to make predictions or decisions.
- **Details/Types:** Machine learning is categorized into supervised learning (e.g., classification), unsupervised learning (e.g., clustering), and reinforcement learning (e.g., decision-making).
- **Examples/Applications:** Examples include recommendation systems, fraud detection, self-driving cars, and medical diagnosis systems.
- **Summary:** Machine learning leverages data-driven techniques to enable systems to learn and adapt automatically, offering versatile applications across industries.
```


**Example Usage with User-Defined Template**
```javascript
const { aiAgent } = require("jsa-webdev-kit");
const apiKey = "**-**************"; // Replace with your OpenAI API key
const userQuestion = "What is Jaundice?";
const customTemplate = `
You are a domain expert in AI and machine learning. Provide answers in this format:
- **Overview:** Give a quick summary of the topic.
- **Details:** Explain in-depth, including any technical terms.
- **Real-world Applications:** Mention practical use cases.
- **Conclusion:** Provide a brief wrap-up or additional suggestions.
`;

async function main() {
    try {
        const answer = await aiAgent(apiKey, userQuestion,customTemplate);
        console.log("AI Response:\n", answer);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();
```


**Output Example:**
```
AI Response:
 - **Overview:** Jaundice is a medical condition characterized by yellowing of the skin and whites of the eyes, caused by high levels of bilirubin in the blood.

- **Details:** Bilirubin is a yellow pigment produced during the normal breakdown of red blood cells in the liver. In cases where the liver is unable to process bilirubin efficiently, it accumulates in the blood, leading to jaundice. This condition can occur due to various reasons, such as liver disease, bile duct obstruction, or excessive breakdown of red blood cells.

- **Real-world Applications:**
   1. **Medical Diagnosis:** Jaundice is often used as a clinical indicator of underlying health issues, prompting further investigation and diagnosis.
   2. **Neonatal Jaundice Management:** In newborns, jaundice is common due to an immature liver. Monitoring bilirubin levels and providing phototherapy are common practices to manage neonatal jaundice.  
   3. **Liver Disease Monitoring:** Jaundice can be a symptom of liver diseases like hepatitis or cirrhosis. Monitoring and managing bilirubin levels play a crucial role in the treatment and management of these conditions.

- **Conclusion:** Jaundice is a common medical condition that serves as a visible indicator of liver function and other health issues. Understanding the underlying causes and appropriate management strategies are crucial in providing effective care for individuals affected by jaundice.
```
---

## Contributing

Feel free to contribute to this library by submitting issues or pull requests on the [GitHub repository](https://github.com/MSaifKhan01/JSA-webdev-kit).

---

## License

This project is licensed under the [MIT License](LICENSE).

--- 

