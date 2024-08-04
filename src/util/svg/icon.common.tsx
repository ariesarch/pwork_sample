import Svg, {
	Circle,
	ClipPath,
	Defs,
	G,
	Path,
	Rect,
	SvgProps,
} from 'react-native-svg';

export const PasswordEyeIcon = ({ ...props }: SvgProps) => (
	<Svg
		width={16}
		height={16}
		fill="gray"
		stroke="#fff"
		strokeWidth="0"
		viewBox="0 0 576 512"
		{...props}
	>
		<Path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 000 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 000-29.19zM288 400a144 144 0 11144-144 143.93 143.93 0 01-144 144zm0-240a95.31 95.31 0 00-25.31 3.79 47.85 47.85 0 01-66.9 66.9A95.78 95.78 0 10288 160z" />
	</Svg>
);

export const PasswordEyeCloseIcon = ({ ...props }: SvgProps) => (
	<Svg
		width={props.width || 16}
		height={props.height || 16}
		fill={props.fill || 'gray'}
		stroke="#000"
		strokeWidth="0"
		viewBox="0 0 640 512"
		{...props}
	>
		<Path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 000 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 01-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0081.25-102.07 32.35 32.35 0 000-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 00-147.32 37.7L45.46 3.37A16 16 0 0023 6.18L3.37 31.45A16 16 0 006.18 53.9l588.36 454.73a16 16 0 0022.46-2.81l19.64-25.27a16 16 0 00-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 00416 256a94.76 94.76 0 00-121.31-92.21A47.65 47.65 0 01304 192a46.64 46.64 0 01-1.54 10l-73.61-56.89A142.31 142.31 0 01320 112a143.92 143.92 0 01144 144c0 21.63-5.29 41.79-13.9 60.11z" />
	</Svg>
);

type ColorSchemeType = {
	colorScheme: 'dark' | 'light';
};

export const PatchworkLogo = ({
	colorScheme,
	...props
}: ColorSchemeType & SvgProps) => (
	<Svg width="164" height="112" viewBox="0 0 164 112" fill="none" {...props}>
		<G clip-path="url(#clip0_82_35985)">
			<Path
				d="M49.7156 32.5455L78.46 23.2011L75.3713 18.9923C74.4144 17.6884 72.7297 17.1453 71.192 17.6452L52.3054 23.785C50.7611 24.287 49.7156 25.7268 49.7156 27.3514V32.5455Z"
				fill="#FF3C26"
			/>
			<Path
				d="M49.7156 20.6676L71.4422 13.6046L68.3907 9.40247C67.4363 8.08817 65.7446 7.53822 64.2003 8.04023L52.3054 11.9071C50.7611 12.4091 49.7156 13.8489 49.7156 15.4735V20.6676Z"
				fill="#FF3C26"
			/>
			<Path
				d="M70.5537 5.975L88.3406 30.423L91.3832 26.1807C92.3258 24.8664 92.3198 23.0955 91.3683 21.7877L79.6813 5.72397C78.7257 4.41053 77.0335 3.86209 75.4897 4.36549L70.5537 5.975Z"
				fill="#FFD53B"
			/>
			<Path
				d="M81.8412 2.29434L95.2855 20.7735L98.3332 16.5686C99.2864 15.2534 99.2849 13.4738 98.3293 12.1603L90.9687 2.0433C90.0132 0.729865 88.3209 0.181428 86.7771 0.684829L81.8412 2.29434Z"
				fill="#FFD53B"
			/>
			<Path
				d="M101.007 51.34L72.2628 41.9956L72.289 47.217C72.2971 48.8347 73.3411 50.2647 74.8787 50.7646L93.7654 56.9044C95.3096 57.4064 97.0013 56.8565 97.9557 55.5422L101.007 51.34Z"
				fill="#3FA7E8"
			/>
			<Path
				d="M94.0292 60.9492L72.3026 53.8862V59.0804C72.3026 60.7049 73.3482 62.1447 74.8924 62.6467L86.7873 66.5136C88.3316 67.0156 90.0233 66.4657 90.9777 65.1514L94.0292 60.9492Z"
				fill="#3FA7E8"
			/>
			<Path
				d="M102.248 17.6172L84.4832 42.0812L89.4546 43.6698C90.9947 44.1619 92.6767 43.6105 93.6271 42.3018L105.3 26.2276C106.254 24.9133 106.254 23.1336 105.3 21.8193L102.248 17.6172Z"
				fill="#45E67A"
			/>
			<Path
				d="M109.226 27.2271L95.7986 45.7182L100.736 47.3233C102.28 47.8253 103.972 47.2754 104.926 45.9611L112.278 35.8375C113.232 34.5232 113.232 32.7435 112.278 31.4292L109.226 27.2271Z"
				fill="#45E67A"
			/>
			<Path
				d="M68.539 60.5814L68.5119 30.3423L63.5581 31.9851C62.0234 32.4941 60.9879 33.9303 60.9894 35.548L61.0072 55.4167C61.0086 57.0413 62.0555 58.4801 63.6002 58.9808L68.539 60.5814Z"
				fill="#CF4AF0"
			/>
			<Path
				d="M57.2449 56.9213L57.2245 34.0649L52.2885 35.6744C50.7447 36.1778 49.7005 37.6186 49.7019 39.2431L49.7131 51.7566C49.7146 53.3812 50.7614 54.82 52.3061 55.3207L57.2449 56.9213Z"
				fill="#CF4AF0"
			/>
			<Path
				d="M0 89.5194H6.13321V91.828C7.08087 90.0887 8.88285 89.1398 10.9691 89.1398C14.7626 89.1398 17.2603 92.334 17.2603 97.3628C17.2603 102.455 14.731 105.713 10.748 105.713C8.97762 105.713 7.65018 105.08 6.38592 103.625V111.5H0V89.5194ZM10.7164 97.3628C10.7164 94.7062 9.92599 93.2829 8.40902 93.2829C6.9861 93.2829 6.25956 94.485 6.25956 97.0783V97.9952C6.25956 100.146 7.11317 101.569 8.4722 101.569C9.86281 101.569 10.7164 99.9562 10.7164 97.3628ZM18.6825 101C18.6825 99.5769 19.0931 98.5332 19.9783 97.774C20.9267 96.9516 22.4437 96.4139 24.7518 96.0663L29.0507 95.4335V94.7378C29.0507 93.5361 28.4498 92.9669 27.3751 92.9669C26.1424 92.9669 25.5099 93.5993 25.4152 94.8642H19.1879C19.4729 91.1955 22.5076 89.1398 27.4067 89.1398C32.9074 89.1398 35.4359 91.1639 35.4359 95.6867V101.443C35.4359 102.992 35.5939 104.51 35.8157 105.333H29.6832C29.5245 104.606 29.4614 103.878 29.4614 103.024C28.6401 104.669 26.5854 105.713 24.1825 105.713C20.8951 105.713 18.6825 103.815 18.6825 101ZM29.2718 99.7665V98.2484L27.4383 98.5964C25.8581 98.9125 25.0993 99.5137 25.0993 100.462C25.0993 101.316 25.7949 101.917 26.8065 101.917C28.2603 101.917 29.2718 101.031 29.2718 99.7665ZM36.4475 89.5194H39.0715V85.914L45.4567 83.5102V89.5194H49.0922V93.5677H45.4567V98.28C45.4567 99.7349 46.2787 100.557 47.7641 100.557C48.3018 100.557 48.6809 100.526 49.0922 100.462V105.333C47.6693 105.554 46.8164 105.649 45.9312 105.649C41.2841 105.649 39.0715 103.846 39.0715 100.083V93.5677H36.4475V89.5194ZM50.1993 97.426C50.1993 92.2708 53.6446 89.1398 59.2085 89.1398C63.6022 89.1398 66.5421 91.1323 67.2377 94.6746L61.3264 96.0031C61.0736 94.4214 60.2516 93.6309 59.0505 93.6309C57.5329 93.6309 56.6161 94.959 56.6161 97.2048C56.6161 99.7349 57.5013 101.158 59.0505 101.158C60.2832 101.158 61.1052 100.241 61.2948 98.6913L67.2377 100.083C66.6684 103.467 63.4126 105.713 59.1137 105.713C53.7709 105.713 50.1993 102.423 50.1993 97.426ZM69.6083 82.4033H75.9935V92.2392C77.0051 90.1203 78.6491 89.0766 80.9249 89.0766C84.3386 89.0766 86.0774 91.2588 86.0774 95.497V105.333H79.6922V96.1611C79.6922 94.5798 79.1229 93.7889 77.9534 93.7889C76.6892 93.7889 75.9935 94.801 75.9935 96.6671V105.333H69.6083V82.4033ZM87.5004 89.5194H93.4749L94.9603 98.28C95.0242 98.6913 95.0874 99.1341 95.1189 99.6085H95.1821C95.2137 99.1341 95.2453 98.6913 95.3401 98.28L97.3316 89.5194H102.421L104.412 98.28C104.507 98.6913 104.539 99.1341 104.57 99.6085H104.634C104.665 99.1341 104.728 98.6913 104.792 98.28L106.278 89.5194H112.252L108.174 105.333H102.137L100.05 97.1416C99.9549 96.7619 99.9233 96.3823 99.9233 96.0663H99.8285C99.8285 96.3823 99.7969 96.7619 99.7022 97.1416L97.6159 105.333H91.5782L87.5004 89.5194ZM112.568 97.3628C112.568 91.7648 116.456 89.1398 121.23 89.1398C126.003 89.1398 129.892 91.7648 129.892 97.3628C129.892 102.961 126.003 105.713 121.23 105.713C116.456 105.713 112.568 102.961 112.568 97.3628ZM123.6 97.3628C123.6 94.485 122.715 93.2829 121.23 93.2829C119.744 93.2829 118.859 94.485 118.859 97.3628C118.859 100.241 119.744 101.569 121.23 101.569C122.715 101.569 123.6 100.241 123.6 97.3628ZM143.801 89.1398H143.99V95.1806C143.516 95.149 143.136 95.1174 142.599 95.1174C141.366 95.1174 140.387 95.4019 139.754 95.9395C139.027 96.5723 138.648 97.616 138.648 99.0393V105.333H132.262V89.5194H138.268V93.8521C139.122 90.6895 140.924 89.1398 143.801 89.1398ZM153.884 99.7349L152.746 101V105.333H146.361V82.4033H152.746V94.8958L156.792 89.5194H163.968L158.247 95.9079L164 105.333H157.077L153.884 99.7349Z"
				fill={colorScheme === 'dark' ? 'white' : 'black'}
			/>
		</G>
		<Defs>
			<ClipPath id="clip0_82_35985">
				<Rect
					width="164"
					height="111"
					fill={colorScheme === 'dark' ? 'white' : 'black'}
					transform="translate(0 0.5)"
				/>
			</ClipPath>
		</Defs>
	</Svg>
);

