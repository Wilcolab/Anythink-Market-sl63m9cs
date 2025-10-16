/**
 * Convert a string to camelCase.
 * Examples:
 *   toCamelCase('basic prompt') // 'basicPrompt'
 *   toCamelCase('Basic-Prompt') // 'basicPrompt'
 *   toCamelCase('basic_prompt') // 'basicPrompt'
 *   toCamelCase('basicPrompt')  // 'basicPrompt'
 *
 * @param {string} input
 * @returns {string}
 */
function toCamelCase(input = '') {
    if (typeof input !== 'string') return '';

    const str = input.trim();
    if (str === '') return '';

    // If the string contains separators, split and normalize each token.
    if (/[\s\-_./\\]+/.test(str)) {
        const tokens = str
            .split(/[\s\-_./\\]+/)
            .map(t => t.replace(/[^a-zA-Z0-9]+/g, ''))
            .filter(Boolean);

        if (tokens.length === 0) return '';

        return tokens
            .map((tok, i) => {
                const lower = tok.toLowerCase();
                if (i === 0) return lower;
                return lower.charAt(0).toUpperCase() + lower.slice(1);
            })
            .join('');
    }

    // No separators: assume already a single word or camel/PascalCase.
    // Preserve internal capitals but ensure first letter is lowercase.
    return str.charAt(0).toLowerCase() + str.slice(1);
}

module.exports = toCamelCase;