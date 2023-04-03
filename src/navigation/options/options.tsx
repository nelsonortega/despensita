import React from 'react'
import { HeaderIcon } from '../../components'
import { COLORS } from '../../constants/Colors'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'

export const screenOptions: NativeStackNavigationOptions = {
  title: 'La Despensita',
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: COLORS.primary
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
