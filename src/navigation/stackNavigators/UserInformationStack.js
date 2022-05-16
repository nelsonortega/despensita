import { useSelector } from 'react-redux'
import { screenOptions } from '../options/options'
import AuthenticationScreen from '../../screens/AuthenticationScreen'
import UserInformationScreen from '../../screens/UserInformationScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const UserInformationStack = () => {
  const UserInformationStack = createNativeStackNavigator()
  const user = useSelector(state => state.user)

  return (
    <UserInformationStack.Navigator screenOptions={screenOptions}>
      {user.userId !== ''
        ? <UserInformationStack.Screen name='UserInformationScreen' component={UserInformationScreen} options={{ headerShown: false }} />
        : <UserInformationStack.Screen name='Authentication' component={AuthenticationScreen} options={{ headerShown: false }} />}
    </UserInformationStack.Navigator>
  )
}

export default UserInformationStack
