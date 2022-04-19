import { StyleSheet, Text } from 'react-native'

const CustomText = props => {
  const fontStyle = !props.bold
    ? { ...styles.customFont, ...props.style }
    : { ...styles.customFontBold, ...props.style }

  return (
    <Text {...props} style={fontStyle}>
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'open-sans'
  },
  customFontBold: {
    fontFamily: 'open-sans-bold'
  }
})

export default CustomText
