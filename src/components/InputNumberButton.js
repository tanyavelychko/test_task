import React from 'react';

import {
    StyleSheet,
    TouchableOpacity,
    Text
  } from 'react-native';

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        margin: 1,
        backgroundColor: '#134F4C',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 35,
        textAlignVertical: 'center',
        color: '#001817'
    }
});

class InputNumberButton extends React.Component {
    render() {
        const {buttonText, handleOnPress} = this.props;
        return(
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleOnPress(buttonText)}
            >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
        );
    }
}

export default InputNumberButton;