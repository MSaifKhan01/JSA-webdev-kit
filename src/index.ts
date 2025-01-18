

//-------------UniqId----------------//

export function UniqueIdFn(length: number = 20, groupLength: number = 4, separator: string = ""): string {
    if (typeof length !== 'number' || length <= 0) {
        throw new Error("The length parameter must be a positive number.");
    }

    const formatId = (id: string, groupLength: number, separator: string): string => {
        const regex = new RegExp(`.{1,${groupLength}}`, 'g');
        let formatted = id.match(regex)?.join(separator) || '';

        // Ensure the length matches the input length with separator
        if (separator && formatted.length > length) {
            formatted = formatted.substring(0, length);
        }
        return formatted;
    };

    const generateRandomId = (): string => {
        // Calculate the raw length without separator
        const hyphenCount = separator ? Math.floor((length - 1) / (groupLength + separator.length)) : 0;
        const rawLength = length - (hyphenCount * separator.length);

        let date = Date.now().toString(36);
        let random = Math.random().toString(36).substr(2, rawLength - date.length);
        let rawId = (date + random).substring(0, rawLength);

        while (rawId.length < rawLength) {
            rawId += Math.random().toString(36).substr(2, rawLength - rawId.length);
        }

        const formattedId = formatId(rawId, groupLength, separator);
        return formattedId;
    };

    return generateRandomId();
}




