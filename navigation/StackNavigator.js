
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NewBook from '../screens/NewBook'
import ListBook from '../screens/ListBook'
import DetailsBook from '../screens/DetailsBook'
import DeleteBook from '../screens/DeleteBook'

const Stack =createNativeStackNavigator()

const StackNavigator = () => {
    return(
   <Stack.Navigator screenOptions={{  headerShown:false}}>
      <Stack.Screen name='Acceuil' component={ListBook}/>
      <Stack.Screen name='book' component={NewBook}/>
      <Stack.Screen name='Details' component={DetailsBook}/>
      <Stack.Screen name='delete' component={DeleteBook}/>
  </Stack.Navigator>
    )
}

export default StackNavigator