export const CheckboxSolid = (props: SvgProps) => (
	<Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
		<Rect width={22} height={22} rx={6} fill="#D24A34" />
		<Path
			d="M16.025 7.4c-.3-.3-.75-.3-1.05 0L9.35 13.025 7.025 10.7c-.3-.3-.75-.3-1.05 0-.3.3-.3.75 0 1.05l2.85 2.85c.15.15.3.225.525.225a.68.68 0 0 0 .525-.225l6.15-6.15c.3-.3.3-.75 0-1.05Z"
			fill="#fff"
		/>
	</Svg>
);

export const CheckboxOutlined = (props: SvgProps) => (
	<Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
		<Rect
			x={0.75}
			y={0.75}
			width={20.5}
			height={20.5}
			rx={5.25}
			stroke="#96A6C2"
			strokeWidth={1.5}
		/>
	</Svg>
);

type BackIconType = {
	colorScheme: 'dark' | 'light';
	isFromProfile?: boolean;
} & SvgProps;

export const BackIcon = ({
	colorScheme,
	isFromProfile,
	...props
}: BackIconType) => (
	<Svg
		width="40"
		height="40"
		viewBox="0 0 40 40"
		fill={isFromProfile ? 'rgba(46, 54, 59, 0.5)' : 'none'}
		{...props}
	>
		<Rect
			x="0.5"
			y="0.5"
			width="39"
			height="39"
			rx="19.5"
			stroke={
				isFromProfile
					? 'transparent'
					: colorScheme === 'dark'
					? 'white'
					: '#dce0eb'
			}
			stroke-opacity="0.4"
		/>
		<Path
			d="M15.8164 19.2852L21.0664 14.0625C21.3125 13.7891 21.7227 13.7891 21.9961 14.0625C22.2422 14.3086 22.2422 14.7188 21.9961 14.9648L17.1836 19.75L21.9688 24.5625C22.2422 24.8086 22.2422 25.2188 21.9688 25.4648C21.7227 25.7383 21.3125 25.7383 21.0664 25.4648L15.8164 20.2148C15.543 19.9688 15.543 19.5586 15.8164 19.2852Z"
			// fill={props?.stroke || 'white'}
			stroke={colorScheme === 'dark' ? 'white' : '#000'}
			strokeWidth={1}
		/>
	</Svg>
);

