import { COLORS } from '../constants/Colors'
import CartItem from '../components/CartItem'
import CustomText from '../components/CustomText'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { deleteItemFromCart, editItemFromCart } from '../store/slices/productSlide'

const CartScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const cart = useSelector(state => state.products.cart)
  const totalPrice = useSelector(state => state.products.totalPrice)

  const deleteCartItem = id => {
    dispatch(deleteItemFromCart(id))
  }

  const editCartItem = async (id, quantity) => {
    dispatch(editItemFromCart({ id, quantity }))
  }

  const renderCartItem = cartItem => {
    return <CartItem cartItem={cartItem.item} delete={deleteCartItem} edit={editCartItem} />
  }

  const continueOrder = () => {
    if (cart.length !== 0) {
      navigation.navigate('UserInformation')
    } else {
      Alert.alert('Atención', 'No hay productos en el carrito', [{ text: 'Ok' }])
    }
  }

  return (
    <View style={styles.screen}>
      <View style={{ width: '100%', height: '90%', alignItems: 'center' }}>
        <View style={{ height: '4%' }} />
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <CustomText bold style={styles.totalText}>Total</CustomText>
            <CustomText bold style={styles.totalText}>₡{totalPrice}</CustomText>
          </View>
        </View>
        {cart.length === 0 &&
          <View style={{ marginTop: '50%' }}>
            <CustomText bold style={styles.emptyCart}>No has añadido productos al carrito</CustomText>
          </View>}
        {cart.length !== 0 &&
          <View style={styles.ListContainer}>
            <FlatList
              keyExtractor={item => item.id}
              data={cart}
              renderItem={renderCartItem}
            />
          </View>}
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={continueOrder}>
        <View style={styles.button}>
          <CustomText style={styles.buttonText}>Continuar</CustomText>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  container: {
    width: '90%',
    height: '10%',
    elevation: 7,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'white'
  },
  ListContainer: {
    width: '90%',
    marginTop: '4%',
    height: '82%',
    elevation: 7,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  textContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  totalText: {
    fontSize: 20
  },
  emptyCart: {
    fontSize: 15,
    textAlign: 'center'
  },
  buttonContainer: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: '90%',
    height: '60%',
    borderRadius: 7,
    justifyContent: 'center',
    backgroundColor: COLORS.primary
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  }
})

export default CartScreen
