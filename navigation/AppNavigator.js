import React from 'react'
import Colors from '../constants/Colors'
import SideMenu from '../components/SideMenu'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import OrdersScreen from '../screens/OrdersScreen'
import AboutUsScreen from '../screens/AboutUsScreen'
import ContactScreen from '../screens/ContactScreen'
import ProfileScreen from '../screens/ProfileScreen'
import Icon from 'react-native-vector-icons/FontAwesome'
import UpdateUserScreen from '../screens/UpdateUserScreen'
import OrderDetailScreen from '../screens/OrderDetailScreen'
import CreateProductScreen from '../screens/CreateProductScreen'
import AuthenticationScreen from '../screens/AuthenticationScreen'
import UserInformationScreen from '../screens/UserInformationScreen'

import { I18N } from '../i18n/I18N'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

const navigationOptions = {
  title: I18N.get("title"),
  headerTintColor: 'white',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
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
      drawerIcon: ({tintColor}) => <Icon name="home" size={20} color={tintColor} />
    }
  },
  Orders: {
    screen: OrdersSwitchNavigator,
    navigationOptions: {
      title: 'Pedidos',
      drawerIcon: ({tintColor}) => <Icon name="shopping-cart" size={20} color={tintColor} />
    }
  },
  Contact: {
    screen: ContactNavigator,
    navigationOptions: {
      title: 'Contacto',
      drawerIcon: ({tintColor}) => <Icon name="phone" size={20} color={tintColor} />
    }
  },
  AboutUs: {
    screen: AboutUsNavigator,
    navigationOptions: {
      title: 'Quienes somos',
      drawerIcon: ({tintColor}) => <Icon name="info" size={20} color={tintColor} />
    }
  },
  Profile: {
    screen: ProfileSwitchNavigator,
    navigationOptions: {
      title: 'Perfil',
      drawerIcon: ({tintColor}) => <Icon name="user-o" size={20} color={tintColor} />
    }
  }
}, {
  contentComponent: props => <SideMenu {...props} />,
  contentOptions: sideMenuElementStyle
})

export default createAppContainer(MainSideNavigator)