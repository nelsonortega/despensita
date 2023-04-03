import { useSelector } from 'react-redux'
import React, { ReactElement } from 'react'
import { IStoreState } from '../../store/store'
import { screenHeaderIcon, screenOptions } from '../options/options'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthenticationScreen, ProfileScreen, UpdateUserScreen } from '../../screens'

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
