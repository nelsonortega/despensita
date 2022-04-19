import OrderItem from '../components/OrderItem'
import CustomText from '../components/CustomText'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import * as OrderActions from '../store/actions/OrderActions'

const OrdersScreen = props => {
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)
  const orders = auth.isUserAdmin ? 
    useSelector(state => state.orders.orders.filter(order => order.state !== '4')) :
    useSelector(state => state.orders.orders.filter(order => order.state !== '4' && order.clientData.userId === auth.userId))

  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const loadOrders = useCallback(async () => {
    setLoading(true)
    setError(null)
    setRefreshing(true)
    try {
      dispatch(OrderActions.fetchOrders())
    } catch (error) {
      setError(error.message)
    }
    setRefreshing(false)
    setLoading(false)
  }, [dispatch, setError, setRefreshing])
  
  useEffect(() => {
    loadOrders()
  }, [])

  const renderOrderItem = orderItem => {
    return <OrderItem order={orderItem.item} navigation={props.navigation} />
  }
  
  return (
    <View style={styles.screen}>
      <FlatList
        ListHeaderComponent={
          <CustomText bold style={styles.title}>Órdenes</CustomText>
        }
        onRefresh={loadOrders}
        refreshing={refreshing}
        keyExtractor={item => item.id}
        data={orders}
        renderItem={renderOrderItem}
        style={styles.list}
      />
      {orders.length === 0 && !error && !loading ? 
        <View style={styles.center}> 
          <CustomText bold>No hay órdenes pendientes</CustomText> 
        </View> : <></>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  center: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginLeft: '5%',
    marginVertical: 20
  },
  list: {
    width: '100%'
  }
}) 

export default OrdersScreen