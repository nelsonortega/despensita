import { useState } from 'react'
import CustomText from './CustomText'
import { StyleSheet, View, Image } from 'react-native'
import { ORDER_STATES } from '../constants/OrderStates'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const OrderItem = props => {
  const navigation = useNavigation()

  const orderState = ORDER_STATES[props.order.state - 1].name

  const [totalPrice] = useState(() => {
    return props.order.products.reduce((acc, product) => {
      return acc + (parseInt(product.price) * product.quantity)
    }, 0)
  })

  const openDetail = () => {
    navigation.navigate('OrderDetail', {
      totalPrice,
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
          <CustomText bold>₡{totalPrice}</CustomText>
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
