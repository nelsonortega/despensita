import Colors from '../constants/Colors'
import { useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import { useState, useEffect } from 'react'
import useUserData from '../hooks/useUserData'
import CustomText from '../components/CustomText'
import { View, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { logoutUser } from '../firebase/functions/FirebaseFunctions'
import CustomActivityIndicator from '../components/CustomActivityIndicator'

const ProfileScreen = props => {
  const auth = useSelector(state => state.auth)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [direction, setDirection] = useState('')
  const [getUserData,, loading] = useUserData(auth.userId)

  useEffect(async () => {
    const userData = await getUserData()

    if (userData) {
      setName(userData.name)
      setPhone(userData.phone)
      setDirection(userData.direction)
    }
  }, [])

  const logout = async () => {
    const response = await logoutUser()

    if (response) {
      Alert.alert('Error', 'Hubo un error', [{ text: 'Ok' }])
    }
  }

  const handleLogoutAlert = () => {
    Alert.alert(
      'Atención', 'Desea cerrar su sesión?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sí', onPress: logout }
      ]
    )
  }

  const handleUpdateUserInformation = () => {
    props.navigation.navigate('UpdateUser', {
      userData: { name, phone, direction }
    })
  }

  return (
    <>
      <View style={styles.header}>
        <Icon name='user-o' size={90} color='black' />
        <CustomText bold style={styles.userTitle}>Mi información predeterminada</CustomText>
      </View>
      <View style={styles.screen}>
        {!loading &&
          <View style={styles.userContainer}>
            <CustomText bold style={styles.userText}>Nombre</CustomText>
            <CustomText style={styles.userTextInfo}>{!name ? 'No hay información' : name}</CustomText>
            <CustomText bold style={styles.userText}>Teléfono</CustomText>
            <CustomText style={styles.userTextInfo}>{!phone ? 'No hay información' : phone}</CustomText>
            <CustomText bold style={styles.userText}>Dirección</CustomText>
            <CustomText style={styles.userTextInfo}>{!direction ? 'No hay información' : direction}</CustomText>
            <View style={styles.updateUserButtonContainer}>
              <Button style={styles.updateUserButton} mode='contained' onPress={handleUpdateUserInformation} color={Colors.primary} dark uppercase={false}>
                <CustomText>Actualizar</CustomText>
              </Button>
            </View>
          </View>}
        {loading &&
          <View style={styles.activityIndicator}>
            <CustomActivityIndicator />
          </View>}
        <Button style={styles.buttonContainer} mode='contained' onPress={handleLogoutAlert} color={Colors.primary} dark uppercase={false}>
          <CustomText>Cerrar Sesión</CustomText>
        </Button>
      </View>
    </>
  )
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
  },
  activityIndicator: {
    marginTop: '50%'
  }
})

export default ProfileScreen
