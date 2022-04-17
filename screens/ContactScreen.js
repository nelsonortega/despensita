import CustomText from '../components/CustomText'
import { View, StyleSheet, Image } from 'react-native'

const ContactScreen = props => {
  return (
    <View style={styles.screen}>
      <Image source={require('../assets/icon.png')} style={styles.icon}/>
      <CustomText bold>¿Necesitas ponerte en contacto?</CustomText>
      <CustomText>Llámanos al 2234-1060</CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  icon: {
    width: 200,
    height: 200,
    marginBottom: 10
  }
}) 

export default ContactScreen