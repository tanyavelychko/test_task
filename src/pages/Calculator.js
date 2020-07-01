import { StatusBar } from 'expo-status-bar';
import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    Alert
  } from 'react-native';

  import InputNumberButton from '../components/InputNumberButton';


const stylesCalc = StyleSheet.create({
    calcContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 50
    },  
    screen: {
        height: 100,
        width: '100%',
        backgroundColor: 'white'        
    },
    screenText: {
        color: '#001817',
        textAlign: 'right',
        fontSize: 50,
        fontWeight: 'bold',
        textAlignVertical: 'center'
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#001817',
    },

    buttonsRow: {
        flex: 1,
        flexDirection: 'row',

    },
});

const buttons = [
    ['Exit', 'Del', '%'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '+'],
    ['.', '0', '=', '-']
];


class Calculator extends React.Component {
    constructor(props) {
        super(props);

        
        this.initialState = {
            displayValue: '0',
            operator: null,
            keepResult: true,
            displayArray: [],
            operationIndicator: false,
            visible: false,
            calcVisibility: false
        }
        this.state = this.initialState;
    }

    renderButtons() {
        let layouts = buttons.map((buttonRows, index) => {
            let rowItem = buttonRows.map((buttonItem, buttonIndex) => {
                return <InputNumberButton
                    key={'btn-' + buttonIndex}
                    buttonText={buttonItem}
                    handleOnPress={this.handleInput.bind(this, buttonItem)}

                />
            });
            return <View style={stylesCalc.buttonsRow} key={'row-' + index}>{rowItem}</View>
        });

        return layouts;
    }

    handleInput = (input) => {
        let { displayValue, operator, keepResult, displayArray, operationIndicator } = this.state;

        let newDisplayArray = [];
        let lastIndex;
        let result;


        switch (input) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                if (displayValue === '0' || !keepResult) {
                    displayValue = '';
                    displayArray = [];
                }

                newDisplayArray = displayArray.concat([]);
                lastIndex = newDisplayArray.length - 1;



                if (operationIndicator || (displayArray.length === 0)) {
                    newDisplayArray = displayArray.concat(input);
                } else {
                    newDisplayArray[lastIndex] = newDisplayArray[lastIndex] + input;
                }

                this.setState({
                    operator: null,
                    displayValue: displayValue + input,
                    keepResult: true,
                    displayArray: newDisplayArray,
                    operationIndicator: false,
                });

                break;
            
            case '.':
                if (displayValue === '0' || !keepResult) {
                    displayValue = '0.';
                    displayArray = ['0.'];
                }

                newDisplayArray = displayArray.concat([]);
                lastIndex = newDisplayArray.length - 1;
                let comaExp = /\./;

                if (operationIndicator) {
                    newDisplayArray = displayArray.concat('0.');
                    input = '0.'
                } else if (!comaExp.test(newDisplayArray[lastIndex])) {
                    newDisplayArray[lastIndex] = newDisplayArray[lastIndex] + input;
                } else {
                    input = '';
                }

                this.setState({
                    operator: null,
                    displayValue: displayValue + input,
                    keepResult: true,
                    displayArray: newDisplayArray,
                    operationIndicator: false
                });


                break; 
            
            case '+':
            case '-':
            case '*':
            case '/':

                newDisplayArray = displayArray.concat([]);
                lastIndex = newDisplayArray.length - 1;
                let newDisplayValue = displayValue;

                if (operator !== null) {
                    newDisplayArray[lastIndex] = input;
                    newDisplayValue = displayValue.substr(0, displayValue.length - 1) + input
                } else {
                    newDisplayArray = newDisplayArray.concat(input);
                    newDisplayValue = displayValue + input;
                }

                this.setState({
                    operator: input,
                    keepResult: true,
                    displayValue: newDisplayValue,
                    displayArray: newDisplayArray,
                    operationIndicator: true
                });

                break;
            
            case '%':
                newDisplayArray = displayArray.concat([]);
                let percents = parseFloat(newDisplayArray.pop());
                let lastOperator = newDisplayArray.pop();
                let preResult = eval(newDisplayArray.join(''));
                result = eval(preResult + lastOperator + (preResult/100*percents));

                this.setState({
                    displayValue: result,
                    displayArray: [],
                    keepResult: false
                });
                break;

            case '=':
                result = eval(displayArray.join(''));
                this.setState({
                    displayValue: parseFloat(result.toFixed(8)),
                    displayArray: [],
                    keepResult: false        
                });
                break;
            
            case 'Del':
                this.setState({
                    displayValue: '0',
                    displayArray: []        
                });
                break;
            
            case 'Exit': 
                this.props.onExit();
                break;
        }

        
    }

    render() {
    return (
        <View style={stylesCalc.calcContainer}>
            <View style={stylesCalc.screen}>
                <Text style={stylesCalc.screenText}>
                    {this.state.displayValue}
                </Text>
            </View>
            <View style={stylesCalc.inputContainer}>
                {this.renderButtons()}
            </View>

            
        </View>
    );
    }
}

export default Calculator;