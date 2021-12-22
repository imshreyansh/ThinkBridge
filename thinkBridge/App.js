import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import { SafeAreaView, StatusBar, LogBox } from 'react-native';
import { Navigators } from './components/navigator/Navigators'

export default class App extends React.Component {

  componentDidMount() {
    Icon.loadFont();
  }


  render() {
    LogBox.ignoreAllLogs();
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Navigators />
      </SafeAreaView>
    )
  }
}
