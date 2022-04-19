import { useSelector } from 'react-redux'
import { screenOptions } from '../options/options'
import AuthenticationScreen from '../../screens/AuthenticationScreen'
import UserInformationScreen from '../../screens/UserInformationScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const UserInformationStack = () => {
  const UserInformationStack = createNativeStackNavigator()
  const isUserLoggedIn = useSelector(state => state.auth.userId)

  return (
    <UserInformationStack.Navigator screenOptions={screenOptions}>
      {isUserLoggedIn
        ? <UserInformationStack.Screen name='UserInformationScreen' component={UserInformationScreen} options={{ headerShown: false }} />
        : <UserInformationStack.Screen name='Authentication' component={AuthenticationScreen} options={{ headerShown: false }} />}
    </UserInformationStack.Navigator>
  )
}

export default UserInformationStack
