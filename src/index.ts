export function UniqueIdFn(length: number = 20, groupLength: number = 4): string {
    if (typeof length !== 'number' || length <= 0) {
        throw new Error("The length parameter must be a positive number.");
    }

    const formatId = (id: string, groupLength: number): string => {
        const regex = new RegExp(`.{1,${groupLength}}`, 'g');
        return id.match(regex)?.join('-') || '';
    };

    const generateRandomId = (): string => {
        const hyphenCount = Math.floor((length - 1) / (groupLength + 1));
        const rawLength = length - hyphenCount;

        let date = Date.now().toString(36);
        let random = Math.random().toString(36).substr(2, rawLength - date.length);
        let rawId = (date + random).substring(0, rawLength);

        while (rawId.length < rawLength) {
            rawId += Math.random().toString(36).substr(2, rawLength - rawId.length);
        }

        const formattedId = formatId(rawId, groupLength);
        return formattedId.substring(0, length);
    };

    return generateRandomId();
}


