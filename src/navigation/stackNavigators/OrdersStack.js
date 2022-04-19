import { useSelector } from 'react-redux'
import { screenOptions } from '../options/options'
import HeaderIcon from '../../components/HeaderIcon'
import OrdersScreen from '../../screens/OrdersScreen'
import OrderDetailScreen from '../../screens/OrderDetailScreen'
import AuthenticationScreen from '../../screens/AuthenticationScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const OrdersStack = () => {
  const OrdersStack = createNativeStackNavigator()
  const isUserLoggedIn = useSelector(state => state.auth.userId)

  return (
    <OrdersStack.Navigator screenOptions={screenOptions}>
      {isUserLoggedIn ?
        <>
          <OrdersStack.Screen name='OrdersScreen' component={OrdersScreen} options={{
            headerLeft: () => <HeaderIcon iconName={'md-menu'} />
          }} />
          <OrdersStack.Screen name='OrderDetail' component={OrderDetailScreen} />
        </>
        :
        <OrdersStack.Screen name='Authentication' component={AuthenticationScreen} options={{
          headerLeft: () => <HeaderIcon iconName={'md-menu'} />
        }} />
      }      
    </OrdersStack.Navigator>
  )
}

export default OrdersStack