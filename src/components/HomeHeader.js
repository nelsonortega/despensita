import CustomText from './CustomText'
import SearchInput from './SearchInput'
import { useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import { COLORS } from '../constants/Colors'
import { StyleSheet, View } from 'react-native'

const HomeHeader = props => {
  const isUserAdmin = useSelector(state => state.user.isUserAdmin)

  return (
    <View>
      <SearchInput />
      {isUserAdmin &&
        <Button
          dark
          mode='contained'
          uppercase={false}
          style={styles.button}
          color={COLORS.primary}
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