export const MastodonIcon = (props: SvgProps) => (
	<Svg width="25" height="25" viewBox="0 0 25 25" fill="none" {...props}>
		<G clip-path="url(#clip0_82_36006)">
			<Path
				d="M23.73 8.59566C23.73 3.65966 20.4592 2.21237 20.4592 2.21237C17.2494 0.754934 8.72495 0.770169 5.54599 2.21237C5.54599 2.21237 2.27463 3.65966 2.27463 8.59566C2.27463 14.4711 1.93578 21.7685 7.69764 23.2767C9.77741 23.8201 11.5646 23.9369 13.0026 23.8556C15.6111 23.7134 17.0748 22.9365 17.0748 22.9365L16.9876 21.0626C16.9876 21.0626 15.1234 21.6415 13.0282 21.5755C10.9536 21.5044 8.76705 21.3521 8.42667 18.8333C8.39511 18.5993 8.37967 18.3635 8.38046 18.1274C12.7767 19.1888 16.5255 18.5895 17.5574 18.4677C20.4386 18.1274 22.9481 16.3704 23.268 14.7657C23.7711 12.2367 23.73 8.59566 23.73 8.59566ZM19.8734 14.9536H17.4794V9.15426C17.4794 6.6304 14.1937 6.53391 14.1937 9.50465V12.6785H11.8151V9.50415C11.8151 6.53341 8.52935 6.62989 8.52935 9.15375V14.953H6.13024C6.13024 8.75257 5.86327 7.4424 7.0754 6.06621C8.4051 4.59862 11.1733 4.50213 12.406 6.37598L13.0015 7.36623L13.5971 6.37598C14.8349 4.49197 17.6077 4.60877 18.9277 6.06621C20.145 7.45256 19.8723 8.75765 19.8723 14.953L19.8734 14.9536Z"
				fill="#8C8DFF"
			/>
		</G>
		<Defs>
			<ClipPath id="clip0_82_36006">
				<Rect
					width="24.0002"
					height="24.0003"
					fill="white"
					transform="translate(0.499878 0.5)"
				/>
			</ClipPath>
		</Defs>
	</Svg>
);

export const DownIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => {
	return (
		<Svg width="13" height="7" viewBox="0 0 13 7" fill="none" {...props}>
			<Path
				d="M6.44141 6.71484L1.19141 1.46484C0.917969 1.21875 0.917969 0.808594 1.19141 0.535156C1.4375 0.289062 1.84766 0.289062 2.12109 0.535156L6.90625 5.34766L11.6914 0.5625C11.9375 0.289062 12.3477 0.289062 12.6211 0.5625C12.8672 0.808594 12.8672 1.21875 12.6211 1.46484L7.34375 6.71484C7.09766 6.98828 6.6875 6.98828 6.44141 6.71484Z"
				fill={colorScheme === 'dark' ? 'white' : 'grey'}
				fill-opacity="0.8"
			/>
		</Svg>
	);
};

export const SearchIcon = () => {
	return (
		<Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
			<Path
				d="M12.5 12.5L17.5 17.5M8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667Z"
				stroke="#96A6C2"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</Svg>
	);
};

export const RadioCheckedIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
		<Circle
			cx={12}
			cy={12}
			r={12}
			fill={colorScheme === 'dark' ? '#585e62' : '#000'}
		/>
		<Path
			d="m16.616 10.495-4.75 4.75a.86.86 0 0 1-.62.25c-.22 0-.44-.08-.61-.25l-2.38-2.37a.881.881 0 0 1 0-1.24c.34-.34.9-.34 1.24 0l1.75 1.75 4.13-4.13c.34-.34.9-.34 1.24 0 .34.35.34.9 0 1.24Z"
			fill="#fff"
			stroke={colorScheme === 'dark' ? '#585e62' : '#000'}
		/>
	</Svg>
);

export const RadioOutlined = (props: SvgProps) => (
	<Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
		<Circle
			cx={12}
			cy={12}
			r={11.038}
			fill="#fff"
			stroke="#DCE0EB"
			strokeWidth={1.925}
		/>
		<Path
			d="m16.616 10.495-4.75 4.75a.86.86 0 0 1-.62.25c-.22 0-.44-.08-.61-.25l-2.38-2.37a.881.881 0 0 1 0-1.24c.34-.34.9-.34 1.24 0l1.75 1.75 4.13-4.13c.34-.34.9-.34 1.24 0 .34.35.34.9 0 1.24Z"
			fill="#fff"
		/>
	</Svg>
);

export const Check = (props: SvgProps) => (
	<Svg width="10" height="8" viewBox="0 0 10 8" fill="none" {...props}>
		<Path
			d="M9.64062 1.08789C9.85547 1.30273 9.85547 1.625 9.64062 1.81836L3.96875 7.49023C3.77539 7.70508 3.45312 7.70508 3.25977 7.49023L0.337891 4.56836C0.123047 4.375 0.123047 4.05273 0.337891 3.83789C0.53125 3.64453 0.853516 3.64453 1.04688 3.83789L3.625 6.41602L8.93164 1.08789C9.125 0.894531 9.44727 0.894531 9.64062 1.08789Z"
			fill="white"
		/>
	</Svg>
);

export const ChevronRightIcon = (props: SvgProps) => (
	<Svg fill="none" width="9" height="13" viewBox="0 0 9 13" {...props}>
		<Path
			fill="#fff"
			d="M6.541 5.693c.229.254.229.635 0 .864l-4.875 4.875c-.254.253-.635.253-.863 0a.556.556 0 0 1 0-.838L5.246 6.15.803 1.682a.556.556 0 0 1 0-.838.556.556 0 0 1 .838 0l4.9 4.85Z"
		/>
	</Svg>
);

export const CaretRightIcon = (props: SvgProps) => (
	<Svg fill="none" width="6" height="6" viewBox="0 0 6 6" {...props}>
		<Path fill="#828689" d="M.504 4.564V.406l4.158 2.086L.504 4.564Z" />
	</Svg>
);

export const ChevronLeftIcon = (props: SvgProps) => (
	<Svg fill="none" width="6" height="9" viewBox="0 0 6 9" {...props}>
		<Path
			fill="#fff"
			d="m1.012 3.918 3.75-3.73c.176-.196.468-.196.664 0a.46.46 0 0 1 0 .644L1.988 4.25l3.418 3.438a.428.428 0 0 1 0 .644.428.428 0 0 1-.644 0l-3.75-3.75c-.196-.176-.196-.469 0-.664Z"
		/>
	</Svg>
);

