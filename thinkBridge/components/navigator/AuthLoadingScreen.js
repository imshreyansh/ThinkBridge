import React, { Component } from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { connect } from 'react-redux'
import Dashboard from '../dashboard/Dashboard'
import UploadImage from '../upload/UploadImage'
import CategoryDetails from '../dashboard/CategoryDetails'
import Favourites from '../dashboard/Favourites'
class AuthLoadingScreen extends Component {

    constructor(props) {
        super(props)
        this.default = {

        }
        this.state = this.default
    }

    componentDidMount() {
        this._isMounted = true
        if (this._isMounted) {

        }
    }

    componentWillUnmount() {
        this._isMounted = false

    }


    render() {
        const RootStack = createNativeStackNavigator();
        return (
            <View style={{ flex: 1 }}>
                <RootStack.Navigator>
                    <RootStack.Screen name="UserStack" component={UserStack} options={{ headerShown: false }} />
                </RootStack.Navigator>
            </View>
        )
    }
}

//*******************************************************************************************************************************************************************
//Navigators

const UserStackNavigator = createNativeStackNavigator();

const UserStack = () => {
    return (
        <UserStackNavigator.Navigator>
            <UserStackNavigator.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <UserStackNavigator.Screen name="UploadImage" component={UploadImage} options={{ headerShown: false }} />
            <UserStackNavigator.Screen name="CategoryDetails" component={CategoryDetails} options={{ headerShown: false }} />
            <UserStackNavigator.Screen name="Favourites" component={Favourites} options={{ headerShown: false }} />
        </UserStackNavigator.Navigator>
    )
}



function mapStateToProps(data) {
    return {

    }
}

export default connect(mapStateToProps)(AuthLoadingScreen)
