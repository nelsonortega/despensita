import Colors from '../constants/Colors'
import { useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import { useState, useEffect } from 'react'
import CustomText from '../components/CustomText'
import CustomInput from '../components/CustomInput'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'

const UpdateUserScreen = props => {
  const auth = useSelector(state => state.auth)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [direction, setDirection] = useState('')

  const confirmOrder = async () => {
    if (validateInputs()) {
      await AsyncStorage.setItem('userProfileData' + auth.userId, JSON.stringify({
        name: name,
        phone: phone,
        direction: direction
      }))

      Alert.alert('Éxito', 'Campos actualizados correctamente', [{text: 'Ok'}])
    }
  }

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('userProfileData' + auth.userId)

    if (userData !== null) {
      const transformedData = JSON.parse(userData)
      const { name, phone, direction } = transformedData

      setName(name)
      setPhone(phone)
      setDirection(direction)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  const validateInputs = () => {
    if (name.trim().length < 10) {
      Alert.alert('Campos requeridos', 'El nombre ingresado es muy corto', [{text: 'Ok'}])
      return false
    } else if (phone.trim().length !== 8) {
      Alert.alert('Campos requeridos', 'Teléfono inválido', [{text: 'Ok'}])
      return false
    } else if (direction.trim().length < 20) {
      Alert.alert('Campos requeridos', 'La dirección ingresada es muy corta', [{text: 'Ok'}])
      return false
    } else {
      return true
    }
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
          placeholder='Dirección' 
          placeholderTextColor='grey' 
          value={direction} 
          onChangeText={text => setDirection(text)}
        />
      </View> 
      <View style={styles.loginContainer}> 
        <TouchableOpacity style={styles.loginContainer} onPress={confirmOrder}>
          <Button style={styles.loginButton} mode='contained' onPress={confirmOrder} color={Colors.primary} dark uppercase={false}>
            <CustomText>Actualizar Información</CustomText>
          </Button>
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
  }
}) 

export default UpdateUserScreen