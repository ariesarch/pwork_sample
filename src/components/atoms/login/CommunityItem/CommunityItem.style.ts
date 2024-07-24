const styles = {
	commItemWrapper: (isSelcted: boolean) =>
		`mx-2 my-1 py-2 px-2 rounded-2xl items-center ${
			isSelcted ? 'bg-patchwork-red-50' : 'bg-patchwork-dark-50'
		}`,
};

export default styles;
