import {
	MuteAndBlockList,
	MyInformation,
	Settings,
	UpdatePassword,
} from '@/screens';
import { SettingStackParamList } from '@/types/navigation';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator<SettingStackParamList>();

const SettingStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Settings" component={Settings} />
			<Stack.Screen name="UpdatePassword" component={UpdatePassword} />
			<Stack.Screen name="MuteAndBlockList" component={MuteAndBlockList} />
			<Stack.Screen name="MyInformation" component={MyInformation} />
		</Stack.Navigator>
	);
};

export default SettingStack;
