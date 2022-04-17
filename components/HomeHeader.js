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
      {isUserAdmin ? 
        <Button style={styles.button} mode='contained' onPress={props.createProduct} color={Colors.primary} dark uppercase={false}>
          <CustomText>Crear Producto</CustomText>
        </Button>
        : <></>
      }
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