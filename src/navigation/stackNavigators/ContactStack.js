import ContactScreen from '../../screens/ContactScreen'
import { screenHeaderIcon, screenOptions } from '../options/options'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const ContactStack = () => {
  const ContactStack = createNativeStackNavigator()

  return (
    <ContactStack.Navigator screenOptions={screenOptions}>
      <ContactStack.Screen name='ContactScreen' component={ContactScreen} options={screenHeaderIcon} />
    </ContactStack.Navigator>
  )
}

export default ContactStack
