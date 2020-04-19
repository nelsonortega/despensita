import React from 'react'
import Colors from '../constants/Colors'

import { StyleSheet, View, ActivityIndicator } from 'react-native'

const LoginActivityIndicator = props => {
  return (
    <View style={props.small ? styles.smallIndicator : styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  smallIndicator: {
    marginVertical: 20
  }
})

export default LoginActivityIndicator