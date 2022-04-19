import { StyleSheet, View, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

const SideMenu = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Image source={require('../assets/icon.png')} style={styles.icon} />
      </View>
      <DrawerItemList {...props}/>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 190,
    paddingLeft: 10,
    borderRadius: 7,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 140,
    height: 140
  }
}) 

export default SideMenu