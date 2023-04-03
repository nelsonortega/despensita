import UserInformationStack from './UserInformationStack'
import { homeScreenHeaderIcons, screenOptions } from '../options/options'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CreateProductScreen, CartScreen, HomeScreen } from '../../screens'

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
