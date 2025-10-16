/**
 * Convert a string to camelCase.
 * - Accepts various separators (space, _, -, ., /, etc.)
 * - Skips non-letter characters
 * - Preserves acronyms (e.g. "get_API_response" -> "getAPIResponse")
 * - Throws descriptive errors for invalid inputs (null/undefined/non-string)
 *
 * Examples:
 *   toCamelCase("my-name")         -> "myName"
 *   toCamelCase(" API_response ")  -> "apiResponse"
 *   toCamelCase("getUserID")       -> "getUserID"
 *   toCamelCase("23")              -> "" (no letters)
 *
 * @param {string} input
 * @returns {string}
 * @throws {TypeError} when input is null/undefined or not a string
 */
function toCamelCase(input) {
    if (input === null || input === undefined) {
        throw new TypeError('toCamelCase: input is null or undefined');
    }
    if (typeof input !== 'string') {
        throw new TypeError(`toCamelCase: expected a string but received a ${typeof input}`);
    }

    // Replace any non-letter characters with a single space (treat them as separators)
    const cleaned = input.replace(/[^A-Za-z]+/g, ' ').trim();
    if (cleaned === '') return '';

    // Regex that splits tokens into words while preserving acronyms:
    // - [A-Z]+(?=[A-Z][a-z])  => acronym followed by a capitalized word (e.g. "XMLHttp" -> "XML", "Http")
    // - [A-Z]?[a-z]+           => capitalized or lowercase word (e.g. "Parser", "my")
    // - [A-Z]+                 => trailing or standalone acronyms (e.g. "ID", "API")
    const pieceRegex = /[A-Z]+(?=[A-Z][a-z])|[A-Z]?[a-z]+|[A-Z]+/g;

    const pieces = [];
    for (const token of cleaned.split(/\s+/)) {
        const matches = token.match(pieceRegex);
        if (matches) pieces.push(...matches);
    }

    if (pieces.length === 0) return '';

    // Build camelCase: first piece lowercased, subsequent pieces capitalized unless they are acronyms
    const [first, ...rest] = pieces;
    const firstPart = first.toLowerCase();

    const restParts = rest.map((w) => {
        // Preserve acronyms (all uppercase and length > 1)
        if (w.length > 1 && w === w.toUpperCase()) return w;
        return w[0].toUpperCase() + w.slice(1).toLowerCase();
    });

    return [firstPart, ...restParts].join('');
}

/**
 * Convert a string to dot.case.
 *
 * Examples:
 *   toDotCase("Hello World")       -> "hello.world"
 *   toDotCase("fooBarBaz")         -> "foo.bar.baz"
 *   toDotCase("  __JSONData--42")  -> "json.data.42"
 *
 * Returns empty string for null/undefined/empty input.
 *
 * - Handles camelCase and PascalCase splits
 * - Treats any non-alphanumeric sequence as a separator
 * - Collapses multiple separators into a single dot
 */
function toDotCase(input) {
    if (input == null) return '';
    const str = String(input).trim();
    if (str === '') return '';

    return str
        // separate camelCase transitions: "fooBar" -> "foo.Bar"
        .replace(/([a-z0-9])([A-Z])/g, '$1.$2')
        // separate sequences like "JSONData" -> "JSON.Data"
        .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1.$2')
        // replace any non-alphanumeric characters with dots
        .replace(/[^a-zA-Z0-9]+/g, '.')
        // collapse multiple dots
        .replace(/\.+/g, '.')
        // trim leading/trailing dots
        .replace(/^\.+|\.+$/g, '')
        .toLowerCase();
}

module.exports = { toCamelCase, toDotCase };

/**
 * Convert a string to camelCase.
 *
 * Rules and behavior:
 * - Accepts various separators (whitespace, underscores, hyphens, dots, slashes, digits, and other non-letter characters).
 *   These separators are treated as token boundaries and are collapsed.
 * - Skips non-letter characters when forming words; if the input contains no letters, the result is an empty string.
 * - Preserves acronyms (consecutive uppercase letters) as-is when appropriate:
 *   - Acronyms that appear as standalone or trailing tokens (e.g. "ID", "API") are kept uppercase.
 *   - Acronyms immediately followed by a capitalized word are split (e.g. "XMLHttp" -> ["XML", "Http"]).
 * - Splitting of tokens also respects camelCase / PascalCase boundaries inside tokens:
 *   - e.g. "fooBar" splits into ["foo", "Bar"].
 * - Output casing:
 *   - The very first letter/word of the result is entirely lowercased.
 *   - Subsequent words are capitalized (first letter uppercase, rest lowercase) except preserved acronyms which remain uppercase.
 *
 * Edge cases and errors:
 * - Throws TypeError when input is null or undefined.
 * - Throws TypeError when input is not a string.
 * - Returns an empty string when the cleaned input contains no letter characters.
 *
 * Implementation notes (for readers):
 * - Internally tokens are formed by replacing non-letter sequences with spaces and trimming.
 * - A regex is used to extract word pieces while preserving acronyms:
 *   [A-Z]+(?=[A-Z][a-z]) | [A-Z]?[a-z]+ | [A-Z]+
 *
 * Examples:
 *   toCamelCase("my-name")         // "myName"
 *   toCamelCase(" API_response ")  // "apiResponse"
 *   toCamelCase("getUserID")       // "getUserID"
 *   toCamelCase("get_API_response")// "getAPIResponse"
 *   toCamelCase("23")              // ""  (no letters)
 *
 * @param {string} input - The string to convert to camelCase. Must be a string.
 * @returns {string} The camelCased string. Returns an empty string when there are no letters after cleaning.
 * @throws {TypeError} If input is null or undefined, or if input is not a string.
 */
 
/**
 * Convert a string to dot.case (lowercase words separated by dots).
 *
 * Rules and behavior:
 * - Handles input that is null/undefined/empty by returning an empty string.
 * - Non-string inputs are coerced to strings via String(input) before processing.
 * - Splits and inserts dots for:
 *   - camelCase and PascalCase boundaries (e.g. "fooBar" -> "foo.Bar").
 *   - Acronym/word boundaries (e.g. "JSONData" -> "JSON.Data").
 *   - Any non-alphanumeric character sequences are treated as separators and replaced with dots.
 * - Collapses multiple separators or dots into a single dot.
 * - Trims leading and trailing dots resulting from separators.
 * - The final string is converted to lowercase.
 *
 * Useful for converting identifiers or free-form text into a stable dotted namespace style.
 *
 * Examples:
 *   toDotCase("Hello World")       // "hello.world"
 *   toDotCase("fooBarBaz")         // "foo.bar.baz"
 *   toDotCase("  __JSONData--42")  // "json.data.42"
 *   toDotCase(null)                // ""
 *   toDotCase(12345)               // "12345"
 *
 * @param {*} input - The value to convert. Null/undefined results in an empty string; other values are coerced to String before processing.
 * @returns {string} A lowercase dot-separated string. Returns an empty string for null/undefined or when the trimmed input is empty.
 */
