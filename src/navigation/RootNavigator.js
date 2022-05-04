import { useEffect } from 'react'
import useLogin from '../hooks/useLogin'
import SideMenu from '../components/SideMenu'
import useUserData from '../hooks/useUserData'
import HomeStack from './stackNavigators/HomeStack'
import OrdersStack from './stackNavigators/OrdersStack'
import ProfileStack from './stackNavigators/ProfileStack'
import ContactStack from './stackNavigators/ContactStack'
import AboutUsStack from './stackNavigators/AboutUsStack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomActivityIndicator from '../components/CustomActivityIndicator'
import { drawerAboutUsOptions, drawerContactOptions, drawerHomeOptions, drawerOrdersOptions, drawerProfileOptions, drawerNavigatorOptions } from './options/drawerOptions'

const RootNavigator = () => {
  const Drawer = createDrawerNavigator()

  const [userId, loading] = useLogin()
  const { getUserData } = useUserData()

  useEffect(() => {
    if (userId) {
      getUserData(userId)
    }
  }, [userId])

  if (loading) {
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