export const Reply = (props: SvgProps) => (
	<Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
		<Path
			stroke="#828689"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M5.632 14.851a6.75 6.75 0 1 0-2.484-2.484l.003.004a.925.925 0 0 1 .095.19.359.359 0 0 1 .012.125.848.848 0 0 1-.052.196l-.577 1.73v.002c-.122.365-.183.547-.14.669.038.106.122.19.228.228.122.043.303-.018.667-.139l.004-.002 1.73-.576c.099-.033.149-.05.196-.053a.36.36 0 0 1 .126.013c.045.013.093.04.19.096l.002.001Z"
		/>
	</Svg>
);

export const RePost = (props: SvgProps) => (
	<Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
		<Path
			stroke="#828689"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M7.5 12H3.75v3.75M10.5 6h3.75V2.25M3.436 6.753a6 6 0 0 1 10.748-.77m.377 5.265a6 6 0 0 1-10.748.77"
		/>
	</Svg>
);

export const Heart = (props: SvgProps) => (
	<Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
		<Path
			stroke="#828689"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M14.428 4.678a3.073 3.073 0 0 1 .1 4.24L9 15 3.47 8.918a3.073 3.073 0 1 1 4.674-3.987L9 6.001l.855-1.07a3.074 3.074 0 0 1 4.573-.253Z"
		/>
	</Svg>
);

export const Tranlsate = (props: SvgProps) => (
	<Svg width="19" height="18" viewBox="0 0 19 18" fill="none" {...props}>
		<Path
			d="M9.425 16.5L12.8375 7.5H14.4125L17.825 16.5H16.25L15.4625 14.2125H11.825L11 16.5H9.425ZM12.275 12.9H14.975L13.6625 9.1875H13.5875L12.275 12.9ZM3.5 14.25L2.45 13.2L6.2375 9.4125C5.7625 8.8875 5.347 8.34375 4.991 7.78125C4.6345 7.21875 4.325 6.625 4.0625 6H5.6375C5.8625 6.45 6.10325 6.85625 6.35975 7.21875C6.61575 7.58125 6.925 7.9625 7.2875 8.3625C7.8375 7.7625 8.29375 7.147 8.65625 6.516C9.01875 5.8845 9.325 5.2125 9.575 4.5H1.25V3H6.5V1.5H8V3H13.25V4.5H11.075C10.8125 5.3875 10.4563 6.25 10.0063 7.0875C9.55625 7.925 9 8.7125 8.3375 9.45L10.1375 11.2875L9.575 12.825L7.25 10.5L3.5 14.25Z"
			fill="#828689"
			fill-opacity="0.4"
		/>
	</Svg>
);

export const ShareTo = (props: SvgProps) => (
	<Svg width="19" height="18" viewBox="0 0 19 18" fill="none" {...props}>
		<Path
			d="M7.25 4.5L9.5 2.25M9.5 2.25L11.75 4.5M9.5 2.25V9.75M5.75017 7.5C5.05126 7.5 4.7018 7.5 4.42615 7.61418C4.05861 7.76642 3.76642 8.05861 3.61418 8.42615C3.5 8.7018 3.5 9.05109 3.5 9.75V13.35C3.5 14.1901 3.5 14.6098 3.66349 14.9307C3.8073 15.2129 4.0366 15.4429 4.31885 15.5867C4.6394 15.75 5.05925 15.75 5.89768 15.75H13.1027C13.9411 15.75 14.3604 15.75 14.6809 15.5867C14.9632 15.4429 15.1929 15.2129 15.3367 14.9307C15.5 14.6101 15.5 14.1908 15.5 13.3523V9.75C15.5 9.05109 15.4999 8.7018 15.3857 8.42615C15.2335 8.05861 14.9416 7.76642 14.574 7.61418C14.2984 7.5 13.9489 7.5 13.25 7.5"
			stroke="#828689"
			stroke-opacity="0.4"
			stroke-width={2}
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</Svg>
);

export const MoreBtn = (props: SvgProps) => (
	<Svg width="14" height="18" viewBox="0 0 14 18" fill="none" {...props}>
		<Path
			d="M7.5 4.75024C7.27019 4.75024 7.04262 4.70498 6.8303 4.61703C6.61798 4.52909 6.42507 4.40018 6.26256 4.23768C6.10006 4.07518 5.97116 3.88226 5.88321 3.66994C5.79527 3.45762 5.75 3.23006 5.75 3.00024C5.75 2.77043 5.79527 2.54287 5.88321 2.33055C5.97116 2.11823 6.10006 1.92531 6.26256 1.76281C6.42507 1.6003 6.61798 1.4714 6.8303 1.38345C7.04262 1.29551 7.27019 1.25024 7.5 1.25024C7.96413 1.25024 8.40925 1.43462 8.73744 1.76281C9.06563 2.091 9.25 2.53612 9.25 3.00024C9.25 3.46437 9.06563 3.90949 8.73744 4.23768C8.40925 4.56587 7.96413 4.75024 7.5 4.75024ZM7.5 10.7502C7.03587 10.7502 6.59075 10.5659 6.26256 10.2377C5.93437 9.90949 5.75 9.46437 5.75 9.00024C5.75 8.53612 5.93437 8.091 6.26256 7.76281C6.59075 7.43462 7.03587 7.25024 7.5 7.25024C7.96413 7.25024 8.40925 7.43462 8.73744 7.76281C9.06563 8.091 9.25 8.53612 9.25 9.00024C9.25 9.46437 9.06563 9.90949 8.73744 10.2377C8.40925 10.5659 7.96413 10.7502 7.5 10.7502ZM5.75 15.0002C5.75 15.4644 5.93437 15.9095 6.26256 16.2377C6.59075 16.5659 7.03587 16.7502 7.5 16.7502C7.96413 16.7502 8.40925 16.5659 8.73744 16.2377C9.06563 15.9095 9.25 15.4644 9.25 15.0002C9.25 14.5361 9.06563 14.091 8.73744 13.7628C8.40925 13.4346 7.96413 13.2502 7.5 13.2502C7.03587 13.2502 6.59075 13.4346 6.26256 13.7628C5.93437 14.091 5.75 14.5361 5.75 15.0002Z"
			fill="#828689"
			fill-opacity="0.4"
		/>
	</Svg>
);

export const ChevronRight = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="5" height="8" viewBox="0 0 5 8" fill="none" {...props}>
		<Path
			d="M4.2207 3.82617C4.37891 4.00195 4.37891 4.26562 4.2207 4.42383L0.845703 7.79883C0.669922 7.97461 0.40625 7.97461 0.248047 7.79883C0.0722656 7.64062 0.0722656 7.37695 0.248047 7.21875L3.32422 4.14258L0.248047 1.04883C0.0722656 0.890625 0.0722656 0.626953 0.248047 0.46875C0.40625 0.292969 0.669922 0.292969 0.828125 0.46875L4.2207 3.82617Z"
			fill={colorScheme === 'dark' ? 'white' : 'black'}
		/>
	</Svg>
);

