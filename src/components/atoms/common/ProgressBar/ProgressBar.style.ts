const styles = {
	progressWraper:
		/* tw */ 'flex flex-row justify-between items-center my-5',
	getBarWrapperStyle: (isFinish: boolean) => {
		return `h-[5] rounded-2xl ${
			isFinish ? 'bg-patchwork-red-50' : 'bg-patchwork-dark-50'
		}`;
	},
};

export default styles;
