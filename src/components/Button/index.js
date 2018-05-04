import React from 'react';
import {
  TouchableHighlight,
  Text,
} from 'react-native';
import styles from './styles';

const Button = (

    onPress,
    buttonStyle = styles.container,
    textColor = styles.text

) => (
  <TouchableHighlight style={buttonStyle}>
    <Text style={textColor}>Click Me</Text>
  </TouchableHighlight>
)

Button.propTypes = {
    onPress: React.PropTypes.func.isRequired,
    label: React.PropTypes.string,
    buttonStyle: React.PropTypes.any,
    textColor: React.PropTypes.any,
};  

export default Button