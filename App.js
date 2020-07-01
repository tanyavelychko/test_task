import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import Login from './src/pages/Login';
import Calculator from './src/pages/Calculator';



const styles = StyleSheet.create({
  container: {
      flex: 1,      
      backgroundColor: '#E4FBFA'
  },
  
});


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      calcVisibility: false
    }
      
    
  }

  showCalculator() {
    this.setState({
      calcVisibility: true
    })
  }
  
  hideCalculator() {
    this.setState({
      calcVisibility: false
    })
  }

  renderScreens(calcVisibility) {
      
    if (calcVisibility) {
      return <Calculator
        onExit={this.hideCalculator.bind(this)}
      />
    } else {
      return <Login
        onLogin={this.showCalculator.bind(this)}
      />
    }

  }

  render() {
    return (
      <View style={styles.container}
      >        
        {this.renderScreens(this.state.calcVisibility)}
      </View>
    );
  }
  }
  

export default App;