import { Ionicons } from '@expo/vector-icons'
import { WINDOW_SIZES } from '../constants/WindowSizes'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity, useWindowDimensions } from 'react-native'

const HeaderIcon = props => {
  const navigation = useNavigation()
  const { width } = useWindowDimensions()

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
    <>
      {(width < WINDOW_SIZES.maxWidth || props.iconName !== 'md-menu') &&
        <TouchableOpacity onPress={props.cart ? openCart : props.back ? goBack : toggleDrawer}>
          <Ionicons
            size={props.back ? 24 : 30}
            color='white'
            name={props.iconName}
          />
        </TouchableOpacity>}
    </>
  )
}

export default HeaderIcon
