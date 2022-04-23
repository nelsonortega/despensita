import AboutUsScreen from '../../screens/AboutUsScreen'
import { screenHeaderIcon, screenOptions } from '../options/options'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AboutUsStack = () => {
  const AboutUsStack = createNativeStackNavigator()

  return (
    <AboutUsStack.Navigator screenOptions={screenOptions}>
      <AboutUsStack.Screen name='UserInformation' component={AboutUsScreen} options={screenHeaderIcon} />
    </AboutUsStack.Navigator>
  )
}

export default AboutUsStack
