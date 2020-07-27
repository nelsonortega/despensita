import React from 'react'
import Colors from '../constants/Colors'
import CustomText from '../components/CustomText'
import HeaderIcon from '../components/HeaderIcon'
import * as AuthActions from '../store/actions/AuthActions'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from 'react-native'

const ProfileScreen = props => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [direction, setDirection] = useState('')

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

  const tryLogin = async () => {
    getUserData()
    const userData = await AsyncStorage.getItem('userData')
    if (!userData) {
      props.navigation.navigate('Auth')
      return
    }
    const transformedData = JSON.parse(userData)
    const { token, userId, expiryDate } = transformedData
    const expirationDate = new Date(expiryDate)

    if (expirationDate <= new Date() || !token || !userId) {
      props.navigation.navigate('Auth')
      return
    }
  }

  useEffect(() => {
    tryLogin()
  }, [])

  useEffect(() => {
    const willFocus = props.navigation.addListener('willFocus', tryLogin)

    return () => {
      willFocus.remove()
    }
  }, [tryLogin])

  const logout = () => {
    Alert.alert(
      'Atención',
      'Desea cerrar su sesión?',
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sí", onPress: () => {
          dispatch(AuthActions.logout())
          props.navigation.navigate('Auth')
        } }
      ]
    )
  }

  const updateUserInformation = () => {
    props.navigation.navigate('UpdateUser')
  }

  return (
    <View style={styles.screen}>
      <View style={styles.userContainer}>
        <CustomText bold style={styles.userTitle}>Mi información predeterminada</CustomText>
        <CustomText bold style={styles.userText}>Nombre: {name}</CustomText>
        <CustomText bold style={styles.userText}>Teléfono: {phone}</CustomText>
        <CustomText bold style={styles.userText}>Dirección: {direction}</CustomText>
        <TouchableOpacity style={styles.updateButton} onPress={updateUserInformation}>
          <CustomText style={styles.updateButtonText}>Actualizar</CustomText>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={logout}>
        <View style={styles.button}>
          <CustomText style={styles.buttonText}>Cerrar Sesión</CustomText>
        </View>
      </TouchableOpacity>
    </View>
  )
}

ProfileScreen.navigationOptions = navData => {
  return {
    headerLeft: () => <HeaderIcon navData={navData} iconName={'md-menu'}/>
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  userContainer: {
    marginTop: '10%',
    borderColor: 'grey',
    marginHorizontal: '5%'
  },
  userTitle: {
    fontSize: 18,
    marginBottom: 20
  },
  userText: {
    marginBottom: 5
  },
  buttonContainer: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: '90%',
    height: '60%',
    borderRadius: 7,
    justifyContent: 'center',
    backgroundColor: Colors.primary
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  updateButton: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 7,
    paddingVertical: 10
  },
  updateButtonText: {
    color: 'white'
  }
}) 

export default ProfileScreen