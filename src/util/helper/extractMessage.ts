/**
 * Removes all @mentions extracts the message.
 * @param {string} input - The input string containing @mentions.
 * @returns {string} - The message text without mentions.
 */
export function extractMessage(input: string): string {
	const output = input.replace(/@\S+/g, '').trim();
	return output;
}
