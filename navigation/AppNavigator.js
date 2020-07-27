import React from 'react'
import Colors from '../constants/Colors'
import SideMenu from '../components/SideMenu'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import OrdersScreen from '../screens/OrdersScreen'
import AboutUsScreen from '../screens/AboutUsScreen'
import ContactScreen from '../screens/ContactScreen'
import ProfileScreen from '../screens/ProfileScreen'
import UpdateUserScreen from '../screens/UpdateUserScreen'
import OrderDetailScreen from '../screens/OrderDetailScreen'
import CreateProductScreen from '../screens/CreateProductScreen'
import AuthenticationScreen from '../screens/AuthenticationScreen'
import UserInformationScreen from '../screens/UserInformationScreen'

import { Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

const deviceWidth = Dimensions.get('window').width

const navigationOptions = {
  title: 'La Despensita',
  headerTintColor: 'white',
  headerTitleStyle: {
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    marginLeft: deviceWidth/7,
    fontFamily: 'open-sans-bold'
  },
  headerStyle: {
    backgroundColor: Colors.primary
  }
}

const sideMenuElementStyle = {
  activeBackgroundColor: Colors.primary,
  activeTintColor: 'white',
  itemsContainerStyle: {
    marginTop: 16,
    marginHorizontal: 8
  },
  labelStyle: {
    fontWeight: 'normal',
    fontFamily: 'open-sans-bold'
  },
  itemStyle: {
    borderRadius: 7
  }
}

//Stack Navigators
const HomeNavigator = createStackNavigator({
  Home: HomeScreen,
  Cart: CartScreen,
  CreateProduct: CreateProductScreen,
  UserInformation: UserInformationScreen,
  Authentication: {
    screen: AuthenticationScreen,
    params: {'route': 'CreateProduct', 'hideIcon': true}
  }
}, { defaultNavigationOptions: navigationOptions })

const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen,
  OrderDetail: OrderDetailScreen
}, { defaultNavigationOptions: navigationOptions })

const ContactNavigator = createStackNavigator({
  Contact: ContactScreen
}, { defaultNavigationOptions: navigationOptions })

const AboutUsNavigator = createStackNavigator({
  About: AboutUsScreen
}, { defaultNavigationOptions: navigationOptions })

const ProfileNavigator = createStackNavigator({
  Profile: ProfileScreen,
  UpdateUser: UpdateUserScreen
}, { defaultNavigationOptions: navigationOptions })

const CreateAuthNavigator = name => {
  const AuthNavigator = createStackNavigator({
    Authentication: {
      screen: AuthenticationScreen, 
      params: {'route': name, 'hideIcon': false}
    }
  }, { defaultNavigationOptions: navigationOptions })

  return AuthNavigator
}

//Switch Authentication Navigators
const ProfileSwitchNavigator = createSwitchNavigator({
  Auth: CreateAuthNavigator('Profile'),
  Profile: ProfileNavigator
})

const OrdersSwitchNavigator = createSwitchNavigator({
  Auth: CreateAuthNavigator('Orders'),
  Orders: OrdersNavigator
})

//Main side Navigator
const MainSideNavigator = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Inicio',
      drawerIcon: ({tintColor}) => <Ionicons size={20} color={tintColor} name='md-home' />
    }
  },
  Orders: {
    screen: OrdersSwitchNavigator,
    navigationOptions: {
      title: 'Pedidos',
      drawerIcon: ({tintColor}) => <Ionicons size={20} color={tintColor} name='ios-cart' />
    }
  },
  Contact: {
    screen: ContactNavigator,
    navigationOptions: {
      title: 'Contacto',
      drawerIcon: ({tintColor}) => <Ionicons size={20} color={tintColor} name='ios-phone-portrait' />
    }
  },
  AboutUs: {
    screen: AboutUsNavigator,
    navigationOptions: {
      title: 'Quienes somos',
      drawerIcon: ({tintColor}) => <Ionicons size={20} color={tintColor} name='ios-information-circle-outline' />
    }
  },
  Profile: {
    screen: ProfileSwitchNavigator,
    navigationOptions: {
      title: 'Perfil',
      drawerIcon: ({tintColor}) => <Ionicons size={20} color={tintColor} name='ios-man' />
    }
  }
}, {
  contentComponent: props => <SideMenu {...props} />,
  contentOptions: sideMenuElementStyle
})

export default createAppContainer(MainSideNavigator)