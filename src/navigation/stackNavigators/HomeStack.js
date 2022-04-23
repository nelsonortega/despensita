import HomeScreen from '../../screens/HomeScreen'
import CartScreen from '../../screens/CartScreen'
import UserInformationStack from './UserInformationStack'
import CreateProductScreen from '../../screens/CreateProductScreen'
import { homeScreenHeaderIcons, screenOptions } from '../options/options'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const HomeStack = () => {
  const HomeStack = createNativeStackNavigator()

  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen name='HomeScreen' component={HomeScreen} options={homeScreenHeaderIcons} />
      <HomeStack.Screen name='Cart' component={CartScreen} />
      <HomeStack.Screen name='CreateProduct' component={CreateProductScreen} />
      <HomeStack.Screen name='UserInformation' component={UserInformationStack} />
    </HomeStack.Navigator>
  )
}

export default HomeStack
