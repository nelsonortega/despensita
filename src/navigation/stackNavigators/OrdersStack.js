import { useSelector } from 'react-redux'
import OrdersScreen from '../../screens/OrdersScreen'
import { headerIcon, screenOptions } from '../options/options'
import OrderDetailScreen from '../../screens/OrderDetailScreen'
import AuthenticationScreen from '../../screens/AuthenticationScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const OrdersStack = () => {
  const OrdersStack = createNativeStackNavigator()
  const isUserLoggedIn = useSelector(state => state.auth.userId)

  return (
    <OrdersStack.Navigator screenOptions={screenOptions}>
      {isUserLoggedIn &&
        <>
          <OrdersStack.Screen name='OrdersScreen' component={OrdersScreen} options={headerIcon} />
          <OrdersStack.Screen name='OrderDetail' component={OrderDetailScreen} />
        </>}
      {!isUserLoggedIn &&
        <OrdersStack.Screen name='Authentication' component={AuthenticationScreen} options={headerIcon} />}
    </OrdersStack.Navigator>
  )
}

export default OrdersStack
