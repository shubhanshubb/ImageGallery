import { View, Text } from 'react-native'
import React from 'react'

const Create = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
        }}>
        Upload Photos
      </Text>
    </View>
  )
}

export default Create