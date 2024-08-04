import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import { cva, VariantProps } from 'class-variance-authority';
import { View, Pressable } from 'react-native';

const chipVairants = cva(
	'flex flex-row active:opacity-80 py-2 px-3 rounded-full',
	{
		variants: {
			variant: {
				default:
					/* tw */ ' bg-slate-200 dark:bg-patchwork-grey-70 active:opacity-90',
				outline: /* tw */ 'border border-slate-300',
				white: /* tw */ ' bg-slate-200 dark:bg-white active:opacity-90',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

const textVariants = {
	default: /* tw */ 'text-black dark:text-gray-400',
	white: /* tw */ 'text-black',
	outline: '',
};

type ExtraProps = {
	startIcon?: React.ReactElement;
	endIcon?: React.ReactElement;
	dotAlert?: boolean;
	title: string;
};

type ChipProps = React.ComponentPropsWithoutRef<typeof Pressable> &
	ExtraProps &
	VariantProps<typeof chipVairants>;

const Chip = ({
	title,
	startIcon = undefined,
	endIcon = undefined,
	dotAlert = false,
	className,
	variant,
	...props
}: ChipProps) => {
	return (
		<Pressable
			onPress={() => {}}
			className={chipVairants({ variant, className })}
			{...props}
		>
			<View className="flex-row items-center">
				{startIcon && <View className="mr-1">{startIcon}</View>}
				<ThemeText
					size="xs_12"
					className={`${textVariants[variant || 'default']}`}
				>
					{title}
				</ThemeText>
				{endIcon && <View className="ml-2">{endIcon}</View>}
				{dotAlert && (
					<View className="absolute bg-patchwork-red-50 bottom-[18] right-[-8] w-[10] h-[10] rounded-full" />
				)}
			</View>
		</Pressable>
	);
};

export default Chip;
