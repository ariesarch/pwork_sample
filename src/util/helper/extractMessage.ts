/**
 * Extracts the message after the first @mention in the input string.
 * @param {string} input - The input string containing an @mention.
 * @returns {string} - The extracted message text.
 */

export function extractMessage(input: string): string {
	return input.replace(/^@\S+\s/, '');
}
