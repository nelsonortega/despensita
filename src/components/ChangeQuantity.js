import CustomText from './CustomText'
import Colors from '../constants/Colors'
import { Button  } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

const ChangeQuantity = props => {
  return (
    <View style={styles.modalBackground}>
      <View style={styles.modal}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.circleButton} onPress={props.lessQuantity}>
            <CustomText style={styles.minusIcon}>-</CustomText>
          </TouchableOpacity>
          <CustomText bold style={styles.quantityText}>{props.quantity}</CustomText>
          <TouchableOpacity style={styles.circleButton} onPress={props.moreQuantity}>
            <Ionicons size={30} color='white' name='md-add'/>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button color={Colors.primary} onPress={props.addItemToCart}>
            <CustomText bold>Agregar</CustomText>
          </Button>
          <Button color={Colors.primary} onPress={props.closeModal}>
            <CustomText bold>Cancelar</CustomText>
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modal: {
    padding: 20, 
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white', 
    justifyContent: 'center'
  },
  quantityContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  circleButton: {
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: Colors.primary
  },
  minusIcon: {
    fontSize: 50,
    color: 'white',
    marginBottom: 10
  },
  quantityText: {
    fontSize: 20, 
    marginHorizontal: 20
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

export default ChangeQuantity