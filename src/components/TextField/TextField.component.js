import React, { Component } from 'react';
import { TextInput } from 'react-native';
import styles from './TextField.component.style';

class TextField extends Component {
  render() {

    let onChangeText = this.props.onChangeText;
    const {...extraProps} = this.props;

    return (
      <TextInput
        {...extraProps}
        style={[styles.textField, extraProps.style]}
        multiline = {false}
        onChangeText={(value) => onChangeText(value)}
        />
    );

  }
}
export default TextField;
