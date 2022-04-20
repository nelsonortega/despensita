import CustomText from './CustomText'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const OrderItem = props => {
  const orderStates = useSelector(state => state.data.states)

  const [total, setTotal] = useState(0)
  const [orderState, setOrderState] = useState()

  useEffect(() => {
    let totalPrice = 0
    props.order.products.forEach(product => {
      totalPrice = totalPrice + (parseInt(product.price) * product.quantity)
    })
    setTotal(totalPrice)

    const stateObject = orderStates.find(state => state.id === props.order.state.toString())
    setOrderState(stateObject.name)
  }, [props.order])

  const openDetail = () => {
    props.navigation.navigate('OrderDetail', {
      order: props.order
    })
  }

  return (
    <TouchableOpacity style={styles.orderContainer} onPress={openDetail}>
      <View style={styles.container}>
        <Image
          style={styles.productImage}
          source={{ uri: props.order.products[0].img }}
        />
        <View>
          <CustomText bold>
            {props.order.clientData.name.length > 15
              ? props.order.clientData.name.substr(0, 15 - 1) + '...'
              : props.order.clientData.name}
          </CustomText>
          <CustomText bold>₡{total}</CustomText>
          {props.order.clientData.express === 1 &&
            <CustomText bold>Express</CustomText>}
        </View>
      </View>
      <View style={styles.container}>
        <CustomText bold>{orderState}</CustomText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  orderContainer: {
    height: 90,
    width: '90%',
    elevation: 7,
    display: 'flex',
    borderRadius: 10,
    marginLeft: '5%',
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  productImage: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 7
  }
})

export default OrderItem
