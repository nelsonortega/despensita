import { useEffect, useState } from 'react'
import * as Notifications from 'expo-notifications'

const usePushNotificationToken = () => {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    const tokenResponse = await registerForPushNotificationsAsync()
    setToken(tokenResponse)
    setLoading(false)
  }, [])

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      return ''
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data

    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })

    return token
  }

  return [loading, token]
}

export default usePushNotificationToken
