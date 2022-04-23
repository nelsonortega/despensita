import { useSelector } from 'react-redux'
import ProfileScreen from '../../screens/ProfileScreen'
import UpdateUserScreen from '../../screens/UpdateUserScreen'
import { screenHeaderIcon, screenOptions } from '../options/options'
import AuthenticationScreen from '../../screens/AuthenticationScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const ProfileStack = () => {
  const ProfileStack = createNativeStackNavigator()
  const isUserLoggedIn = useSelector(state => state.auth.userId)

  return (
    <ProfileStack.Navigator screenOptions={screenOptions}>
      {isUserLoggedIn &&
        <>
          <ProfileStack.Screen name='ProfileScreen' component={ProfileScreen} options={screenHeaderIcon} />
          <ProfileStack.Screen name='UpdateUser' component={UpdateUserScreen} />
        </>}
      {!isUserLoggedIn &&
        <ProfileStack.Screen name='Authentication' component={AuthenticationScreen} options={screenHeaderIcon} />}
    </ProfileStack.Navigator>
  )
}

export default ProfileStack
