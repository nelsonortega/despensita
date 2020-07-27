import React from 'react'
import CustomText from './CustomText'
import SearchInput from './SearchInput'
import Colors from '../constants/Colors'

import { useSelector } from 'react-redux'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

const HomeHeader = props => {
  const isUserAdmin = useSelector(state => state.auth.isUserAdmin)

  return (
    <View>
      <SearchInput />
      {isUserAdmin ? 
        <TouchableOpacity style={styles.buttonContainer} onPress={props.createProduct}>
          <View style={styles.button}>
            <CustomText style={styles.buttonText}>Crear Producto</CustomText>
          </View>
        </TouchableOpacity> : <></>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
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