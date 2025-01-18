
---



## Introduction

This document explains how to use two types of storage managers: the **BackendStorageManager** (for Redis) and the **StorageManager** (for LocalStorage and SessionStorage). Both classes handle key-value pair storage in different environments (backend using Redis and frontend using local/session storage). This guide provides step-by-step instructions on how to use these classes, along with example code snippets for implementation.

---

## Backend Storage Manager (Redis)

### Setup
To use the **BackendStorageManager**, you first need to initialize a Redis client and then pass it to the functions provided in the manager.

```ts
const { backendStorageManager } = require('jsa-webdev-kit');
```

### Functions in BackendStorageManager

1. **set(redisClient: any, key: string, value: any, expiryInSeconds: number | null = 3600): Promise<void>**
   - **Purpose**: Saves a key-value pair to Redis. The value is stored as an array, and new data is pushed to the array.
   - **Parameters**:
     - `redisClient`: Your initialized Redis client.
     - `key`: The key under which the data will be stored.
     - `value`: The value to be stored (which will be added to an array).
     - `expiryInSeconds`: Optional expiry time for the key (default is 3600 seconds).
   - **Example**:
     ```ts
     const Redis = require('ioredis');

     // Replace the placeholders with your actual Redis connection details
     const redisClient = new Redis({
         host: 'your-REDIS-HOST-URL',       // Redis server host
         port: 'your-REDIS-PORT',           // Redis server port (default is 6379)
         password: 'your-REDIS-PASSWORD',   // Redis password if authentication is required
         enableOfflineQueue: true,          // Temporarily enables the offline queue
         showFriendlyErrorStack: true       // Provides better error messages
     });

     // Set data in Redis with 1-hour expiry
     backendStorageManager.set(redisClient, 'user:123', { name: 'John Doe' }, 3600);
     ```

2. **get(redisClient: any, key: string): Promise<any | null>**
   - **Purpose**: Retrieves the value stored under the specified key in Redis.
   - **Parameters**:
     - `redisClient`: Your initialized Redis client.
     - `key`: The key for which the value is to be fetched.
   - **Example**:
     ```ts
     const userData = await backendStorageManager.get(redisClient, 'user:123');
     console.log(userData);  // [{ name: 'John Doe' }]
     ```

3. **remove(redisClient: any, key: string): Promise<void>**
   - **Purpose**: Removes the key-value pair from Redis.
   - **Parameters**:
     - `redisClient`: Your initialized Redis client.
     - `key`: The key to be removed.
   - **Example**:
     ```ts
     await backendStorageManager.remove(redisClient, 'user:123');
     ```

4. **clearAll(redisClient: any): Promise<void>**
   - **Purpose**: Clears all keys and data from the Redis instance.
   - **Parameters**:
     - `redisClient`: Your initialized Redis client.
   - **Example**:
     ```ts
     await backendStorageManager.clearAll(redisClient);
     ```

---

## Frontend Storage Manager (LocalStorage / SessionStorage)

### Setup
In the frontend, you can use **StorageManager** to store data in either **localStorage** or **sessionStorage**. You just need to specify which storage to use.

```ts
const { storageManager } = require('jsa-webdev-kit');
```

### Functions in StorageManager

1. **set(key: string, value: any, expiryInMs: number | null = 86400000, storeType: StoreType = 'loc'): void**
   - **Purpose**: Saves a key-value pair in either local or session storage with an optional expiry time.
   - **Parameters**:
     - `key`: The key under which the data will be stored.
     - `value`: The value to be stored.
     - `expiryInMs`: Optional expiry time for the data (default is 1 day).
     - `storeType`: Specifies which storage to use (`'loc'` for localStorage, `'ses'` for sessionStorage).
   - **Example**:
     ```ts
     // Store data in localStorage with 1-day expiry
     storageManager.set('user:123', { name: 'John Doe' });

     // Store data in sessionStorage with 1-hour expiry
     storageManager.set('tempData', { temp: true }, 3600000, 'ses');
     ```

2. **get(key: string, storeType: StoreType = 'loc'): any | null**
   - **Purpose**: Retrieves a value from either localStorage or sessionStorage.
   - **Parameters**:
     - `key`: The key for which the value is to be fetched.
     - `storeType`: Specifies which storage to use (`'loc'` for localStorage, `'ses'` for sessionStorage).
   - **Example**:
     ```ts
     const userData = storageManager.get('user:123');
     console.log(userData);  // { name: 'John Doe' }

     const tempData = storageManager.get('tempData', 'ses');
     console.log(tempData);  // { temp: true }
     ```

3. **remove(key: string, storeType: StoreType = 'loc'): void**
   - **Purpose**: Removes the key-value pair from either localStorage or sessionStorage.
   - **Parameters**:
     - `key`: The key to be removed.
     - `storeType`: Specifies which storage to use (`'loc'` for localStorage, `'ses'` for sessionStorage).
   - **Example**:
     ```ts
     storageManager.remove('user:123');
     storageManager.remove('tempData', 'ses');
     ```

4. **clearAll(storeType: StoreType = 'loc'): void**
   - **Purpose**: Clears all data from either localStorage or sessionStorage.
   - **Parameters**:
     - `storeType`: Specifies which storage to clear (`'loc'` for localStorage, `'ses'` for sessionStorage).
   - **Example**:
     ```ts
     storageManager.clearAll();  // Clears localStorage
     storageManager.clearAll('ses');  // Clears sessionStorage
     ```

---

## Summary Table

### BackendStorageManager (Redis)

| Function   | Parameters                                                                 | Mandatory                | Optional                |
|------------|---------------------------------------------------------------------------|--------------------------|-------------------------|
| `set`      | `redisClient, key, value, expiryInSeconds`                                | `redisClient, key, value`| `expiryInSeconds` (default 3600) |
| `get`      | `redisClient, key`                                                        | `redisClient, key`       | None                    |
| `remove`   | `redisClient, key`                                                        | `redisClient, key`       | None                    |
| `clearAll` | `redisClient`                                                            | `redisClient`            | None                    |

### StorageManager (LocalStorage / SessionStorage)

| Function   | Parameters                                                                      | Mandatory                | Optional                |
|------------|--------------------------------------------------------------------------------|--------------------------|-------------------------|
| `set`      | `key, value, expiryInMs, storeType`                                             | `key, value`             | `expiryInMs, storeType` |
| `get`      | `key, storeType`                                                               | `key`                    | `storeType` (default 'loc') |
| `remove`   | `key, storeType`                                                               | `key`                    | `storeType` (default 'loc') |
| `clearAll` | `storeType`                                                                    | None                     | `storeType` (default 'loc') |

---

## Conclusion

With the **BackendStorageManager** and **StorageManager**, you can efficiently manage data storage and retrieval in both the backend (Redis) and frontend (localStorage/sessionStorage). Use the provided functions to store, retrieve, and remove data, ensuring that you set appropriate expiry times when necessary.

--- 

