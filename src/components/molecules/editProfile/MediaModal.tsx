import React from 'react';
import ThemeModal from '@/components/atoms/common/Modal/Modal';
import ManageAttachmentModal from '@/components/organisms/profile/ManageAttachment/MakeAttachmentModal';

interface MediaModalProps {
	type: 'header' | 'avatar';
	isOpen: boolean;
	onClose: () => void;
	imageUrl: string | null;
	onDelete: () => void;
}

const MediaModal: React.FC<MediaModalProps> = ({
	type,
	isOpen,
	onClose,
	imageUrl,
	onDelete,
}) => (
	<ThemeModal
		hasNotch={false}
		openThemeModal={isOpen}
		onCloseThemeModal={onClose}
		modalPositionStyle={{ justifyContent: 'flex-end' }}
		containerStyle={{ borderRadius: 0 }}
	>
		<ManageAttachmentModal
			type={type}
			onToggleMediaModal={onClose}
			imageUrl={imageUrl}
			handleOnPressDelete={onDelete}
		/>
	</ThemeModal>
);

export default MediaModal;
