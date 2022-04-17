import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const HeaderIcon = props => {
  const navigation = useNavigation()

  const toggleDrawer = () => {
    navigation.toggleDrawer()
  }

  const openCart = () => {
    navigation.navigate('Cart')
  }

  const goBack = () => {
    navigation.popToTop()
  }

  return (
    <TouchableOpacity onPress={props.cart ? openCart : props.back ? goBack : toggleDrawer}>
      <Ionicons 
        size={props.back ? 24 : 30} 
        color='white' 
        name={props.iconName} 
      />
    </TouchableOpacity>
  )
}

export default HeaderIcon