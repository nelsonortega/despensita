import { useState } from 'react'
import CustomText from './CustomText'
import Colors from '../constants/Colors'
import CartItem from '../models/cartItem'
import ChangeQuantity from './ChangeQuantity'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StyleSheet, View, Modal, Alert } from 'react-native'
import * as ProductActions from '../store/actions/ProductActions'
import { Button, Card, Title, Paragraph } from 'react-native-paper'

const Product = props => {
  const dispatch = useDispatch()

  const isUserAdmin = useSelector(state => state.auth.isUserAdmin)

  const [quantity, setQuantity] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)

  const addItemToCart = () => {
    const productToAdd = new CartItem(
      props.productItem.item.id,
      props.productItem.item.title,
      quantity,
      props.productItem.item.price,
      props.productItem.item.img
    )

    dispatch(ProductActions.addItemToCart(productToAdd))
    setModalVisible(false)
  }

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const moreQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1)
    }
  }

  const lessQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const deleteProduct = (id, image) => {
    Alert.alert(
      'Atención', '¿Desea eliminar este producto?', [
        { text: 'Sí', onPress: () => dispatch(ProductActions.deleteProduct(id, image)) },
        { text: 'No' }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: props.productItem.item.img }} />
        <Card.Content style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Title>
              <CustomText bold>{props.productItem.item.title}</CustomText>
            </Title>
            <Paragraph>
              <CustomText numberOfLines={2} style={styles.description}>{props.productItem.item.description}</CustomText>
            </Paragraph>
            <Paragraph>
              {props.productItem.item.price === '0'
                ? <CustomText bold style={styles.free}>Gratis</CustomText>
                : <CustomText bold>₡{props.productItem.item.price}</CustomText>}
            </Paragraph>
          </View>

          <View style={styles.actionButtons}>
            {isUserAdmin &&
              <Button style={styles.deleteButton} mode='contained' onPress={() => deleteProduct(props.productItem.item.id, props.productItem.item.img)} color='red' dark uppercase={false}>
                <Icon name='trash-o' size={28} />
              </Button>}
            <Button mode='contained' onPress={openModal} color={Colors.primary} dark uppercase={false}>
              <Ionicons size={30} color='white' name='md-add' style={styles.icon} />
            </Button>
          </View>
        </Card.Content>
      </Card>

      <Modal visible={modalVisible} animationType='fade' transparent>
        <ChangeQuantity
          handleLessQuantity={lessQuantity}
          handleMoreQuantity={moreQuantity}
          handleCloseModal={closeModal}
          quantity={quantity}
          handleAddItemToCart={addItemToCart}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    marginHorizontal: 20
  },
  actionButtons: {
    flexDirection: 'row'
  },
  deleteButton: {
    marginRight: 10
  },
  description: {
    color: 'grey'
  },
  free: {
    color: 'green'
  }
})

export default Product
