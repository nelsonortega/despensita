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
import { deleteProductAndImage } from '../firebase/functions/FirebaseFunctions'

const Product = props => {
  const dispatch = useDispatch()
  const { id, title, price, img, description } = props.productItem.item

  const isUserAdmin = useSelector(state => state.user.isUserAdmin)

  const [quantity, setQuantity] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)

  const addItemToCart = () => {
    const productToAdd = new CartItem(id, title, quantity, price, img)

    dispatch(ProductActions.addItemToCart(productToAdd))
    handleCloseModal()
  }

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  const handleCloseModal = () => {
    setModalVisible(false)
    setQuantity(1)
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

  const handleDeleteProductAndImage = () => {
    dispatch(ProductActions.deleteProduct(id))
    deleteProductAndImage(id, img)
  }

  const handleDeleteProduct = () => {
    Alert.alert(
      'Atención', '¿Desea eliminar este producto?', [
        { text: 'Sí', onPress: handleDeleteProductAndImage },
        { text: 'No' }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: img }} />
        <Card.Content style={styles.cardContent}>
          <View>
            <Title>
              <CustomText bold>{title}</CustomText>
            </Title>
            <Paragraph>
              <CustomText numberOfLines={2} style={styles.description}>{description}</CustomText>
            </Paragraph>
            <Paragraph>
              {price === '0'
                ? <CustomText bold style={styles.free}>Gratis</CustomText>
                : <CustomText bold>₡{price}</CustomText>}
            </Paragraph>
          </View>

          <View style={styles.actionButtons}>
            {isUserAdmin &&
              <Button style={styles.deleteButton} mode='contained' onPress={handleDeleteProduct} color='red' dark uppercase={false}>
                <Icon name='trash-o' size={28} />
              </Button>}
            <Button mode='contained' onPress={handleOpenModal} color={Colors.primary} dark uppercase={false}>
              <Ionicons size={30} color='white' name='md-add' style={styles.icon} />
            </Button>
          </View>
        </Card.Content>
      </Card>

      <Modal visible={modalVisible} animationType='fade' transparent>
        <ChangeQuantity
          handleLessQuantity={lessQuantity}
          handleMoreQuantity={moreQuantity}
          handleCloseModal={handleCloseModal}
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
  cardContent: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
