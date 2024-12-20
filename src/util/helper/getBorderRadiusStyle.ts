import { ViewStyle } from 'react-native';

export const getBorderRadiusStyle = (index: number, length: number) => {
	const baseStyle: ViewStyle = { overflow: 'hidden' };

	if (length === 1) {
		return { ...baseStyle, borderRadius: 10 };
	}
	if (length === 2) {
		return index === 0
			? {
					...baseStyle,
					borderTopLeftRadius: 10,
					borderBottomLeftRadius: 10,
					marginRight: 1,
			  }
			: {
					...baseStyle,
					borderTopRightRadius: 10,
					borderBottomRightRadius: 10,
					marginLeft: 1,
			  };
	}
	if (length === 3) {
		if (index === 0) {
			return {
				...baseStyle,
				borderTopLeftRadius: 10,
				borderBottomLeftRadius: 10,
				marginRight: 1,
			};
		}
		if (index === 1) {
			return { ...baseStyle, borderTopRightRadius: 10, marginBottom: 8 };
		}
		if (index === 2) {
			return { ...baseStyle, borderBottomRightRadius: 10, marginTop: 8 };
		}
	}
	if (length === 4) {
		if (index === 0) {
			return {
				...baseStyle,
				borderTopLeftRadius: 10,
				marginRight: 1,
				marginBottom: 2,
			};
		}
		if (index === 1) {
			return {
				...baseStyle,
				borderBottomLeftRadius: 10,
				marginRight: 1,
				marginTop: 2,
			};
		}
		if (index === 2) {
			return {
				...baseStyle,
				borderTopRightRadius: 10,
				marginLeft: 1,
				marginBottom: 2,
			};
		}
		if (index === 3) {
			return {
				...baseStyle,
				borderBottomRightRadius: 10,
				marginLeft: 1,
				marginTop: 2,
			};
		}
	}
	return baseStyle;
};
