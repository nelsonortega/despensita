import React from 'react'
import * as ProductActions from '../store/actions/ProductActions'

import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, TextInput } from 'react-native'

const SearchInput = props => {
  const dispatch = useDispatch()

  const products = useSelector(state => state.products.products)

  const [searchText, setSearchText] = useState('')

  const handleSearchChange = text => {
    setSearchText(text)

    if (text.trim().length === 0) {
      dispatch(ProductActions.filterProducts(products))
    } else {
      let filteredProducts = products.filter(product => product.title.toLowerCase().includes(text.toLowerCase()))
      dispatch(ProductActions.filterProducts(filteredProducts))
    }
  }

  return (
    <View style={styles.container}>
      <Ionicons size={30} color='grey' name='md-search' style={styles.icon}/>
      <TextInput 
        value={searchText}
        onChangeText={handleSearchChange}
        placeholder = 'Buscar'
        style={styles.textInput}
        placeholderTextColor = 'grey'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 20,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 7
  },
  textInput: {
    fontSize: 15,
    fontFamily: 'open-sans-bold',
    flex: 1,
    marginLeft: 15
  },
  icon: {
    marginLeft: 5
  }
})

export default SearchInput