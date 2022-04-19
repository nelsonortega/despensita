import { useState } from 'react'
import CustomText from './CustomText'
import { Ionicons } from '@expo/vector-icons'
import ChangeQuantity from './ChangeQuantity'
import { StyleSheet, View, Image, TouchableOpacity, Modal } from 'react-native'

const CartItem = props => {
  const [quantity, setQuantity] = useState(props.cartItem.item.quantity)
  const [modalVisible, setModalVisible] = useState(false)

  const editCartItem = () => {
    if (quantity === 0) {
      props.delete(props.cartItem.item.id)
    } else {
      props.edit(props.cartItem.item.id, quantity)
    }
    setModalVisible(false)
  }

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setQuantity(props.cartItem.item.quantity)
  }

  const moreQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1)
    }
  }

  const lessQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.productContainer}>
          <Image
            style={styles.productImage}
            source={{ uri: props.cartItem.item.img }}
          />
          <View style={styles.detailsContainer}>
            <CustomText bold style={styles.title}>{props.cartItem.item.title}</CustomText>
            <CustomText>Cantidad: {props.cartItem.item.quantity}</CustomText>
            <CustomText bold>₡{props.cartItem.item.price}</CustomText>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton} onPress={openModal}>
            <Ionicons size={20} color='white' name='md-create' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => props.delete(props.cartItem.item.id)}>
            <Ionicons size={20} color='white' name='md-trash' />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lineSeparator} />
      <Modal visible={modalVisible} animationType='fade' transparent>
        <ChangeQuantity
          lessQuantity={lessQuantity}
          moreQuantity={moreQuantity}
          closeModal={closeModal}
          quantity={quantity}
          addItemToCart={editCartItem}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    padding: 10,
    borderRadius: 7,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  productContainer: {
    flexDirection: 'row'
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 7
  },
  detailsContainer: {
    justifyContent: 'center'
  },
  title: {
    fontSize: 16
  },
  actionButtons: {
    flexDirection: 'row'
  },
  deleteButton: {
    width: 40,
    height: 40,
    marginLeft: 10,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center'
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    justifyContent: 'center'
  },
  lineSeparator: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.2,
    opacity: 0.5
  }
})

export default CartItem
