import { useState } from 'react'
import Colors from '../constants/Colors'
import { Button } from 'react-native-paper'
import useUserData from '../hooks/useUserData'
import CustomText from '../components/CustomText'
import CustomInput from '../components/CustomInput'
import { Picker } from '@react-native-picker/picker'
import { View, StyleSheet, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as UserActions from '../store/actions/UserActions'
import * as OrderActions from '../store/actions/OrderActions'
import * as ProductActions from '../store/actions/ProductActions'
import { createOrder } from '../firebase/functions/FirebaseFunctions'

const UserInformationScreen = props => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const cart = useSelector(state => state.products.cart)

  const [, setUserData] = useUserData()
  const [notes, setNotes] = useState('')
  const [express, setExpress] = useState(0)
  const [name, setName] = useState(user.userInformation.name)
  const [phone, setPhone] = useState(user.userInformation.phone)
  const [direction, setDirection] = useState(user.userInformation.direction)

  const confirmOrder = async () => {
    if (validateInputs()) {
      const newOrder = {
        products: cart.map(item => ({
          id: item.id,
          img: item.img,
          price: item.price,
          quantity: item.quantity,
          title: item.title
        })),
        clientData: { name, phone, direction, express, notes, userId: user.userId },
        state: 1
      }

      const response = await createOrder(newOrder)

      dispatch(OrderActions.createOrder({
        ...newOrder,
        id: response.orderId
      }))

      Alert.alert(
        'Éxito', 'Su orden ha sido creada', [
          { text: 'Ok', onPress: checkUserInformation }
        ]
      )
    }
  }

  const validateInputs = () => {
    if (name.trim().length < 10) {
      Alert.alert('Campos requeridos', 'El nombre ingresado es muy corto', [{ text: 'Ok' }])
      return false
    } else if (phone.trim().length !== 8) {
      Alert.alert('Campos requeridos', 'Teléfono inválido', [{ text: 'Ok' }])
      return false
    } else if (express === 0) {
      Alert.alert('Campos requeridos', 'Por favor seleccione si desea servicio express', [{ text: 'Ok' }])
      return false
    } else if (direction.trim().length < 20 && express === 1) {
      Alert.alert('Campos requeridos', 'La dirección ingresada es muy corta', [{ text: 'Ok' }])
      return false
    } else {
      return true
    }
  }

  const saveInformationAndfinishOrder = async () => {
    await setUserData(name, phone, direction)
    dispatch(UserActions.setUserInformation(name, phone, direction))
    finishOrder()
  }

  const checkUserInformation = () => {
    if (isUserInformationEmpty()) {
      Alert.alert(
        'Alerta', 'Desea guardar esta información para futuros pedidos?', [
          { text: 'No', style: 'cancel', onPress: finishOrder },
          { text: 'Si', onPress: saveInformationAndfinishOrder }
        ]
      )
    } else {
      finishOrder()
    }
  }

  const isUserInformationEmpty = () => {
    return (
      user.userInformation.name === '' &&
      user.userInformation.phone === '' &&
      user.userInformation.direction === ''
    )
  }

  const finishOrder = () => {
    dispatch(ProductActions.resetCart())
    props.navigation.popToTop()
  }

  return (
    <View style={styles.screen}>
      <View style={styles.formContainer}>
        <CustomInput
          placeholder='Nombre'
          placeholderTextColor='grey'
          value={name}
          onChangeText={text => setName(text)}
        />
        <CustomInput
          placeholder='Teléfono'
          placeholderTextColor='grey'
          value={phone}
          keyboardType='numeric'
          onChangeText={text => setPhone(text.replace(/[^0-9]/g, ''))}
        />
        <CustomInput
          placeholder='Notas'
          placeholderTextColor='grey'
          value={notes}
          onChangeText={text => setNotes(text)}
        />
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={express}
            onValueChange={itemValue => setExpress(itemValue)}
          >
            <Picker.Item label='Desea Express?' value={0} />
            <Picker.Item label='Sí' value={1} />
            <Picker.Item label='No' value={2} />
          </Picker>
        </View>
        {express === 1 &&
          <CustomInput
            placeholder='Dirección'
            placeholderTextColor='grey'
            value={direction}
            onChangeText={text => setDirection(text)}
          />}
      </View>
      <View style={styles.loginContainer}>
        <Button style={styles.loginButton} mode='contained' onPress={confirmOrder} color={Colors.primary} dark uppercase={false}>
          <CustomText>Finalizar pedido</CustomText>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  loginContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
  },
  loginButton: {
    width: '90%',
    height: 40,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.primary
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 20
  },
  pickerContainer: {
    height: 60,
    paddingLeft: 10,
    borderRadius: 7,
    width: '90%',
    backgroundColor: Colors.secondary,
    marginBottom: 20
  },
  picker: {
    height: 60,
    color: 'grey'
  }
})

export default UserInformationScreen
