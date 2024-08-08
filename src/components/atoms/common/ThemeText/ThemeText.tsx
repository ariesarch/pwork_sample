import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Text } from 'react-native';
import { cn } from '@/util/helper/twutil';

const textVariants = cva(
	'font-sans text-sm group flex items-center justify-center rounded-md',
	{
		variants: {
			variant: {
				default: /* tw */ 'text-black dark:text-white',
				textGrey:
					/* tw */ 'text-patchwork-slate-200 dark:text-patchwork-grey-400',
				textRedUnderline: /* tw */ 'text-patchwork-red-600 underline',
			},
			size: {
				default: /* tw */ 'text-sm',
				fs_13: /* tw */ 'text-[13px]',
				xs_12: /* tw */ 'text-xs',
				sm_14: /* tw */ 'text-sm',
				md_16: /* tw */ 'text-base',
				lg_18: /* tw */ 'text-lg',
				xl_20: /* tw */ 'text-xl',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

type TextProps = React.ComponentPropsWithoutRef<typeof Text> &
	VariantProps<typeof textVariants>;

const ThemeText = React.forwardRef<React.ElementRef<typeof Text>, TextProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<Text
				className={cn(
					props.disabled && 'opacity-50 web:pointer-events-none',
					textVariants({ variant, size, className }),
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
ThemeText.displayName = 'ThemeText';

export { ThemeText, textVariants };
export type { TextProps };
