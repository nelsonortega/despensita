import React from 'react'
import Colors from '../constants/Colors'
import Product from '../components/Product'
import CustomText from '../components/CustomText'
import HeaderIcon from '../components/HeaderIcon'
import HomeHeader from '../components/HomeHeader'
import * as AuthActions from '../store/actions/AuthActions'
import * as ProductActions from '../store/actions/ProductActions'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Button, AsyncStorage, FlatList } from 'react-native'

const HomeScreen = props => {
  const dispatch = useDispatch()

  const categories = useSelector(state => state.data.categories)
  const products = useSelector(state => state.products.filteredProducts)

  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [route, setRoute] = useState('Authentication')
  const [loginLoading, setLoginLoading] = useState(false)

  const loadProducts = useCallback(async () => {
    setError(null)
    setRefreshing(true)
    try {
      await dispatch(ProductActions.fetchProducts())
    } catch (error) {
      setError(error.message)
    }
    setRefreshing(false)
  }, [dispatch, setError, setRefreshing])

  const loadProductsError = useCallback(async () => {
    setError(null)
    setLoading(true)
    try {
      await dispatch(ProductActions.fetchProducts())
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }, [dispatch, setError, setRefreshing])

  const tryLogin = async () => {
    setLoginLoading(true)
    const userData = await AsyncStorage.getItem('userData')
    if (!userData) {
      setRoute('Authentication')
      setLoginLoading(false)
      return
    }
    const transformedData = JSON.parse(userData)
    const { token, userId, expiryDate, isUserAdmin } = transformedData
    const expirationDate = new Date(expiryDate)

    if (expirationDate <= new Date() || !token || !userId) {
      setRoute('Authentication')
      setLoginLoading(false)
      return
    }

    setRoute('CreateProduct')
    dispatch(AuthActions.autoAuthenticate(userId, token, isUserAdmin))
    setLoginLoading(false)
  }

  useEffect(() => {
    tryLogin()
    setLoading(true)
    loadProducts().then(() => {
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const willFocus = props.navigation.addListener('willFocus', tryLogin)

    return () => {
      willFocus.remove()
    }
  }, [tryLogin])

  const createProduct = () => {
    props.navigation.navigate(route, {
      'route': 'CreateProduct', 
      'hideIcon': true
    })
  }

  if (loginLoading || loading)
    return <CustomActivityIndicator />

  const renderGridItem = productItem => {
    return <Product productItem={productItem} />
  }

  if (error) {
    return (
      <View style={styles.center}>
        <CustomText bold style={styles.text}>Error al cargar los productos</CustomText>
        <Button title='Intentar de nuevo' color={Colors.primary} onPress={loadProductsError} />
      </View>
    )  
  }

  return (
    <View>
      <FlatList
        onRefresh={loadProducts}
        refreshing={refreshing}
        ListHeaderComponent={
          <HomeHeader 
            createProduct={createProduct}
          />
        }
        keyExtractor={item => item.id}
        data={products}
        renderItem={renderGridItem}
        style={styles.screen}
      />
      {products.length === 0 && !error ? 
        <View style={styles.center}> 
          <CustomText bold style={styles.text}>No hay productos registrados</CustomText> 
        </View> : 
        <View />
      }
    </View>
  )
}

HomeScreen.navigationOptions = navData => {
  return {
    headerLeft: () => <HeaderIcon navData={navData} iconName={'md-menu'}/>,
    headerRight: () => <HeaderIcon cart navData={navData} iconName={'md-cart'}/>
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    marginTop: '50%',
    alignItems: 'center'
  },
  text:{
    fontSize: 16,
    marginTop: 50,
    marginBottom: 10
  },
  screen: {
    backgroundColor: 'white'
  }
}) 

export default HomeScreen