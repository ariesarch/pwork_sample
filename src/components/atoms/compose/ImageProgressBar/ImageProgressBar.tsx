import { useManageAttachmentStore } from '@/store/compose/manageAttachments/manageAttachmentStore';
import * as Progress from 'react-native-progress';

const ImageProgressBar = ({ size = 50 }: { size?: number }) => {
	const progressInfo = useManageAttachmentStore(state => state.progress);

	return (
		<Progress.Circle
			progress={progressInfo?.progress! / 100}
			size={size}
			color="#FF3C26"
		/>
	);
};
export default ImageProgressBar;
