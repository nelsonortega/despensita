import { useState } from 'react'
import { Searchbar } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as ProductActions from '../store/actions/ProductActions'

const SearchInput = props => {
  const dispatch = useDispatch()

  const products = useSelector(state => state.products.products)

  const [searchText, setSearchText] = useState('')

  const handleSearchChange = text => {
    setSearchText(text)

    if (text.trim().length === 0) {
      dispatch(ProductActions.filterProducts(products))
    } else {
      const filteredProducts = products.filter(product => product.title.toLowerCase().includes(text.toLowerCase()))
      dispatch(ProductActions.filterProducts(filteredProducts))
    }
  }

  return (
    <View style={styles.container}>
      <Searchbar
        value={searchText}
        placeholder='Buscar'
        inputStyle={styles.textInput}
        onChangeText={handleSearchChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  textInput: {
    fontFamily: 'open-sans'
  }
})

export default SearchInput