export const ListItem = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="14" height="12" viewBox="0 0 14 12" fill="none" {...props}>
		<Path
			d="M1.09375 0.0625H2.40625C2.76172 0.0625 3.0625 0.363281 3.0625 0.71875V2.03125C3.0625 2.41406 2.76172 2.6875 2.40625 2.6875H1.09375C0.710938 2.6875 0.4375 2.41406 0.4375 2.03125V0.71875C0.4375 0.363281 0.710938 0.0625 1.09375 0.0625ZM5.03125 0.71875H13.3438C13.6992 0.71875 14 1.01953 14 1.375C14 1.75781 13.6992 2.03125 13.3438 2.03125H5.03125C4.64844 2.03125 4.375 1.75781 4.375 1.375C4.375 1.01953 4.64844 0.71875 5.03125 0.71875ZM5.03125 5.09375H13.3438C13.6992 5.09375 14 5.39453 14 5.75C14 6.13281 13.6992 6.40625 13.3438 6.40625H5.03125C4.64844 6.40625 4.375 6.13281 4.375 5.75C4.375 5.39453 4.64844 5.09375 5.03125 5.09375ZM5.03125 9.46875H13.3438C13.6992 9.46875 14 9.76953 14 10.125C14 10.5078 13.6992 10.7812 13.3438 10.7812H5.03125C4.64844 10.7812 4.375 10.5078 4.375 10.125C4.375 9.76953 4.64844 9.46875 5.03125 9.46875ZM0.4375 5.09375C0.4375 4.73828 0.710938 4.4375 1.09375 4.4375H2.40625C2.76172 4.4375 3.0625 4.73828 3.0625 5.09375V6.40625C3.0625 6.78906 2.76172 7.0625 2.40625 7.0625H1.09375C0.710938 7.0625 0.4375 6.78906 0.4375 6.40625V5.09375ZM1.09375 8.8125H2.40625C2.76172 8.8125 3.0625 9.11328 3.0625 9.46875V10.7812C3.0625 11.1641 2.76172 11.4375 2.40625 11.4375H1.09375C0.710938 11.4375 0.4375 11.1641 0.4375 10.7812V9.46875C0.4375 9.11328 0.710938 8.8125 1.09375 8.8125Z"
			fill={colorScheme === 'dark' ? 'white' : 'black'}
		/>
	</Svg>
);

export const AddCommunityIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="18" height="15" viewBox="0 0 18 15" fill="none" {...props}>
		<Path
			d="M4.1875 5.125C3.39453 5.125 2.68359 4.71484 2.27344 4.03125C1.89062 3.375 1.89062 2.52734 2.27344 1.84375C2.68359 1.1875 3.39453 0.75 4.1875 0.75C4.95312 0.75 5.66406 1.1875 6.07422 1.84375C6.45703 2.52734 6.45703 3.375 6.07422 4.03125C5.66406 4.71484 4.95312 5.125 4.1875 5.125ZM14.25 5.125C13.457 5.125 12.7461 4.71484 12.3359 4.03125C11.9531 3.375 11.9531 2.52734 12.3359 1.84375C12.7461 1.1875 13.457 0.75 14.25 0.75C15.0156 0.75 15.7266 1.1875 16.1367 1.84375C16.5195 2.52734 16.5195 3.375 16.1367 4.03125C15.7266 4.71484 15.0156 5.125 14.25 5.125ZM0.25 8.92578C0.25 7.3125 1.53516 6 3.14844 6H4.32422C4.76172 6 5.17188 6.10938 5.55469 6.27344C5.5 6.46484 5.5 6.68359 5.5 6.875C5.5 7.94141 5.9375 8.87109 6.67578 9.5H6.64844H0.824219C0.496094 9.5 0.25 9.25391 0.25 8.92578ZM11.3242 9.5H11.2969C12.0352 8.87109 12.5 7.94141 12.5 6.875C12.5 6.68359 12.4727 6.46484 12.4453 6.27344C12.8008 6.10938 13.2109 6 13.6484 6H14.8242C16.4375 6 17.75 7.3125 17.75 8.92578C17.75 9.25391 17.4766 9.5 17.1484 9.5H16.793C16.6016 9.00781 16.1094 8.625 15.5625 8.625H14.6875C14.1133 8.625 13.6211 9.00781 13.4297 9.5H11.3242ZM11.625 11.6875V12.5625C11.625 13.3008 12.1992 13.875 12.9375 13.875H13.375V14.3125C13.375 14.4766 13.375 14.6133 13.4297 14.75H4.46094C4.05078 14.75 3.75 14.4219 3.75 14.0391C3.75 12.0156 5.36328 10.375 7.38672 10.375H10.5859C11.1328 10.375 11.625 10.5117 12.0625 10.7031C11.7891 10.9492 11.625 11.3047 11.625 11.6875ZM11.625 6.875C11.625 7.83203 11.1055 8.67969 10.3125 9.17188C9.49219 9.63672 8.48047 9.63672 7.6875 9.17188C6.86719 8.67969 6.375 7.83203 6.375 6.875C6.375 5.94531 6.86719 5.09766 7.6875 4.60547C8.48047 4.14062 9.49219 4.14062 10.3125 4.60547C11.1055 5.09766 11.625 5.94531 11.625 6.875ZM14.25 9.9375C14.25 9.71875 14.4414 9.5 14.6875 9.5H15.5625C15.7812 9.5 16 9.71875 16 9.9375V11.25H17.3125C17.5312 11.25 17.75 11.4688 17.75 11.6875V12.5625C17.75 12.8086 17.5312 13 17.3125 13H16V14.3125C16 14.5586 15.7812 14.75 15.5625 14.75H14.6875C14.4414 14.75 14.25 14.5586 14.25 14.3125V13H12.9375C12.6914 13 12.5 12.8086 12.5 12.5625V11.6875C12.5 11.4688 12.6914 11.25 12.9375 11.25H14.25V9.9375Z"
			fill={colorScheme === 'dark' ? 'white' : 'black'}
		/>
	</Svg>
);

