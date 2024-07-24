import { ThemeText } from '@/components/ui/ThemeText/ThemeText';
import { cva, VariantProps } from 'class-variance-authority';
import { View, Text, Pressable } from 'react-native';

const chipVairants = cva('flex flex-row justify-center items-center', {
	variants: {
		variant: {
			default: /* tw */ 'bg-patchwork-dark-50',
			outline:
				/* tw */ 'border border-input border-slate-400 active:opacity-80',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

type ExtraProps = {
	startIcon?: React.ReactElement;
	endIcon?: React.ReactElement;
	title: string;
};

type ChipProps = React.ComponentPropsWithoutRef<typeof Pressable> &
	ExtraProps &
	VariantProps<typeof chipVairants>;

const Chip = (props: ChipProps) => {
	return (
		<Pressable onPress={() => {}}>
			<View className="flex flex-row justify-center items-center">
				<ThemeText size="xs_12" className="text-white">
					Test Text
				</ThemeText>
			</View>
		</Pressable>
	);
};

export default Chip;
