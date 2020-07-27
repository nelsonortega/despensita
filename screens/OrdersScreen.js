import React from 'react'
import OrderItem from '../components/OrderItem'
import CustomText from '../components/CustomText'
import HeaderIcon from '../components/HeaderIcon'
import * as OrderActions from '../store/actions/OrderActions'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, AsyncStorage, FlatList } from 'react-native'

const OrdersScreen = props => {
  const dispatch = useDispatch()

  const auth = useSelector(state => state.auth)
  const orders = auth.isUserAdmin ? 
    useSelector(state => state.orders.orders.filter(order => order.state !== "4")) :
    useSelector(state => state.orders.orders.filter(order => order.state !== "4" && order.clientData.userId === auth.userId))

  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)

  const tryLogin = async () => {
    setLoginLoading(true)
    const userData = await AsyncStorage.getItem('userData')
    if (!userData) {
      setLoginLoading(false)
      props.navigation.navigate('Auth')
      return
    }
    const transformedData = JSON.parse(userData)
    const { token, userId, expiryDate } = transformedData
    const expirationDate = new Date(expiryDate)

    if (expirationDate <= new Date() || !token || !userId) {
      setLoginLoading(false)
      props.navigation.navigate('Auth')
      return
    }

    loadOrders()
    setLoginLoading(false)
  }

  const loadOrders = useCallback(async () => {
    setError(null)
    setRefreshing(true)
    try {
      await dispatch(OrderActions.fetchOrders())
    } catch (error) {
      setError(error.message)
    }
    setRefreshing(false)
  }, [dispatch, setError, setRefreshing])
  
  useEffect(() => {
    tryLogin()
    setLoading(true)
    loadOrders().then(() => {
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const willFocus = props.navigation.addListener('willFocus', tryLogin)

    return () => {
      willFocus.remove()
    }
  }, [tryLogin])

  if (loginLoading)
    return <CustomActivityIndicator />

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

OrdersScreen.navigationOptions = navData => {
  return {
    headerLeft: () => <HeaderIcon navData={navData} iconName={'md-menu'}/>
  }
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