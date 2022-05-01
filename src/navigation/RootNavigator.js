import { useEffect } from 'react'
import useLogin from '../hooks/useLogin'
import { useDispatch } from 'react-redux'
import SideMenu from '../components/SideMenu'
import useUserData from '../hooks/useUserData'
import HomeStack from './stackNavigators/HomeStack'
import OrdersStack from './stackNavigators/OrdersStack'
import ProfileStack from './stackNavigators/ProfileStack'
import ContactStack from './stackNavigators/ContactStack'
import AboutUsStack from './stackNavigators/AboutUsStack'
import * as UserActions from '../store/actions/UserActions'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomActivityIndicator from '../components/CustomActivityIndicator'
import { drawerAboutUsOptions, drawerContactOptions, drawerHomeOptions, drawerOrdersOptions, drawerProfileOptions, drawerNavigatorOptions } from './options/drawerOptions'

const RootNavigator = () => {
  const Drawer = createDrawerNavigator()

  const dispatch = useDispatch()
  const [userId, loading] = useLogin()
  const [getUserData,, userLoading] = useUserData()

  useEffect(async () => {
    if (userId) {
      const userData = await getUserData(userId)

      if (userData) {
        dispatch(UserActions.setUserInformation(userData.name, userData.phone, userData.direction))
      }
    }
  }, [userId])

  if (loading || userLoading) {
    return <CustomActivityIndicator />
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={drawerNavigatorOptions} drawerContent={props => <SideMenu {...props} />}>
        <Drawer.Screen name='Home' component={HomeStack} options={drawerHomeOptions} />
        <Drawer.Screen name='Orders' component={OrdersStack} options={drawerOrdersOptions} />
        <Drawer.Screen name='Contact' component={ContactStack} options={drawerContactOptions} />
        <Drawer.Screen name='AboutUs' component={AboutUsStack} options={drawerAboutUsOptions} />
        <Drawer.Screen name='Profile' component={ProfileStack} options={drawerProfileOptions} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
