import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';
import MenuOptionIcon from '../MenuOptionIcon/MenuOptionIcon';
import { StatusReportIcon } from '@/util/svg/icon.status_actions';
import ReportContentModal from './ReportContentModal/ReportContentModal';

const ReportMenuOption = ({
	status,
	hideMenu,
}: {
	status: Pathchwork.Status;
	hideMenu: () => void;
}) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			{showModal && (
				<ReportContentModal
					visible={showModal}
					onClose={() => setShowModal(false)}
					status={status}
				/>
			)}
			<MenuOption onSelect={() => setShowModal(true)}>
				<MenuOptionIcon icon={<StatusReportIcon />} name="Report" />
			</MenuOption>
		</>
	);
};

export default ReportMenuOption;
