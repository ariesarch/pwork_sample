const styles = {
	tabItem: (isActiveTab: boolean) => {
		return /* tw */ `flex flex-1 rounded-lg items-center p-3 ${
			isActiveTab ? 'bg-white' : 'bg-primaryDark'
		}`;
	},

	tabItemText: (isActiveTab: boolean) => {
		return /* tw */ `test-base ${
			isActiveTab ? 'text-primaryDark' : 'text-white'
		}`;
	},
};

export default styles;
