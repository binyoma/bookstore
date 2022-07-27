import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NewBook from '../screens/NewBook'
import StackNavigator from './StackNavigator'
import { IconButton } from 'react-native-paper'

const Tab =createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen 
        name='home' 
        component={StackNavigator}
        options={{ 
            tabBarIcon:()=>(<IconButton icon="home"/>),
            headerShown:false
            }}
        />
        <Tab.Screen 
        name='new' 
        component={NewBook}
        options={{ 
            tabBarIcon:()=>(<IconButton icon="add-outline"/>)}}
        />
    </Tab.Navigator>
  )
}

export default TabNavigator