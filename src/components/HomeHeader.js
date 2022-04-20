import CustomText from './CustomText'
import SearchInput from './SearchInput'
import Colors from '../constants/Colors'
import { useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'

const HomeHeader = props => {
  const isUserAdmin = useSelector(state => state.auth.isUserAdmin)

  return (
    <View>
      <SearchInput />
      {isUserAdmin &&
        <Button
          dark
          mode='contained'
          uppercase={false}
          style={styles.button}
          color={Colors.primary}
          onPress={props.handleCreateProduct}
        >
          <CustomText>Crear Producto</CustomText>
        </Button>}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 20,
    marginBottom: 15
  }
})

export default HomeHeader
