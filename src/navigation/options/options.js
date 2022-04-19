import Colors from '../../constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'

export const screenOptions = {
  title: 'La Despensita',
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    color: 'white',
    fontFamily: 'open-sans-bold'
  },
  headerTintColor: '#fff',
  animation: 'slide_from_right'
}

export const drawerScreenOptions = {
  ...screenOptions,
  drawerActiveTintColor: 'white',
  drawerActiveBackgroundColor: Colors.primary,
  drawerLabelStyle: {
    fontFamily: 'open-sans-bold'
  }
}

export const drawerHomeOptions = {
  headerShown: false, 
  drawerLabel: 'Inicio', 
  drawerIcon: ({color}) => <Icon name={'home'} size={20} color={color} />
}

export const drawerOrdersOptions = {
  headerShown: false, 
  drawerLabel: 'Pedidos', 
  drawerIcon: ({color}) => <Icon name={'shopping-cart'} size={20} color={color} />
}

export const drawerContactOptions = {
  drawerLabel: 'Contacto', 
  drawerIcon: ({color}) => <Icon name={'phone'} size={24} color={color} />
}

export const drawerAboutUsOptions = {
  drawerLabel: 'Quienes somos', 
  drawerIcon: ({color}) => <Icon name={'info'} size={20} color={color} />,
  drawerItemStyle: {
    paddingLeft: 10
  }
}

export const drawerProfileOptions = {
  headerShown: false, 
  drawerLabel: 'Perfil', 
  drawerIcon: ({color}) => <Icon name={'user-o'} size={20} color={color} />
}