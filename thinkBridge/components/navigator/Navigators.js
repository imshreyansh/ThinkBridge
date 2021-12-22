import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthLoadingScreen from './AuthLoadingScreen'
import { NavigationContainer } from '@react-navigation/native';

const AuthLoader = createNativeStackNavigator();

export const Navigators = () => {
    return (
        <NavigationContainer>
            <AuthLoader.Navigator>
                <AuthLoader.Screen name="AuthLoadingScreen" component={AuthLoadingScreen} options={{ headerShown: false }} />
            </AuthLoader.Navigator>
        </NavigationContainer>
    )
}
