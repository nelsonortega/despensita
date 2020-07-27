import React from 'react'
import Colors from '../constants/Colors'
import CustomText from '../components/CustomText'
import ProductItem from '../components/ProductItem'
import * as OrderActions from '../store/actions/OrderActions'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, StyleSheet, Picker, ScrollView } from 'react-native'

const OrderDetailScreen = props => {
  const dispatch = useDispatch()
  
  const { order } = props.navigation.state.params
  const orderStates = useSelector(state => state.data.states)
  const isUserAdmin = useSelector(state => state.auth.isUserAdmin)

  const [totalPrice, setTotalPrice] = useState(0)
  const [orderState, setOrderState] = useState(order.state)

  useEffect(() => {
    let total = 0
    order.products.map(product => {
      total = total + (parseInt(product.price) * product.quantity)
    })
    setTotalPrice(total)
  }, [])

  const pickerList = orderStates.map(state =>
    <Picker.Item label={state.name} value={state.id} key={state.id}/>
  )

  const productsList = order.products.map(product => 
    <ProductItem product={product}  key={product.id}/>
  )

  const handleStateChange = itemValue => {
    setOrderState(itemValue)
    dispatch(OrderActions.updateOrderState(order, itemValue))
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
          <CustomText bold style={styles.total}>{order.clientData.express === 1 ? "Sí" : "No"}</CustomText>
        </View>
      </View>
      <View>
        <CustomText bold style={styles.title}>Cliente</CustomText>
        <CustomText style={styles.clientText}>Nombre: {order.clientData.name}</CustomText>
        <CustomText style={styles.clientText}>Teléfono: {order.clientData.phone}</CustomText>
        <CustomText style={styles.clientText}>Notas: {order.clientData.notes}</CustomText>
        {order.clientData.express === 1 ? 
          <CustomText style={styles.clientText}>Dirección: {order.clientData.direction}</CustomText> : <></>
        }
      </View>
      <View>
        <CustomText bold style={styles.title}>Productos</CustomText>
        {productsList}
      </View>
      {isUserAdmin ? 
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
        </> : <></>
      }
      
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
    justifyContent: "space-between"
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
    backgroundColor: Colors.secondary
  },
  picker: {
    height: 60,
    color: 'grey'
  }
}) 

export default OrderDetailScreen