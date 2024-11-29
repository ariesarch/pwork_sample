import { useManageAttachmentStore } from '@/store/compose/manageAttachments/manageAttachmentStore';
import * as Progress from 'react-native-progress';

const ImageProgressBar = () => {
	const progressInfo = useManageAttachmentStore(state => state.progress);

	return (
		<Progress.Circle
			progress={progressInfo?.progress! / 100}
			size={50}
			color="#FF3C26"
		/>
	);
};
export default ImageProgressBar;
