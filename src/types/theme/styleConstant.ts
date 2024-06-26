export type ArrayValue<T extends readonly unknown[]> = T[number];

export type RemoveBeforeSeparator<S extends string> =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	S extends `${infer _}_${infer After}` ? After : S;

export type ToNumber<
	S extends string,
	T extends unknown[] = [],
> = S extends `${T['length']}` ? T['length'] : ToNumber<S, [...T, '']>;

export type FontSizesKeys = `size_${ArrayValue<typeof config.fonts.sizes>}`;

export type FontSizes = {
	[key in FontSizesKeys]: {
		fontSize: ToNumber<RemoveBeforeSeparator<key>>;
	};
};
