import { TextInput, TextInputProps } from 'react-native';
import useAppropiateColorHash from '@/hooks/custom/useAppropiateColorHash';
import { useComposeStatus } from '@/context/composeStatusContext/composeStatus.context';
import { ThemeText } from '../../common/ThemeText/ThemeText';

const ComposeTextInput = ({ ...textInputProps }: TextInputProps) => {
	const inputColor = useAppropiateColorHash('patchwork-light-900');
	const selectionColor = useAppropiateColorHash('patchwork-red-50');
	const { composeState, composeDispatch } = useComposeStatus();

	return (
		<TextInput
			placeholder="Start Typing here.."
			multiline
			maxLength={4000}
			placeholderTextColor={inputColor}
			scrollEnabled={false}
			selectionColor={selectionColor}
			onChangeText={text => {
				composeDispatch({
					type: 'text',
					payload: {
						count: text.length,
						raw: text,
					},
				});
			}}
			autoCorrect
			autoComplete="off"
			autoFocus
			spellCheck
			{...textInputProps}
			className="text-white font-SourceSans3_Regular text-base opacity-80"
		>
			<ThemeText>
				<ThemeText>{composeState.text.raw}</ThemeText>
			</ThemeText>
			{/* <ThemeText variant="textOrange">@stregabor</ThemeText> */}
		</TextInput>
	);
};

export default ComposeTextInput;
