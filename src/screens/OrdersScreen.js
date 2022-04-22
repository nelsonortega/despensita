import { useState, useEffect } from 'react'
import OrderItem from '../components/OrderItem'
import CustomText from '../components/CustomText'
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet, FlatList } from 'react-native'
import * as OrderActions from '../store/actions/OrderActions'
import { getOrders } from '../firebase/functions/FirebaseFunctions'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

const OrdersScreen = props => {
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)
  const orders = useSelector(state => state.orders.orders)

  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const loadOrders = async () => {
    setError(null)
    const ordersResponse = await getOrders(auth.isUserAdmin, auth.userId)

    if (!ordersResponse.success) {
      setError('Error al cargar las órdenes')
    }

    if (ordersResponse.success) {
      dispatch(OrderActions.setOrders(ordersResponse.orders))
    }
  }

  const loadOrdersOnRefresh = async () => {
    setRefreshing(true)
    await loadOrders()
    setRefreshing(false)
  }

  useEffect(async () => {
    setLoading(true)
    await loadOrders()
    setLoading(false)
  }, [])

  const renderOrderItem = orderItem => {
    return <OrderItem order={orderItem.item} />
  }

  return (
    <View style={styles.screen}>
      <FlatList
        ListHeaderComponent={
          <CustomText bold style={styles.title}>Órdenes</CustomText>
        }
        onRefresh={loadOrdersOnRefresh}
        refreshing={refreshing}
        keyExtractor={item => item.id}
        data={orders}
        renderItem={renderOrderItem}
        style={styles.list}
      />
      {loading &&
        <View style={styles.center}>
          <CustomActivityIndicator small />
        </View>}
      {orders.length === 0 && !error && !loading &&
        <View style={styles.center}>
          <CustomText bold>No hay órdenes pendientes</CustomText>
        </View>}
      {error &&
        <View style={styles.center}>
          <CustomText bold>{error}</CustomText>
        </View>}
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
