import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import CustomText from '../components/CustomText'
import HeaderIcon from '../components/HeaderIcon'
import CustomInput from '../components/CustomInput'
import { Picker } from '@react-native-picker/picker'
import { firestoreStorage } from '../firebase/firebase'
import * as ProductActions from '../store/actions/ProductActions'
import CustomActivityIndicator from '../components/CustomActivityIndicator'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { View, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native'

const CreateProductScreen = props => {
  const dispatch = useDispatch()

  const [error, setError] = useState()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState(0)
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (error) {
      Alert.alert('Ocurrió un error', error, [{ text: 'Ok' }])
    }
  }, [error])

  const uploadImage = async (uri) => {
    const response = await fetch(uri)
    const blob = await response.blob()

    const storageRef = ref(firestoreStorage, 'images/' + Math.round(new Date().valueOf()).toString())
    const uploadTask = uploadBytesResumable(storageRef, blob)

    uploadTask.on('state_changed', (snapshot) => {
      // const prog = Math.round(
      //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      // )
      // console.log(prog)
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then(url => {
          dispatch(ProductActions.createProduct(title, description, category, price, url))
        })
    }
    )
  }

  const validateInputs = () => {
    if (title.trim() === '' || description.trim() === '') {
      Alert.alert('Error', 'Ingrese un título y descripción válidos')
      return true
    } else if (image.length <= 0) {
      Alert.alert('Error', 'Debe seleccionar una imagen')
      return true
    } else if (price.length <= 0) {
      Alert.alert('Error', 'Ingrese un precio válido')
      return true
    } else if (category === 0) {
      Alert.alert('Error', 'Seleccione una categoría')
      return true
    } else {
      return false
    }
  }

  const createProduct = async () => {
    if (validateInputs()) {
      return
    } else {
      setError(null)
      setLoading(true)
      try {
        await uploadImage(image)
        setLoading(false)
        Alert.alert(
          'Éxito', 'Producto añadido correctamente', [
            { text: 'Agregar otro', onPress: addOtherProduct },
            { text: 'Volver a Inicio', onPress: () => { props.navigation.popToTop() } }
          ]
        )
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
  }

  const addOtherProduct = () => {
    setImage('')
    setPrice('')
    setTitle('')
    setCategory(0)
    setLoading(false)
    setDescription('')
  }

  const addImage = () => {
    Alert.alert(
      'Atención', 'Seleccione una opción',
      [
        { text: 'Galería', onPress: () => openCamera(false) },
        { text: 'Cámara', onPress: () => openCamera(true) }
      ]
    )
  }

  const openCamera = async value => {
    let imagePickerOptions = {
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    }

    const imageResult = value
      ? await ImagePicker.launchCameraAsync(imagePickerOptions)
      : await ImagePicker.launchImageLibraryAsync(imagePickerOptions)

    if (!imageResult.cancelled) {
      setImage(imageResult.uri)
    }
  }

  const changeImage = async () => {
    Alert.alert(
      'Atención', 'Desea cambiar la imagen?',
      [
        { text: 'Eliminar', onPress: () => { setImage('') } },
        { text: 'Sí', onPress: addImage },
        { text: 'No' }
      ]
    )
  }

  return (
    <ScrollView style={styles.screen}>
      <CustomText style={styles.text}>Publicar un producto</CustomText>
      <View style={styles.center}>
        <CustomInput
          placeholder='Título del producto'
          placeholderTextColor='grey'
          value={title}
          onChangeText={text => setTitle(text)}
        />
        <CustomInput
          placeholder='Descripción del producto'
          placeholderTextColor='grey'
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <CustomInput
          placeholder='Precio'
          keyboardType='numeric'
          placeholderTextColor='grey'
          value={price}
          onChangeText={text => setPrice(text.replace(/[^0-9]/g, ''))}
        />
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={category}
            onValueChange={itemValue => setCategory(itemValue)}
          >
            <Picker.Item label='Selecciona una categoría' value={0} />
            <Picker.Item label='Alimentos' value={1} />
            <Picker.Item label='Bebidas' value={2} />
            <Picker.Item label='Higiene' value={3} />
            <Picker.Item label='Mascotas' value={4} />

          </Picker>
        </View>
      </View>
      <CustomText style={styles.imageText}>Añade una imagen</CustomText>

      {image.length > 0 ?
        <TouchableOpacity onPress={changeImage}>
          <Image source={{ uri: image }} style={styles.image} />
        </TouchableOpacity>
        : (
        <TouchableOpacity onPress={addImage}>
          <View style={styles.addImageButton}>
            <Ionicons size={35} color='grey' name='md-add' />
          </View>
        </TouchableOpacity>
      )}
      {loading ? <CustomActivityIndicator small /> : (
        <TouchableOpacity style={styles.buttonContainer} onPress={createProduct}>
          <View style={styles.button}>
            <CustomText style={styles.buttonText}>Crear Producto</CustomText>
          </View>
        </TouchableOpacity>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff'
  },
  center: {
    alignItems: 'center'
  },
  text: {
    fontSize: 17,
    marginTop: 20,
    marginLeft: '5%',
    marginBottom: 10
  },
  imageText: {
    fontSize: 17,
    marginLeft: '5%',
    marginBottom: 10
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
  },
  addImageButton: {
    height: 120,
    width: '90%',
    borderRadius: 7,
    marginLeft: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondary
  },
  buttonContainer: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center'
  },
  button: {
    width: '90%',
    borderRadius: 7,
    backgroundColor: Colors.primary
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10
  },
  image: {
    height: 170,
    width: '90%',
    borderRadius: 7,
    marginLeft: '5%'
  }
})

export default CreateProductScreen
