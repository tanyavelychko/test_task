import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-gesture-handler';

import {
    StyleSheet,
    View,
    TextInput,
    Button,
    Alert
  } from 'react-native';

  const styles = StyleSheet.create({
    
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    input: {
        width: 300,
        height: 50,
        padding: 10,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#001817',
        backgroundColor: 'white',
        marginBottom: 10
    },
    button: {
        marginTop: 20,
    },
  });

  const users = [
    user1 = {
      name: 'User',
      password: '123456'
    },
  ];


  class Login extends React.Component {
      constructor(props) {
          super(props);

          this.state = {
            username: '',
            password: '',
          };

      }

      onLogin() {
        const { username, password } = this.state;

        const latinExp = /^([A-Za-z0-9\s]*)$/
        
        if (latinExp.test(this.state.username)) {
          if (username === users[0].name && password === users[0].password) {
            Alert.alert('Welcome ', `${username}`);
            this.props.onLogin()
          } else {
            Alert.alert('Wrong Username or Password');
          }
          
        } else {
          Alert.alert('Your Username can only contain latin characters');
        }


        
      }

      render() {
        return(
          <View style={styles.wrapper}>
            <TextInput
              style = {styles.input}
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })} 
              placeholder={'Username'}
            />

            <TextInput
              style = {styles.input}
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              placeholder={'Password'}
              secureTextEntry={true}                    
            />

            <Button
              color='#134F4C'
              style={styles.button}
              title={"Login"}
              onPress={this.onLogin.bind(this)}
        
            />    
          </View>
            
        );
    }
  }




export default Login;