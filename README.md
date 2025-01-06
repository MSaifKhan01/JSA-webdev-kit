

---

# jsa-webdev-kit

`jsa-webdev-kit` is a lightweight utility library for developers. It includes functions for generating unique IDs and formatting dates in multiple styles.

## Installation

Install the package via npm:

```bash
npm install jsa-webdev-kit
```

---

## Functions

### 1. UniqueIdFn

Generates a unique ID with customizable length, grouping, and separators.

#### Parameters

- **`length`** (optional, `number`, default: `20`): Total length of the unique ID.
- **`groupLength`** (optional, `number`, default: `4`): Length of each group in the ID.
- **`separator`** (optional, `string`, default: `""`): Character used to separate groups.

#### Example Usage

```javascript
const { UniqueIdFn } = require("jsa-webdev-kit");

const uniqueId = UniqueIdFn(25, 5, "-");
console.log(uniqueId); // Output: "abcde-fghij-klmno-pqrst-uvwxy"
```

---

### 2. getFormattedDateTime

Formats the current date and time into various formats.

#### Parameters

- **`format`** (optional, `string`, default: `'ISO'`): Specifies the desired format for the date and time.

#### Available Format Options

1. **`'ISO'` / `'standard'`**  
   Returns the date and time in ISO-8601 format.  
   Example: `2025-01-06T15:30:45.123Z`

2. **`'short'` / `'date'`**  
   Returns the date in a short format.  
   Example: `01/06/2025`

3. **`'long'` / `'fulldate'`**  
   Returns the full date in a human-readable format with the weekday name.  
   Example: `Monday, January 6, 2025`

4. **`'24h'` / `'military'`**  
   Returns the time in 24-hour military format.  
   Example: `15:30`

5. **`'12h'` / `'clock'`**  
   Returns the time in 12-hour format with AM/PM.  
   Example: `03:30 PM`

6. **`'full'` / `'log'`**  
   Combines the full date and time in a human-readable format.  
   Example: `Monday, January 6, 2025 15:30:45`

7. **`'unix'` / `'epoch'`**  
   Returns the Unix timestamp (seconds since January 1, 1970).  
   Example: `1736363445`

8. **`'custom'` / `'slash'`**  
   Returns the date in a custom slash-separated format.  
   Example: `2025/01/06`

9. **`'dash'`**  
   Returns the date in a custom dash-separated format.  
   Example: `06-01-2025`

10. **`'rfc'` / `'email'`**  
    Returns the date and time in RFC 2822 format.  
    Example: `Mon, 06 Jan 2025 15:30:45 GMT`

11. **`'human'`**  
    Returns the date and time in a locale-specific format.  
    Example: `1/6/2025, 3:30:45 PM`

12. **`'time'`**  
    Returns the time only (hours, minutes, seconds).  
    Example: `15:30:45`

13. **`'dateonly'`**  
    Returns the date only in a standard ISO format.  
    Example: `2025-01-06`

14. **`'datetime'`**  
    Returns the date and time in a simple space-separated format.  
    Example: `2025-01-06 15:30:45`

15. **`'default'`**  
    If an invalid or unspecified format is provided, the function defaults to a space-separated date and time format.  
    Example: `2025-01-06 15:30:45`

---

#### Example Usage

```javascript
const { getFormattedDateTime } = require("jsa-webdev-kit");

const currentDate = getFormattedDateTime("full");
console.log(currentDate); // Output: "Monday, January 6, 2025 15:30:45"
```

---

## Repository

View the source code on GitHub: [JSA-webdev-kit](https://github.com/MSaifKhan01/JSA-webdev-kit)

---

## License

This library is licensed under the MIT License.

---

