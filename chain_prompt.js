/**
 * Convert a string to kebab-case.
 * - Replaces spaces and underscores with hyphens
 * - Collapses multiple separators into a single hyphen
 * - Preserves numbers (e.g. "LaBel 24" -> "label-24")
 * - Converts to lowercase
 * Throws descriptive errors for invalid input.
 *
 * @param {string} input
 * @returns {string}
 */
function toKebabCase(input) {
    if (typeof input !== 'string') {
        throw new TypeError('toKebabCase: input must be a string');
    }

    const trimmed = input.trim();
    if (trimmed.length === 0) {
        throw new Error('toKebabCase: input string is empty or contains only whitespace');
    }

    // Replace whitespace and underscores with hyphens
    let result = trimmed.replace(/[\s_]+/g, '-');

    // Remove any characters that are not letters, numbers, or hyphens
    result = result.replace(/[^A-Za-z0-9-]+/g, '');

    // Collapse multiple hyphens and trim hyphens at ends
    result = result.replace(/-+/g, '-').replace(/^-|-$/g, '');

    return result.toLowerCase();
}

module.exports = toKebabCase;