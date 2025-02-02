import { DarkTheme, DefaultTheme } from '@react-navigation/native';

import type { ThemeConfiguration } from '@/types/theme/config';

import type { FontSizes } from '@/types/theme/styleConstant';

const colorsLight = {
	red500: '#C13333',
	gray800: '#303030',
	gray400: '#4D4D4D',
	gray200: '#A1A1A1',
	gray100: '#DFDFDF',
	gray50: '#EFEFEF',
	purple500: '#44427D',
	purple100: '#E1E1EF',
	purple50: '#2e363b',
	white100: '#ffffff',
	gray600: '#585e62',
} as const;

const Base = 4;

const colorsDark = {
	red500: '#C13333',
	gray800: '#E0E0E0',
	gray400: '#969696',
	gray200: '#BABABA',
	gray100: '#000000',
	gray50: '#EFEFEF',
	purple500: '#A6A4F0',
	purple100: '#252732',
	purple50: '#2e363b',
	white100: '#ffffff',
	gray600: '#585e62',
} as const;

const sizes = [4, 8, 12, 16, 24, 32, 40, 56, 80] as const;

const fontSizes = [12, 14, 16, 18, 20, 24, 32, 40, 80] as const;

export const config = {
	colors: colorsLight,
	fonts: {
		sizes: fontSizes,
		colors: colorsLight,
	},
	gutters: sizes,
	backgrounds: colorsLight,
	borders: {
		widths: [1, 2],
		radius: [4, 8, 16, 18, 20],
		colors: colorsLight,
	},
	navigationColors: {
		...DefaultTheme.colors,
		background: colorsLight.gray50,
		card: colorsLight.gray50,
	},
	variants: {
		dark: {
			colors: colorsDark,
			fonts: {
				colors: colorsDark,
			},
			backgrounds: colorsDark,
			navigationColors: {
				...DarkTheme.colors,
				background: colorsDark.purple50,
				card: colorsDark.purple50,
			},
		},
	},
} as const satisfies ThemeConfiguration;

export const generateFontSizes = () => {
	return fontSizes.reduce((acc, size) => {
		return Object.assign(acc, {
			[`size_${size}`]: {
				fontSize: size,
			},
		});
	}, {} as FontSizes);
};

export const styleConstant = {
	Spacing: {
		XS: Base,
		S: Base * 2,
		M: Base * 4,
		L: Base * 6,
		XL: Base * 10,
		XXL: Base * 14,
	},
	Font: generateFontSizes(),
	Color: colorsDark,
};
