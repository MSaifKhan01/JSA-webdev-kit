
//-------------UniqId----------------//

// export function UniqueIdFn(length: number = 20, groupLength: number = 4): string {
//     if (typeof length !== 'number' || length <= 0) {
//         throw new Error("The length parameter must be a positive number.");
//     }

//     const formatId = (id: string, groupLength: number): string => {
//         const regex = new RegExp(`.{1,${groupLength}}`, 'g');
//         return id.match(regex)?.join('-') || '';
//     };

//     const generateRandomId = (): string => {
//         const hyphenCount = Math.floor((length - 1) / (groupLength + 1));
//         const rawLength = length - hyphenCount;

//         let date = Date.now().toString(36);
//         let random = Math.random().toString(36).substr(2, rawLength - date.length);
//         let rawId = (date + random).substring(0, rawLength);

//         while (rawId.length < rawLength) {
//             rawId += Math.random().toString(36).substr(2, rawLength - rawId.length);
//         }

//         const formattedId = formatId(rawId, groupLength);
//         return formattedId.substring(0, length);
//     };

//     return generateRandomId();
// }




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


// console.log(getFormattedDateTime('ISO'));     // 2024-12-24T15:30:00.000Z
// console.log(getFormattedDateTime('SHORT'));   // 12/24/2024
// console.log(getFormattedDateTime('LONG'));    // Monday, December 24, 2024
// console.log(getFormattedDateTime('24H'));     // 15:30
// console.log(getFormattedDateTime('12H'));     // 03:30 PM
// console.log(getFormattedDateTime('FULL'));    // Monday, December 24, 2024 15:30:00
// console.log(getFormattedDateTime('UNIX'));    // 1703431800
// console.log(getFormattedDateTime('CUSTOM'));  // 2024/12/24
// console.log(getFormattedDateTime('DASH'));    // 24-12-2024
// console.log(getFormattedDateTime('RFC'));     // Mon, 24 Dec 2024 15:30:00 GMT
// console.log(getFormattedDateTime('HUMAN'));   // 12/24/2024, 3:30:00 PM
// console.log(getFormattedDateTime('TIME'));    // 15:30:00
// console.log(getFormattedDateTime('DATEONLY'));// 2024-12-24
// console.log(getFormattedDateTime('DATETIME'));// 2024-12-24 15:30:00


