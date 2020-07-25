import React from 'react'
import Colors from '../constants/Colors'
import CustomText from '../components/CustomText'
import CustomInput from '../components/CustomInput'
import * as OrderActions from '../store/actions/OrderActions'
import * as ProductActions from '../store/actions/ProductActions'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native'

const UserInformationScreen = props => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.products.cart)
  const orderCreated = useSelector(state => state.orders.orderCreated)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [express, setExpress] = useState(0)
  const [direction, setDirection] = useState('')

  const confirmOrder = async () => {
    if (validateInputs()) {
      dispatch(OrderActions.createOrder(cart, name, phone, express, direction, notes))
    }
  }

  const validateInputs = () => {
    if (name.trim().length < 10) {
      Alert.alert('Campos requeridos', 'El nombre ingresado es muy corto', [{text: 'Ok'}])
      return false
    } else if (phone.trim().length !== 8) {
      Alert.alert('Campos requeridos', 'Teléfono inválido', [{text: 'Ok'}])
      return false
    } else if (express === 0) {
      Alert.alert('Campos requeridos', 'Por favor seleccione si desea servicio express', [{text: 'Ok'}])
      return false
    } else if (direction.trim().length < 20 && express === 1) {
      Alert.alert('Campos requeridos', 'La dirección ingresada es muy corta', [{text: 'Ok'}])
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    if (orderCreated) {
      Alert.alert(
        'Éxito', 'Su orden ha sido creada', [
          { text: "Volver a Inicio", onPress: finishOrder }
        ]
      )
    }
  }, [orderCreated])

  const finishOrder = () => {
    dispatch(OrderActions.finishOrder())
    dispatch(ProductActions.resetCart())
    props.navigation.popToTop()
  }

  return (
    <View style={styles.screen}>
      <View style={styles.formContainer}>
        <CustomInput 
          placeholder='Nombre' 
          placeholderTextColor="grey" 
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
          placeholderTextColor="grey" 
          value={notes} 
          onChangeText={text => setNotes(text)}
        />
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={express}
            onValueChange={itemValue => setExpress(itemValue)}
          >
            <Picker.Item label="Desea Express?" value={0} />
            <Picker.Item label="Sí" value={1} />
            <Picker.Item label="No" value={2} />
          </Picker>
        </View>
        {express === 1 ? 
          <CustomInput 
            placeholder='Dirección' 
            placeholderTextColor="grey" 
            value={direction} 
            onChangeText={text => setDirection(text)}
          /> : <View/>
        }
      </View> 
      <View style={styles.loginContainer}> 
        <TouchableOpacity style={styles.loginContainer} onPress={confirmOrder}>
          <View style={styles.loginButton}>
            <CustomText style={styles.buttonText}>Finalizar pedido</CustomText>
          </View>
        </TouchableOpacity>
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
    justifyContent: "flex-end",
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