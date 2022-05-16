import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { IStoreState } from '../../newStore/store'
import ProfileScreen from '../../screens/ProfileScreen'
import UpdateUserScreen from '../../screens/UpdateUserScreen'
import { screenHeaderIcon, screenOptions } from '../options/options'
import AuthenticationScreen from '../../screens/AuthenticationScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const ProfileStack = (): ReactElement => {
  const ProfileStack = createNativeStackNavigator()
  const user = useSelector((state: IStoreState) => state.user)

  return (
    <ProfileStack.Navigator screenOptions={screenOptions}>
      {user.userId !== '' &&
        <>
          <ProfileStack.Screen name='ProfileScreen' component={ProfileScreen} options={screenHeaderIcon} />
          <ProfileStack.Screen name='UpdateUser' component={UpdateUserScreen} />
        </>}
      {user.userId === '' &&
        <ProfileStack.Screen name='Authentication' component={AuthenticationScreen} options={screenHeaderIcon} />}
    </ProfileStack.Navigator>
  )
}

export default ProfileStack
