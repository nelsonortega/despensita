import Product from '../components/Product'
import { useState, useEffect } from 'react'
import CustomText from '../components/CustomText'
import HomeHeader from '../components/HomeHeader'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, FlatList } from 'react-native'
import { setProducts } from '../store/slices/productSlide'
import { getProducts } from '../firebase/functions/FirebaseFunctions'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const products = useSelector(state => state.products.filteredProducts)

  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const loadProducts = async () => {
    setError(null)
    const productsResponse = await getProducts()

    if (!productsResponse.success) {
      setError('Error al cargar los productos')
    }

    if (productsResponse.success) {
      dispatch(setProducts(productsResponse.products))
    }
  }

  const loadProductsOnRefresh = async () => {
    setRefreshing(true)
    await loadProducts()
    setRefreshing(false)
  }

  useEffect(async () => {
    await loadProducts()
    setLoading(false)
  }, [])

  const createProduct = () => {
    navigation.navigate('CreateProduct')
  }

  const renderGridItem = productItem => {
    return <Product productItem={productItem} />
  }

  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <HomeHeader handleCreateProduct={createProduct} />
        }
        onRefresh={loadProductsOnRefresh}
        refreshing={refreshing}
        keyExtractor={item => item.id}
        data={products}
        renderItem={renderGridItem}
        style={styles.screen}
      />

      {loading &&
        <View style={styles.center}>
          <CustomActivityIndicator small />
        </View>}

      {products.length === 0 && !error && !loading &&
        <View style={styles.center}>
          <CustomText bold style={styles.text}>No hay productos registrados</CustomText>
        </View>}

      {error &&
        <View style={styles.center}>
          <CustomText bold>{error}</CustomText>
        </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    marginTop: '40%',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    marginTop: 50,
    marginBottom: 10
  },
  screen: {
    backgroundColor: 'white'
  }
})

export default HomeScreen
