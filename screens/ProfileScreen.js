import React from 'react'
import Colors from '../constants/Colors'
import CustomText from '../components/CustomText'
import HeaderIcon from '../components/HeaderIcon'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as AuthActions from '../store/actions/AuthActions'

import { Button } from 'react-native-paper'
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
    <React.Fragment>
      <View style={styles.header}>
        <Icon name="user-o" size={90} color={'black'} />
        <CustomText bold style={styles.userTitle}>Mi información predeterminada</CustomText>
      </View>
      <View style={styles.screen}>
        <View style={styles.userContainer}>
          <CustomText bold style={styles.userText}>Nombre</CustomText>
          <CustomText style={styles.userTextInfo}>{name.length === 0 ? 'No hay información' : name}</CustomText>
          <CustomText bold style={styles.userText}>Teléfono</CustomText>
          <CustomText style={styles.userTextInfo}>{phone.length === 0 ? 'No hay información' : phone}</CustomText>
          <CustomText bold style={styles.userText}>Dirección</CustomText>
          <CustomText style={styles.userTextInfo}>{direction.length === 0 ? 'No hay información' : direction}</CustomText>
          <View style={styles.updateUserButtonContainer}>
            <Button style={styles.updateUserButton} mode="contained" onPress={updateUserInformation} color={Colors.primary} dark uppercase={false}>
              <CustomText>Actualizar</CustomText>
            </Button>
          </View>
        </View>
        <Button style={styles.buttonContainer} mode="contained" onPress={logout} color={Colors.primary} dark uppercase={false}>
          <CustomText>Cerrar Sesión</CustomText>
        </Button>
      </View>
    </React.Fragment>
  )
}

ProfileScreen.navigationOptions = navData => {
  return {
    headerLeft: () => <HeaderIcon navData={navData} iconName={'md-menu'}/>
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: 'lightgrey'
  },
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  userContainer: {
    marginTop: '5%',
    borderColor: 'grey',
    marginHorizontal: '5%'
  },
  userTitle: {
    fontSize: 18,
    marginVertical: 20
  },
  userText: {
    fontSize: 18,
    marginBottom: 5
  },
  userTextInfo: {
    fontSize: 18,
    marginBottom: 15
  },
  buttonContainer: {
    marginBottom: '5%',
    marginHorizontal: '5%'
  },
  updateUserButtonContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  updateUserButton: {
    width: '50%'
  }
}) 

export default ProfileScreen