export const SettingIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="15" height="15" viewBox="0 0 15 15" fill="none" {...props}>
		<Path
			d="M6.6875 2.17188L6.44141 3.12891C6.33203 3.59375 6.03125 3.94922 5.64844 4.14062L5.62109 4.16797C5.26562 4.38672 4.80078 4.49609 4.33594 4.35938L3.37891 4.05859C3.1875 4.30469 2.99609 4.55078 2.83203 4.82422L2.72266 5.01562C2.58594 5.28906 2.44922 5.5625 2.33984 5.86328L3.07812 6.54688C3.40625 6.875 3.57031 7.3125 3.57031 7.75V7.77734C3.57031 8.21484 3.40625 8.65234 3.07812 8.98047L2.33984 9.66406C2.44922 9.96484 2.58594 10.2383 2.72266 10.5117L2.83203 10.7031C2.99609 10.9766 3.1875 11.2227 3.37891 11.4688L4.33594 11.168C4.80078 11.0312 5.26562 11.1406 5.62109 11.3594H5.64844C6.03125 11.5781 6.33203 11.9336 6.44141 12.3984L6.6875 13.3555C7.01562 13.4102 7.37109 13.4375 7.72656 13.4375C8.05469 13.4375 8.41016 13.4102 8.73828 13.3555L8.98438 12.3984C9.09375 11.9336 9.42188 11.5781 9.77734 11.3594H9.80469C10.1602 11.1406 10.625 11.0312 11.0898 11.168L12.0469 11.4414C12.2383 11.2227 12.4297 10.9492 12.5938 10.7031L12.7031 10.5117C12.8398 10.2383 12.9766 9.9375 13.0859 9.66406L12.375 8.98047C12.0195 8.65234 11.8828 8.1875 11.8828 7.77734V7.75C11.8828 7.3125 12.0195 6.875 12.375 6.54688L13.0859 5.86328C12.9766 5.5625 12.8398 5.28906 12.7031 5.01562L12.5938 4.82422C12.4297 4.55078 12.2383 4.30469 12.0469 4.05859L11.0898 4.35938C10.625 4.46875 10.1602 4.38672 9.80469 4.16797L9.77734 4.14062C9.42188 3.94922 9.09375 3.59375 8.98438 3.12891L8.73828 2.17188C8.41016 2.11719 8.08203 2.0625 7.72656 2.0625C7.37109 2.0625 7.01562 2.11719 6.6875 2.17188ZM7.72656 0.75C8.19141 0.75 8.62891 0.804688 9.06641 0.886719C9.28516 0.941406 9.66797 1.05078 9.88672 1.43359C9.94141 1.54297 9.96875 1.65234 9.99609 1.76172L10.2695 2.82812C10.2695 2.88281 10.3242 2.9375 10.4336 3.01953C10.4336 3.01953 10.4609 3.01953 10.4609 3.04688C10.5703 3.10156 10.6797 3.10156 10.7344 3.07422L11.7734 2.77344C11.8828 2.74609 11.9922 2.71875 12.1016 2.71875C12.5391 2.71875 12.8398 2.99219 12.9766 3.15625C13.25 3.45703 13.4961 3.78516 13.7148 4.14062V4.16797L13.8242 4.35938L13.8516 4.38672C14.043 4.74219 14.207 5.09766 14.3438 5.50781C14.3984 5.69922 14.4805 6.10938 14.2617 6.46484C14.207 6.57422 14.125 6.65625 14.043 6.73828L13.2773 7.50391C13.2227 7.53125 13.1953 7.61328 13.1953 7.72266V7.75V7.77734C13.1953 7.91406 13.2227 7.99609 13.2773 8.02344L14.043 8.76172C14.125 8.84375 14.207 8.95312 14.2617 9.03516C14.5078 9.41797 14.4258 9.80078 14.3438 10.0195C14.207 10.4023 14.043 10.7852 13.8516 11.1406V11.168L13.7148 11.3594C13.4961 11.7148 13.25 12.0703 12.9766 12.3711C12.8398 12.5352 12.5391 12.8086 12.1016 12.8086C11.9922 12.7812 11.8828 12.7812 11.7734 12.7539L10.7344 12.4258C10.6797 12.4258 10.5703 12.4258 10.4883 12.4805C10.4609 12.5078 10.4336 12.5078 10.4336 12.5078C10.3242 12.5625 10.2695 12.6445 10.2695 12.6992L9.99609 13.7656C9.96875 13.875 9.94141 13.9844 9.88672 14.0938C9.66797 14.4766 9.28516 14.5859 9.06641 14.6406C8.62891 14.7227 8.19141 14.75 7.72656 14.75C7.26172 14.75 6.79688 14.7227 6.35938 14.6406C6.14062 14.5859 5.75781 14.4766 5.53906 14.0938C5.48438 13.9844 5.45703 13.875 5.42969 13.7656L5.18359 12.6992C5.15625 12.6445 5.10156 12.5625 5.01953 12.5078C4.99219 12.5078 4.96484 12.5078 4.96484 12.4805C4.85547 12.4258 4.77344 12.4258 4.71875 12.4258L3.67969 12.7539C3.57031 12.7812 3.43359 12.7812 3.32422 12.8086C2.88672 12.8086 2.58594 12.5352 2.44922 12.3711C2.17578 12.0703 1.92969 11.7148 1.71094 11.3594L1.60156 11.168L1.57422 11.1406C1.38281 10.7852 1.21875 10.4023 1.08203 10.0195C1.02734 9.80078 0.945312 9.41797 1.16406 9.0625C1.21875 8.95312 1.30078 8.87109 1.38281 8.78906L2.17578 8.02344C2.20312 7.99609 2.25781 7.91406 2.25781 7.80469V7.77734V7.72266C2.25781 7.61328 2.20312 7.53125 2.17578 7.50391L1.38281 6.73828C1.30078 6.65625 1.21875 6.57422 1.16406 6.46484C0.945312 6.10938 1.02734 5.72656 1.08203 5.50781C1.21875 5.125 1.38281 4.74219 1.60156 4.38672V4.35938L1.71094 4.16797C1.92969 3.8125 2.17578 3.45703 2.44922 3.15625C2.58594 2.99219 2.88672 2.71875 3.32422 2.71875C3.43359 2.71875 3.57031 2.74609 3.67969 2.77344L4.69141 3.07422C4.77344 3.10156 4.85547 3.10156 4.96484 3.04688C4.96484 3.01953 4.99219 3.01953 4.99219 3.01953C5.10156 2.9375 5.15625 2.88281 5.15625 2.82812L5.42969 1.76172C5.45703 1.65234 5.48438 1.54297 5.53906 1.43359C5.75781 1.05078 6.14062 0.941406 6.35938 0.886719C6.79688 0.804688 7.26172 0.75 7.72656 0.75ZM6.41406 7.75C6.41406 8.24219 6.66016 8.65234 7.07031 8.89844C7.45312 9.14453 7.97266 9.14453 8.38281 8.89844C8.76562 8.65234 9.03906 8.24219 9.03906 7.75C9.03906 7.28516 8.76562 6.875 8.38281 6.62891C7.97266 6.38281 7.45312 6.38281 7.07031 6.62891C6.66016 6.875 6.41406 7.28516 6.41406 7.75ZM10.3516 7.75C10.3516 8.70703 9.83203 9.55469 9.03906 10.0469C8.21875 10.5117 7.20703 10.5117 6.41406 10.0469C5.59375 9.55469 5.10156 8.70703 5.10156 7.75C5.10156 6.82031 5.59375 5.97266 6.41406 5.48047C7.20703 5.01562 8.21875 5.01562 9.03906 5.48047C9.83203 5.97266 10.3516 6.82031 10.3516 7.75Z"
			fill={colorScheme === 'dark' ? 'white' : 'black'}
		/>
	</Svg>
);

