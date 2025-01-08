/**
 * Removes the first @mention from the input string and returns the rest.
 * @param {string} input - The input string containing @mentions.
 * @returns {string} - The message text without the first mention.
 */
export function extractMessage(input: string): string {
	const output = input.replace(/@\S+/, '').trim(); // Remove only the first match
	return output;
}
