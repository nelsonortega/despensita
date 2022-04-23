import Colors from '../../constants/Colors'
import HeaderIcon from '../../components/HeaderIcon'

export const screenOptions = {
  title: 'La Despensita',
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTitleStyle: {
    color: 'white',
    fontFamily: 'open-sans-bold'
  },
  headerTintColor: '#fff',
  animation: 'slide_from_right'
}

export const screenHeaderIcon = {
  headerLeft: () => <HeaderIcon iconName='md-menu' />
}

export const homeScreenHeaderIcons = {
  ...screenHeaderIcon,
  headerRight: () => <HeaderIcon cart iconName='md-cart' />
}
