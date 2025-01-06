import { ThemeText } from '@/components/atoms/common/ThemeText/ThemeText';
import Underline from '@/components/atoms/common/Underline/Underline';
import { RemoveCrossIcon } from '@/util/svg/icon.status_actions';
import React, { useMemo, useState } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import ReportContentData from '../ReportContentData/ReportContentData';
import { ReportItem } from '@/util/constant/reportItem';
import { Button } from '@/components/atoms/common/Button/Button';
import { useForm } from 'react-hook-form';
import ReportViolationData from '../ReportViolationData/ReportViolationData';
import ReportContentWithComment from '../ReportContentWithComment/ReportContentWithComment';
import { useReportMutation } from '@/hooks/mutations/feed.mutation';

interface ReportContentModalProps {
	status: Patchwork.Status;
	visible: boolean;
	onClose: () => void;
}
const ReportContentModal = ({
	visible,
	onClose,
	status,
}: ReportContentModalProps) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<{ comment: string; forward?: boolean }>();

	const isOtherServerUser = status.account.acct.includes('@');
	const otherServerUserDomain = status.account.acct.split('@')[1];

	const [page, setPage] = useState(1);
	const [selectedCategory, setSelectedCategory] =
		useState<ReportItem['category']>('');
	const [selectedViolationItem, setSelectedViolationItem] = useState<string[]>(
		[],
	);

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
	};

	const handleCheckboxChange = (value: string) => {
		if (selectedViolationItem.includes(value)) {
			setSelectedViolationItem(
				selectedViolationItem.filter(item => item !== value),
			);
		} else {
			setSelectedViolationItem([...selectedViolationItem, value]);
		}
	};

	const onNextPage = () => {
		setPage(prev => prev + 1);
	};

	const displayReportDialogModalTitle = useMemo(() => {
		if ((page == 2 && selectedCategory != 'violation') || page == 3) {
			return 'Is there anything else you think we should know?';
		}
		if (page == 2 && selectedCategory == 'violation')
			return 'Which rules are being violated?';

		if (page == 1) {
			return "Tell us what's going on with this post";
		}
	}, [page, selectedCategory]);

	const showAdditionalCommentTextarea = useMemo(() => {
		if (page == 3) return true;
		if (page == 2 && selectedCategory != 'violation') return true;
		return false;
	}, [page, selectedCategory]);

	const mutation = useReportMutation({
		onSuccess: () => {
			reset();
			onClose();
		},
	});

	const onSubmit = (data: { comment: string; forward?: boolean }) => {
		if (page == 1 || (page == 2 && selectedCategory == 'violation')) {
			onNextPage();
		} else {
			const payload = {
				category: selectedCategory,
				comment: data.comment ?? '',
				account_id: status.account.id, // isProfile report use account.id
				status_ids: [],
				forward: data.forward ?? false,
				forward_to_domains: data.forward ? [otherServerUserDomain] : [],
				rule_ids: selectedViolationItem ?? [],
			};
			console.log('🚀 ~ onSubmit ~ payload:', payload);
			mutation.mutate(payload);
		}
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View className="flex-1 items-center justify-center bg-modal-bg">
				<View className="bg-patchwork-dark-400 w-11/12 rounded-md">
					<View className="py-3 px-6 items-center">
						<ThemeText size={'lg_18'}>
							Reporting {status.account.acct}
						</ThemeText>
						<Pressable className=" absolute top-3 right-2" onPress={onClose}>
							<RemoveCrossIcon />
						</Pressable>
					</View>
					<Underline className="dark:border-patchwork-grey-400" />
					<View className="px-5 py-3">
						<ThemeText size={'xl_20'} className=" font-SourceSans3_SemiBold">
							{displayReportDialogModalTitle}
						</ThemeText>
						{page === 1 && (
							<ReportContentData
								selectedCategory={selectedCategory}
								handleCategoryChange={handleCategoryChange}
							/>
						)}
						{page === 2 && selectedCategory == 'violation' && (
							<ReportViolationData
								selectedViolationItem={selectedViolationItem}
								handleCheckboxChange={handleCheckboxChange}
							/>
						)}
						{showAdditionalCommentTextarea && (
							<ReportContentWithComment
								control={control}
								isOtherServerUser={isOtherServerUser}
								otherServerUserDomain={otherServerUserDomain}
							/>
						)}
						<Button
							disabled={
								page == 1
									? selectedCategory == ''
									: selectedCategory == 'violation' &&
									  selectedViolationItem.length == 0
							}
							onPress={handleSubmit(onSubmit)}
							className="mt-7 mb-2"
						>
							<ThemeText>
								{page == 1 || (page == 2 && selectedCategory == 'violation')
									? 'Next'
									: 'Submit'}
							</ThemeText>
						</Button>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default ReportContentModal;
