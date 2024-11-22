import { PermissionsAndroid, Platform } from 'react-native';

const hasMediaPermissions = async () => {
	const checkPermissions = async () => {
		if ((Platform.Version as number) >= 33) {
			const [hasReadMediaImagesPermission, hasReadMediaVideoPermission] =
				await Promise.all([
					PermissionsAndroid.check(
						PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
					),
					PermissionsAndroid.check(
						PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
					),
				]);
			return hasReadMediaImagesPermission && hasReadMediaVideoPermission;
		} else {
			return PermissionsAndroid.check(
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
			);
		}
	};

	const hasPermission = await checkPermissions();
	if (hasPermission) {
		return true;
	}

	const requestPermissions = async () => {
		if ((Platform.Version as number) >= 33) {
			const statuses = await PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
				PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
			]);
			return (
				statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
					PermissionsAndroid.RESULTS.GRANTED &&
				statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
					PermissionsAndroid.RESULTS.GRANTED
			);
		} else {
			const status = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
			);
			return status === PermissionsAndroid.RESULTS.GRANTED;
		}
	};

	return await requestPermissions();
};

const hasCameraPermission = async () => {
	const checkPermission = async () =>
		PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);

	const hasPermission = await checkPermission();
	if (hasPermission) {
		return true;
	}

	const requestPermission = async () => {
		const status = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.CAMERA,
		);
		return status === PermissionsAndroid.RESULTS.GRANTED;
	};

	return await requestPermission();
};

export { hasMediaPermissions, hasCameraPermission };
