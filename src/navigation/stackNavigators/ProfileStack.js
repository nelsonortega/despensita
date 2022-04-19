import { useSelector } from 'react-redux'
import { screenOptions } from '../options/options'
import HeaderIcon from '../../components/HeaderIcon'
import ProfileScreen from '../../screens/ProfileScreen'
import UpdateUserScreen from '../../screens/UpdateUserScreen'
import AuthenticationScreen from '../../screens/AuthenticationScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const ProfileStack = () => {
  const ProfileStack = createNativeStackNavigator()
  const isUserLoggedIn = useSelector(state => state.auth.userId)

  return (
    <ProfileStack.Navigator screenOptions={screenOptions}>
      {isUserLoggedIn ?
        <>
          <ProfileStack.Screen name='ProfileScreen' component={ProfileScreen} options={{
            headerLeft: () => <HeaderIcon iconName='md-menu' />
          }} />
          <ProfileStack.Screen name='UpdateUser' component={UpdateUserScreen} />
        </>
        :
        <ProfileStack.Screen name='Authentication' component={AuthenticationScreen} options={{
          headerLeft: () => <HeaderIcon iconName='md-menu' />
        }} />
      }
    </ProfileStack.Navigator>
  )
}

export default ProfileStack
