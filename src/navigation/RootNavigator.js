import useLogin from '../hooks/useLogin'
import SideMenu from '../components/SideMenu'
import HomeStack from './stackNavigators/HomeStack'
import AboutUsScreen from '../screens/AboutUsScreen'
import ContactScreen from '../screens/ContactScreen'
import OrdersStack from './stackNavigators/OrdersStack'
import ProfileStack from './stackNavigators/ProfileStack'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomActivityIndicator from '../components/CustomActivityIndicator'
import { drawerAboutUsOptions, drawerContactOptions, drawerHomeOptions, drawerOrdersOptions, drawerProfileOptions, drawerScreenOptions } from './options/options'

const RootNavigator = () => {
  const Drawer = createDrawerNavigator()
  const [loading] = useLogin()

  if (loading) {
    return <CustomActivityIndicator />
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={drawerScreenOptions} drawerContent={props => <SideMenu {...props} />}>
        <Drawer.Screen name='Home' component={HomeStack} options={drawerHomeOptions} />
        <Drawer.Screen name='Orders' component={OrdersStack} options={drawerOrdersOptions} />
        <Drawer.Screen name='Contact' component={ContactScreen} options={drawerContactOptions} />
        <Drawer.Screen name='AboutUs' component={AboutUsScreen} options={drawerAboutUsOptions} />
        <Drawer.Screen name='Profile' component={ProfileStack} options={drawerProfileOptions} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator
