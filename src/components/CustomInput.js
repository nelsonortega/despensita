import { COLORS } from '../constants/Colors'
import { StyleSheet, TextInput } from 'react-native'

const CustomInput = props => {
  return (
    <TextInput {...props} style={styles.input} secureTextEntry={props.password} />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: '90%',
    fontSize: 16,
    borderRadius: 7,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontFamily: 'open-sans',
    backgroundColor: COLORS.secondary
  }
})

export default CustomInput
