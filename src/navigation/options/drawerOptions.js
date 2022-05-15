import { Dimensions } from 'react-native'
import { COLORS } from '../../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import { WINDOW_SIZES } from '../../constants/WindowSizes'

const windowWidth = Dimensions.get('window').width

export const drawerNavigatorOptions = {
  headerShown: false,
  drawerActiveTintColor: 'white',
  drawerActiveBackgroundColor: COLORS.primary,
  drawerType: windowWidth >= WINDOW_SIZES.maxWidth ? 'permanent' : 'front',
  drawerLabelStyle: {
    fontFamily: 'open-sans-bold'
  }
}

export const drawerHomeOptions = {
  drawerLabel: 'Inicio',
  drawerIcon: ({ color }) => <Icon name='home' size={20} color={color} />
}

export const drawerOrdersOptions = {
  drawerLabel: 'Pedidos',
  drawerIcon: ({ color }) => <Icon name='shopping-cart' size={20} color={color} />
}

export const drawerContactOptions = {
  drawerLabel: 'Contacto',
  drawerIcon: ({ color }) => <Icon name='phone' size={24} color={color} />
}

export const drawerAboutUsOptions = {
  drawerLabel: 'Quienes somos',
  drawerIcon: ({ color }) => <Icon name='info' size={20} color={color} />,
  drawerItemStyle: {
    paddingLeft: 10
  }
}

export const drawerProfileOptions = {
  drawerLabel: 'Perfil',
  drawerIcon: ({ color }) => <Icon name='user-o' size={20} color={color} />
}