//-------------------Data-Time-Formate--------------------//
export function getFormattedDateTime(format: string = 'ISO'): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ms = String(now.getMilliseconds()).padStart(3, '0');

    switch (format.toLowerCase()) {
        case 'iso':
        case 'standard':
            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${ms}Z`;
        case 'short':
        case 'date':
            return `${month}/${day}/${year}`;
        case 'long':
        case 'fulldate':
            return now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        case '24h':
        case 'military':
            return `${hours}:${minutes}`;
        case '12h':
        case 'clock':
            const hour12 = now.getHours() % 12 || 12;
            const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
            return `${String(hour12).padStart(2, '0')}:${minutes} ${ampm}`;
        case 'full':
        case 'log':
            return now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) +
                ` ${hours}:${minutes}:${seconds}`;
        case 'unix':
        case 'epoch':
            return Math.floor(now.getTime() / 1000).toString();
        case 'custom':
        case 'slash':
            return `${year}/${month}/${day}`;
        case 'dash':
            return `${day}-${month}-${year}`;
        case 'rfc':
        case 'email':
            return now.toUTCString();
        case 'human':
            return now.toLocaleString();
        case 'time':
            return `${hours}:${minutes}:${seconds}`;
        case 'dateonly':
            return `${year}-${month}-${day}`;
        case 'datetime':
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        default:
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}







// const { OpenAI } = require('openai');

// //-------------------Generative AI Agent--------------------//
// export async function aiAgent(apiKey: string, userQuestion: string, defaultTemplate?: string): Promise<string> {
//     // Validate inputs
//     if (!apiKey) {
//         throw new Error("API key is required.");
//     }

//     if (!userQuestion) {
//         throw new Error("userQuestion is required.");
//     }

//     // Build the readyTemplate
//     const readyTemplate = `
//     Question: ${userQuestion}
//     ${defaultTemplate || `
//     You are a mentor who provides clear, detailed, and structured answers. Always respond in the following format:
//     - **Introduction:** Start with a brief introduction to the topic.
//     - **Definition:** Provide a concise definition or explanation.
//     - **Details/Types:** If applicable, provide more details, including types or variations.
//     - **Examples/Applications:** Share practical examples or real-world applications.
//     - **Summary:** End with a short, user-friendly summary.

//     If the question does not fit this format, adapt your response accordingly while maintaining clarity and depth.
//     `}
//     `;

//     // Initialize OpenAI client
//     const openai = new OpenAI({ apiKey });

//     try {
//         // Generate a response from OpenAI
//         const response = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [
//                 { role: "system", content: "You are a helpful and structured mentor." },
//                 { role: "user", content: readyTemplate }
//             ],
//             max_tokens: 300,
//             temperature: 0.7,
//         });

//         // Extract and return the response content
//         return response.choices?.[0]?.message?.content?.trim() || "No response generated.";
//     } catch (error) {
//         console.error("Error in AI Agent:", error);
//         throw new Error("Failed to generate AI response.");
//     }
// }






const { OpenAI } = require('openai');

//-------------------Generative AI Agent--------------------//
export async function aiAgent(
    apiKey: string,
    userQuestion: string,
    defaultTemplate?: string,
    model: string = "gpt-3.5-turbo",
    maxTokens: number = 300,
    temperature: number = 0.7
): Promise<string> {
    // Validate inputs
    if (!apiKey) {
        throw new Error("API key is required.");
    }

    if (typeof userQuestion !== "string" || userQuestion.trim().length === 0) {
        throw new Error("Valid userQuestion is required.");
    }

    if (maxTokens <= 0) {
        throw new Error("maxTokens must be a positive number.");
    }

    if (temperature < 0 || temperature > 1) {
        throw new Error("Temperature must be between 0 and 1.");
    }

    // Build the readyTemplate
    const templateToUse = defaultTemplate || `
    You are a mentor who provides clear, detailed, and structured answers. Always respond in the following format:
    - **Introduction:** Start with a brief introduction to the topic.
    - **Definition:** Provide a concise definition or explanation.
    - **Details/Types:** If applicable, provide more details, including types or variations.
    - **Examples/Applications:** Share practical examples or real-world applications.
    - **Summary:** End with a short, user-friendly summary.

    If the question does not fit this format, adapt your response accordingly while maintaining clarity and depth.
    `;

    const readyTemplate = `
    Question: ${userQuestion}
    ${templateToUse}
    `.trim();

    // Initialize OpenAI client
    const openai = new OpenAI({ apiKey });

    try {
        // Generate a response from OpenAI
        const response = await openai.chat.completions.create({
            model,
            messages: [
                { role: "system", content: "You are a helpful and structured mentor." },
                { role: "user", content: readyTemplate }
            ],
            max_tokens: maxTokens,
            temperature,
        });

        // Extract and return the response content
        return response.choices?.[0]?.message?.content?.trim() || "No response generated.";
    } catch (error) {
        console.error("Error in AI Agent:", error);
        throw new Error(`Failed to generate AI response: ${error.message}`);
    }
}




// -------------- BackendStorageManager with Redis Client as Parameter (TypeScript) -------------- //

export const backendStorageManager = {
    /**
     * Sets a key-value pair in Redis with an optional expiration time.
     * Default expiry time is 3600 seconds (1 hour).
     */
    set: async (redisClient: any, key: string, value: any, expiryInSeconds: number | null = 3600): Promise<void> => {
        try {
            // Fetch existing data from Redis
            const data = await redisClient.get(key);
            let parsedData = data ? JSON.parse(data) : []; // If data exists, parse it; otherwise, initialize an empty array

            // Make sure that parsedData is an array before using push
            if (!Array.isArray(parsedData)) {
                parsedData = [];
            }

            // Always wrap the value in an array and then push it
            parsedData.push(value);

            // Serialize the updated array back to JSON format
            const stringValue = JSON.stringify(parsedData);

            // Set key in Redis with or without expiry time
            if (expiryInSeconds) {
                await redisClient.set(key, stringValue, 'EX', expiryInSeconds); // Set key with expiry
            } else {
                await redisClient.set(key, stringValue); // Set key without expiry
            }
        } catch (error) {
            console.error('Error setting key in Redis:', error);
            throw error; // Re-throw error for handling at a higher level
        }
    },

    /**
     * Retrieves a value from Redis by its key.
     */
    get: async (redisClient: any, key: string): Promise<any | null> => {
        try {
            const data = await redisClient.get(key); // Fetch the data from Redis
            return data ? JSON.parse(data) : null; // Parse and return JSON data, or null if not found
        } catch (error) {
            console.error('Error getting key from Redis:', error);
            return null; // Return null on error
        }
    },

    /**
     * Removes a key-value pair from Redis.
     */
    remove: async (redisClient: any, key: string): Promise<void> => {
        try {
            await redisClient.del(key); // Delete the key from Redis
        } catch (error) {
            console.error('Error removing key from Redis:', error);
        }
    },

    /**
     * Clears all keys and data in the Redis instance.
     * WARNING: Use with caution as this will delete all data from Redis.
     */
    clearAll: async (redisClient: any): Promise<void> => {
        try {
            await redisClient.flushAll(); // Clear all keys and data from Redis
        } catch (error) {
            console.error('Error clearing all data in Redis:', error);
        }
    },
};






// -------------- Local Storage / Session Storage Manager -------------- //

type StoreType = 'loc' | 'ses'; // Restrict storeType to only 'loc' or 'ses'

export const storageManager = {
    /**
     * Sets a key-value pair with an optional expiry time.
     * Default expiry time for local/session storage is 86400000ms (1 day).
     */
    set: (key: string, value: any, expiryInMs: number | null = 86400000, storeType: StoreType = 'loc'): void => {
        const data = { value, expiry: expiryInMs ? Date.now() + expiryInMs : null };
        if (storeType === 'ses') {
            sessionStorage.setItem(key, JSON.stringify(data));
        } else {
            localStorage.setItem(key, JSON.stringify(data));
        }
    },

    /**
     * Retrieves a value from local/session storage by its key.
     */
    get: (key: string, storeType: StoreType = 'loc'): any | null => {
        const storage = storeType === 'ses' ? sessionStorage : localStorage;
        const data = JSON.parse(storage.getItem(key) as string);
        if (!data) return null;

        // Check for expiry
        if (data.expiry && Date.now() > data.expiry) {
            storage.removeItem(key); // Clean up expired data
            return null;
        }
        return data.value;
    },

    /**
     * Removes a key-value pair from local/session storage.
     */
    remove: (key: string, storeType: StoreType = 'loc'): void => {
        const storage = storeType === 'ses' ? sessionStorage : localStorage;
        storage.removeItem(key);
    },

    /**
     * Clears all keys and data from local/session storage.
     */
    clearAll: (storeType: StoreType = 'loc'): void => {
        if (storeType === 'ses') {
            sessionStorage.clear();
        } else {
            localStorage.clear();
        }
    },
};
