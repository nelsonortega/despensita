import CustomText from '../components/CustomText'
import { View, StyleSheet, Image } from 'react-native'

const ProductItem = props => {
  return (
    <View style={styles.productContainer}>
      <View style={styles.container}>
        <Image
          style={styles.productImage}
          source={{ uri: props.product.img }}
        />
        <CustomText style={styles.text}>{props.product.title}</CustomText>
      </View>
      <View style={styles.container}>
        <CustomText style={styles.text}>Cantidad: </CustomText>
        <CustomText bold style={styles.text}>{props.product.quantity}</CustomText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  productContainer: {
    display: 'flex',
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: '5%',
    justifyContent: 'space-between'
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 7,
    marginRight: 10
  },
  text: {
    fontSize: 16
  }
})

export default ProductItem
