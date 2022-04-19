import Colors from '../constants/Colors'
import Product from '../components/Product'
import CustomText from '../components/CustomText'
import HomeHeader from '../components/HomeHeader'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import * as ProductActions from '../store/actions/ProductActions'
import { View, StyleSheet, Button, FlatList } from 'react-native'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

const HomeScreen = props => {
  const dispatch = useDispatch()

  const products = useSelector(state => state.products.filteredProducts)

  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    setRefreshing(true)
    try {
      dispatch(ProductActions.fetchProducts())
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
    setRefreshing(false)
  }, [dispatch, setError, setRefreshing])

  const loadProductsError = useCallback(async () => {
    setError(null)
    setLoading(true)
    try {
      dispatch(ProductActions.fetchProducts())
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }, [dispatch, setError, setRefreshing])

  useEffect(async () => {
    loadProducts()
  }, [])

  const createProduct = () => {
    props.navigation.navigate('CreateProduct')
  }

  if (loading)
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
        ListHeaderComponent={<HomeHeader createProduct={createProduct} />}
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