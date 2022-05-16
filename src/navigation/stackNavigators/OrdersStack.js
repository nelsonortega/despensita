import { useSelector } from 'react-redux'
import OrdersScreen from '../../screens/OrdersScreen'
import OrderDetailScreen from '../../screens/OrderDetailScreen'
import { screenHeaderIcon, screenOptions } from '../options/options'
import AuthenticationScreen from '../../screens/AuthenticationScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const OrdersStack = () => {
  const OrdersStack = createNativeStackNavigator()
  const user = useSelector(state => state.user)

  return (
    <OrdersStack.Navigator screenOptions={screenOptions}>
      {user.userId !== '' &&
        <>
          <OrdersStack.Screen name='OrdersScreen' component={OrdersScreen} options={screenHeaderIcon} />
          <OrdersStack.Screen name='OrderDetail' component={OrderDetailScreen} />
        </>}
      {user.userId === '' &&
        <OrdersStack.Screen name='Authentication' component={AuthenticationScreen} options={screenHeaderIcon} />}
    </OrdersStack.Navigator>
  )
}

export default OrdersStack