type TabProp = {
	focused: boolean;
	colorScheme: 'dark' | 'light';
};

const color = [
	{
		dark: 'white',
		light: '#ED1800',
	},
	{
		dark: '#585e62',
		light: '#333',
	},
];

export const HomeTabIcon = ({
	focused,
	colorScheme,
	...props
}: TabProp & SvgProps) => (
	<Svg width="39" height="36" viewBox="0 0 39 36" fill="none" {...props}>
		<Path
			d="M30.7109 18.5C30.7109 19.2031 30.125 19.75 29.4609 19.75H28.2109L28.25 26C28.25 26.1172 28.25 26.2344 28.25 26.3125V26.9375C28.25 27.8359 27.5469 28.5 26.6875 28.5H26.0625C25.9844 28.5 25.9453 28.5 25.9062 28.5C25.8672 28.5 25.7891 28.5 25.75 28.5H24.5H23.5625C22.6641 28.5 22 27.8359 22 26.9375V26V23.5C22 22.8359 21.4141 22.25 20.75 22.25H18.25C17.5469 22.25 17 22.8359 17 23.5V26V26.9375C17 27.8359 16.2969 28.5 15.4375 28.5H14.5H13.25C13.1719 28.5 13.1328 28.5 13.0547 28.5C13.0156 28.5 12.9766 28.5 12.9375 28.5H12.3125C11.4141 28.5 10.75 27.8359 10.75 26.9375V22.5625C10.75 22.5625 10.75 22.5234 10.75 22.4844V19.75H9.5C8.79688 19.75 8.25 19.2031 8.25 18.5C8.25 18.1484 8.36719 17.8359 8.64062 17.5625L18.6406 8.8125C18.9141 8.53906 19.2266 8.5 19.5 8.5C19.7734 8.5 20.0859 8.57812 20.3203 8.77344L30.2812 17.5625C30.5938 17.8359 30.75 18.1484 30.7109 18.5Z"
			fill={focused ? color[0][colorScheme] : color[1][colorScheme]}
		/>
	</Svg>
);

export const SearchTabIcon = ({
	focused,
	colorScheme,
	...props
}: TabProp & SvgProps) => {
	return (
		<Svg width="21" height="21" viewBox="0 0 21 21" fill="none" {...props}>
			<Path
				d="M16.75 8.625C16.75 10.4219 16.1641 12.1016 15.1875 13.4297L20.1094 18.3906C20.6172 18.8594 20.6172 19.6797 20.1094 20.1484C19.6406 20.6562 18.8203 20.6562 18.3516 20.1484L13.3906 15.1875C12.0625 16.2031 10.3828 16.75 8.625 16.75C4.13281 16.75 0.5 13.1172 0.5 8.625C0.5 4.17188 4.13281 0.5 8.625 0.5C13.0781 0.5 16.75 4.17188 16.75 8.625ZM8.625 14.25C10.6172 14.25 12.4531 13.1953 13.4688 11.4375C14.4844 9.71875 14.4844 7.57031 13.4688 5.8125C12.4531 4.09375 10.6172 3 8.625 3C6.59375 3 4.75781 4.09375 3.74219 5.8125C2.72656 7.57031 2.72656 9.71875 3.74219 11.4375C4.75781 13.1953 6.59375 14.25 8.625 14.25Z"
				fill={focused ? color[0][colorScheme] : color[1][colorScheme]}
			/>
		</Svg>
	);
};

export const NotificationTabIcon = ({
	focused,
	colorScheme,
	...props
}: TabProp & SvgProps) => (
	<Svg width="19" height="21" viewBox="0 0 19 21" fill="none" {...props}>
		<Path
			d="M9.5 0.5C10.1641 0.5 10.75 1.08594 10.75 1.75V2.53125C13.6016 3.07812 15.75 5.61719 15.75 8.625V9.36719C15.75 11.2031 16.4141 13 17.625 14.3672L17.8984 14.6797C18.25 15.0703 18.3281 15.5781 18.1328 16.0469C17.9375 16.4766 17.4688 16.75 17 16.75H2C1.49219 16.75 1.02344 16.4766 0.828125 16.0469C0.632812 15.5781 0.710938 15.0703 1.0625 14.6797L1.33594 14.3672C2.54688 13 3.25 11.2031 3.25 9.36719V8.625C3.25 5.61719 5.39844 3.07812 8.25 2.53125V1.75C8.25 1.08594 8.79688 0.5 9.5 0.5ZM11.2578 19.7969C10.7891 20.2656 10.1641 20.5 9.5 20.5C8.83594 20.5 8.17188 20.2656 7.70312 19.7969C7.23438 19.3281 7 18.6641 7 18H9.5H12C12 18.6641 11.7266 19.3281 11.2578 19.7969Z"
			fill={focused ? color[0][colorScheme] : color[1][colorScheme]}
		/>
	</Svg>
);

export const MessageTabIcon = ({
	focused,
	colorScheme,
	...props
}: TabProp & SvgProps) => (
	<Svg width="20" height="15" viewBox="0 0 20 15" fill="none" {...props}>
		<Path
			d="M1.875 0H18.125C19.1406 0 20 0.859375 20 1.875C20 2.5 19.6875 3.04688 19.2188 3.39844L10.7422 9.76562C10.2734 10.1172 9.6875 10.1172 9.21875 9.76562L0.742188 3.39844C0.273438 3.04688 0 2.5 0 1.875C0 0.859375 0.820312 0 1.875 0ZM0 4.375L8.47656 10.7812C9.375 11.4453 10.5859 11.4453 11.4844 10.7812L20 4.375V12.5C20 13.9062 18.8672 15 17.5 15H2.5C1.09375 15 0 13.9062 0 12.5V4.375Z"
			fill={focused ? color[0][colorScheme] : color[1][colorScheme]}
		/>
	</Svg>
);

