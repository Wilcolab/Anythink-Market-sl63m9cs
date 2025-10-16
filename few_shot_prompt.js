function toCamelCase(input) {
    if (input == null) return '';
    const str = String(input).trim();
    if (str === '') return '';

    // Split on any non-alphanumeric sequence (spaces, underscores, hyphens, punctuation)
    const parts = str.split(/[^a-zA-Z0-9]+/).filter(Boolean);
    if (parts.length === 0) return '';

    // Single token: preserve existing camelCase but normalize ALL-UPPER to lowercase
    if (parts.length === 1) {
        const token = parts[0];
        if (token === token.toUpperCase()) return token.toLowerCase();
        return token[0].toLowerCase() + token.slice(1);
    }

    const first = parts[0].toLowerCase();
    const rest = parts
        .slice(1)
        .map(p => (p ? p[0].toUpperCase() + p.slice(1).toLowerCase() : ''))
        .join('');

    return first + rest;
}

// Export for Node.js usage
module.exports = toCamelCase;

// Example usages
if (require.main === module) {
    console.log(toCamelCase('first name'));    // firstName
    console.log(toCamelCase('user_id'));       // userId
    console.log(toCamelCase('SCREEN_NAME'));   // screenName
    console.log(toCamelCase('mobile-number')); // mobileNumber
    console.log(toCamelCase('alreadyCamelCase')); // alreadyCamelCase
    console.log(toCamelCase('UserName')); // userName
}