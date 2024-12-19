export function removeOtherMentions(input: string): string {
	const defaultInstance = '@channel.org';

	const mentionPattern = /@(\w+)(@[\w.-]+)?/g;

	let firstMention: string | null = null;
	let modifiedText = input.replace(
		mentionPattern,
		(match, username, instance) => {
			const fullMention = instance ? match : `${match}${defaultInstance}`;
			if (!firstMention) {
				firstMention = fullMention;
				return fullMention;
			}
			return '';
		},
	);
	if (!firstMention) {
		return input;
	}
	return `${modifiedText.trim()}`;
}
