import React from 'react'
import CustomText from './CustomText'
import SearchInput from './SearchInput'
import Colors from '../constants/Colors'

import { StyleSheet, View, TouchableOpacity } from 'react-native'

const HomeHeader = props => {
  return (
    <View>
      <SearchInput />
      <TouchableOpacity style={styles.buttonContainer} onPress={props.createProduct}>
        <View style={styles.button}>
          <CustomText style={styles.buttonText}>Crear Producto</CustomText>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center'
  },
  button: {
    width: '90%',
    borderRadius: 7,
    marginBottom: 15,
    backgroundColor: Colors.primary
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10
  }
})

export default HomeHeader