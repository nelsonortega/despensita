import Colors from '../constants/Colors'
import { useState, useEffect } from 'react'
import CustomText from '../components/CustomText'
import CustomInput from '../components/CustomInput'
import CustomActivityIndicator from '../components/CustomActivityIndicator'
import { loginUser, registerUser } from '../firebase/controllers/FirebaseFunctions'
import { StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'

const AuthenticationScreen = props => {
  const [error, setError] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginScreen, setLoginScreen] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState('')

  const switchLoginRegisterScreen = () => {
    setLoginScreen(!loginScreen)
  }

  useEffect(() => {
    if (error) {
      Alert.alert('Ocurrió un error', error, [{text: 'Ok', onPress: () => setError(null)}])
    }
  }, [error])

  const validateRegister = () => {
    if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres'
    } else if (password !== confirmPassword) {
      return 'Las contraseñas no coinciden'
    }

    return ''
  }

  const login = async () => {
    setLoading(true)

    const response = await loginUser(email, password)

    if (!response.success) {
      setError(response.errorMessage)
      setLoading(false)
    }
  }

  const register = async () => {
    const validationError = validateRegister()

    if (validationError) {
      Alert.alert('Error', validationError, [{text: 'Ok'}])
      return
    }

    setLoading(true)

    const response = await registerUser(email, password)

    if (!response.success) {
      setError(response.errorMessage)
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={30} style={styles.screen}>
      <CustomText bold style={styles.title}>{loginScreen ? 'Iniciar Sesión' : 'Regístrate'}</CustomText>
      <View style={styles.formContainer}>
        <CustomInput 
          placeholder='Correo electrónico' 
          placeholderTextColor='grey' 
          value={email} 
          onChangeText={text => setEmail(text.replace(/\s/g, ''))}
        />
        <CustomInput 
          password
          placeholder='Contraseña' 
          placeholderTextColor='grey' 
          value={password} 
          onChangeText={text => setPassword(text.replace(/\s/g, ''))}
        />
        {loginScreen ? <View /> : (
          <CustomInput 
            password
            placeholder='Confirmar contraseña' 
            placeholderTextColor='grey' 
            value={confirmPassword} 
            onChangeText={text => setConfirmPassword(text.replace(/\s/g, ''))}
          />
        )}
        {loading ? <CustomActivityIndicator small /> : (
          <View style={styles.loginContainer}> 
            <TouchableOpacity style={styles.loginContainer} onPress={loginScreen ? login : register}>
              <View style={styles.loginButton}>
                <CustomText style={styles.buttonText}>{loginScreen ? 'Iniciar Sesión' : 'Registrarme'}</CustomText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerContainer} onPress={switchLoginRegisterScreen}>
              <CustomText>{loginScreen ? 'No tienes una cuenta?' : 'Ya tengo una cuenta'}</CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View> 
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  title: {
    fontSize: 19,
    marginLeft: 20,
    marginVertical: 20
  },
  formContainer: {
    alignItems: 'center'
  },
  loginContainer: {
    width: '100%',
    alignItems: 'center'
  },
  loginButton: {
    width: '90%',
    borderRadius: 50,
    backgroundColor: Colors.primary
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 20
  },
  registerContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center'
  }
}) 

export default AuthenticationScreen