export const ComposeTabIcon = ({
	focused,
	colorScheme,
	...props
}: TabProp & SvgProps) => (
	<Svg width="17" height="17" viewBox="0 0 17 17" fill="none" {...props}>
		<Path
			d="M10.125 1.625V7.25H15.75C16.4141 7.25 17 7.83594 17 8.5C17 9.20312 16.4141 9.75 15.75 9.75H10.125V15.375C10.125 16.0781 9.53906 16.625 8.875 16.625C8.17188 16.625 7.625 16.0781 7.625 15.375V9.75H2C1.29688 9.75 0.75 9.20312 0.75 8.5C0.75 7.83594 1.29688 7.25 2 7.25H7.625V1.625C7.625 0.960938 8.17188 0.375 8.875 0.375C9.53906 0.375 10.125 0.960938 10.125 1.625Z"
			fill="white"
		/>
	</Svg>
);
export const CalendarIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg width="12" height="14" viewBox="0 0 12 14" fill="none" {...props}>
		<Path
			fill="#969A9D"
			d="M3.86.734V1.75h3.656V.734c0-.33.254-.609.609-.609.33 0 .61.28.61.61V1.75H9.75c.889 0 1.625.736 1.625 1.625V11.5a1.62 1.62 0 0 1-1.625 1.625H1.625C.711 13.125 0 12.415 0 11.5V3.375C0 2.486.71 1.75 1.625 1.75h1.016V.734c0-.33.254-.609.609-.609.33 0 .61.28.61.61ZM1.218 5v6.5c0 .229.177.406.406.406H9.75a.417.417 0 0 0 .406-.406V5H1.22Z"
		/>
	</Svg>
);

export const CheckIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => (
	<Svg fill="none" width="13" height="9" viewBox="0 0 13 9" {...props}>
		<Path
			fill={colorScheme === 'dark' ? '#FFF' : '#969A9D'}
			d="M12.172.24c.254.254.254.635 0 .864L5.469 7.807a.556.556 0 0 1-.838 0L1.178 4.354c-.254-.229-.254-.61 0-.864a.598.598 0 0 1 .838 0l3.046 3.047L11.335.24a.598.598 0 0 1 .838 0Z"
		/>
	</Svg>
);

export const UpalodImageIcon = ({
	colorScheme,
	...props
}: SvgProps & ColorSchemeType) => {
	return (
		<Svg width="16" height="17" viewBox="0 0 16 17" fill="none" {...props}>
			<Path
				d="M8.75 11.75C8.75 12.1875 8.40625 12.5 8 12.5C7.5625 12.5 7.25 12.1875 7.25 11.75V3.0625L4.28125 6.03125C3.96875 6.34375 3.5 6.34375 3.21875 6.03125C2.90625 5.75 2.90625 5.28125 3.21875 4.96875L7.46875 0.71875C7.75 0.4375 8.21875 0.4375 8.5 0.71875L12.7812 4.96875C13.0625 5.28125 13.0625 5.75 12.7812 6.03125C12.4688 6.34375 12 6.34375 11.7188 6.03125L8.75 3.0625V11.75ZM9.75 11.5V10H14C15.0938 10 16 10.9062 16 12V14.5C16 15.625 15.0938 16.5 14 16.5H2C0.875 16.5 0 15.625 0 14.5V12C0 10.9062 0.875 10 2 10H6.25V11.5H2C1.71875 11.5 1.5 11.75 1.5 12V14.5C1.5 14.7812 1.71875 15 2 15H14C14.25 15 14.5 14.7812 14.5 14.5V12C14.5 11.75 14.25 11.5 14 11.5H9.75ZM12 13.25C12 12.8438 12.3125 12.5 12.75 12.5C13.1562 12.5 13.5 12.8438 13.5 13.25C13.5 13.6875 13.1562 14 12.75 14C12.3125 14 12 13.6875 12 13.25Z"
				fill={colorScheme === 'dark' ? '#FFF' : '#969A9D'}
			/>
		</Svg>
	);
};

export const DeleteIcon = ({ ...props }: SvgProps) => (
	<Svg width="14" height="16" viewBox="0 0 14 16" fill="none" {...props}>
		<Path
			d="M4.98047 2.39844L4.42383 3.21875H8.67188L8.11523 2.39844C8.08594 2.33984 7.99805 2.28125 7.91016 2.28125H5.18555C5.09766 2.28125 5.00977 2.33984 4.98047 2.39844ZM9.28711 1.60742L10.3711 3.21875H10.7812H12.1875H12.4219C12.8027 3.21875 13.125 3.54102 13.125 3.92188C13.125 4.33203 12.8027 4.625 12.4219 4.625H12.1875V13.5312C12.1875 14.8496 11.1328 15.875 9.84375 15.875H3.28125C1.96289 15.875 0.9375 14.8496 0.9375 13.5312V4.625H0.703125C0.292969 4.625 0 4.33203 0 3.92188C0 3.54102 0.292969 3.21875 0.703125 3.21875H0.9375H2.34375H2.72461L3.80859 1.60742C4.10156 1.16797 4.62891 0.875 5.18555 0.875H7.91016C8.4668 0.875 8.99414 1.16797 9.28711 1.60742ZM2.34375 4.625V13.5312C2.34375 14.0586 2.75391 14.4688 3.28125 14.4688H9.84375C10.3418 14.4688 10.7812 14.0586 10.7812 13.5312V4.625H2.34375ZM4.6875 6.5V12.5938C4.6875 12.8574 4.45312 13.0625 4.21875 13.0625C3.95508 13.0625 3.75 12.8574 3.75 12.5938V6.5C3.75 6.26562 3.95508 6.03125 4.21875 6.03125C4.45312 6.03125 4.6875 6.26562 4.6875 6.5ZM7.03125 6.5V12.5938C7.03125 12.8574 6.79688 13.0625 6.5625 13.0625C6.29883 13.0625 6.09375 12.8574 6.09375 12.5938V6.5C6.09375 6.26562 6.29883 6.03125 6.5625 6.03125C6.79688 6.03125 7.03125 6.26562 7.03125 6.5ZM9.375 6.5V12.5938C9.375 12.8574 9.14062 13.0625 8.90625 13.0625C8.64258 13.0625 8.4375 12.8574 8.4375 12.5938V6.5C8.4375 6.26562 8.64258 6.03125 8.90625 6.03125C9.14062 6.03125 9.375 6.26562 9.375 6.5Z"
			fill="#FF3C26"
		/>
	</Svg>
);
