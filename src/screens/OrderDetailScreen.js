import { useState } from 'react'
import { COLORS } from '../constants/Colors'
import CustomText from '../components/CustomText'
import ProductItem from '../components/ProductItem'
import { useRoute } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import { useSelector, useDispatch } from 'react-redux'
import { ORDER_STATES } from '../constants/OrderStates'
import { View, StyleSheet, ScrollView } from 'react-native'
import * as OrderActions from '../store/actions/OrderActions'
import { updateOrder } from '../firebase/functions/FirebaseFunctions'

const OrderDetailScreen = () => {
  const route = useRoute()
  const dispatch = useDispatch()

  const { order, totalPrice } = route.params
  const isUserAdmin = useSelector(state => state.user.isUserAdmin)

  const [orderState, setOrderState] = useState(order.state)

  const pickerList = ORDER_STATES.map(state =>
    <Picker.Item label={state.name} value={state.id} key={state.id} />
  )

  const productsList = order.products.map(product =>
    <ProductItem product={product} key={product.id} />
  )

  const handleStateChange = itemValue => {
    setOrderState(itemValue)

    const updatedOrder = {
      ...order,
      state: itemValue
    }

    dispatch(OrderActions.updateOrderState(updatedOrder))
    updateOrder(updatedOrder)
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <CustomText bold style={styles.title}>Detalle de la orden</CustomText>
        <View style={styles.totalContainer}>
          <CustomText bold style={styles.total}>Total</CustomText>
          <CustomText bold style={styles.total}>₡{totalPrice}</CustomText>
        </View>
        <View style={styles.totalContainer}>
          <CustomText bold style={styles.total}>Express</CustomText>
          <CustomText bold style={styles.total}>{order.clientData.express === 1 ? 'Sí' : 'No'}</CustomText>
        </View>
      </View>
      <View>
        <CustomText bold style={styles.title}>Cliente</CustomText>
        <CustomText style={styles.clientText}>Nombre: {order.clientData.name}</CustomText>
        <CustomText style={styles.clientText}>Teléfono: {order.clientData.phone}</CustomText>
        <CustomText style={styles.clientText}>Notas: {order.clientData.notes}</CustomText>
        {order.clientData.express === 1 &&
          <CustomText style={styles.clientText}>Dirección: {order.clientData.direction}</CustomText>}
      </View>
      <View>
        <CustomText bold style={styles.title}>Productos</CustomText>
        {productsList}
      </View>
      {isUserAdmin &&
        <>
          <CustomText bold style={styles.title}>Actualizar estado</CustomText>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={orderState}
              onValueChange={handleStateChange}
            >
              {pickerList}
            </Picker>
          </View>
        </>}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    paddingBottom: 10,
    backgroundColor: 'lightgrey'
  },
  title: {
    fontSize: 18,
    marginLeft: '5%',
    marginVertical: 15
  },
  totalContainer: {
    display: 'flex',
    marginVertical: 5,
    flexDirection: 'row',
    marginHorizontal: '5%',
    justifyContent: 'space-between'
  },
  clientText: {
    fontSize: 16,
    marginHorizontal: '5%'
  },
  total: {
    fontSize: 16
  },
  pickerContainer: {
    height: 60,
    width: '90%',
    paddingLeft: 10,
    borderRadius: 7,
    marginLeft: '5%',
    marginBottom: 20,
    backgroundColor: COLORS.secondary
  },
  picker: {
    height: 60,
    color: 'grey'
  }
})

export default OrderDetailScreen
