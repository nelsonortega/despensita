import Colors from '../constants/Colors'
import { useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import CustomText from '../components/CustomText'
import HeaderIcon from '../components/HeaderIcon'
import { useState, useEffect, Fragment } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { logoutUser } from '../firebase/controllers/FirebaseFunctions'

const ProfileScreen = props => {
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

  useEffect(() => {
    const focus = props.navigation.addListener('focus', getUserData)

    return focus
  }, [getUserData])

  const logout = async () => {
    const response = await logoutUser()

    if (response) {
      Alert.alert('Error', 'Hubo un error', [{text: 'Ok'}])
    }
  }

  const logoutAlert = () => {
    Alert.alert(
      'Atención',
      'Desea cerrar su sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sí', onPress: logout}
      ]
    )
  }

  const updateUserInformation = () => {
    props.navigation.navigate('UpdateUser')
  }

  return (
    <Fragment>
      <View style={styles.header}>
        <Icon name='user-o' size={90} color={'black'} />
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
            <Button style={styles.updateUserButton} mode='contained' onPress={updateUserInformation} color={Colors.primary} dark uppercase={false}>
              <CustomText>Actualizar</CustomText>
            </Button>
          </View>
        </View>
        <Button style={styles.buttonContainer} mode='contained' onPress={logoutAlert} color={Colors.primary} dark uppercase={false}>
          <CustomText>Cerrar Sesión</CustomText>
        </Button>
      </View>
    </Fragment>
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