import { useSelector } from 'react-redux'
import { screenHeaderIcon, screenOptions } from '../options/options'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthenticationScreen, OrderDetailScreen, OrdersScreen } from '../../screens'

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
