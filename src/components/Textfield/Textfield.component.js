import React, { Component } from 'react';
import { TextInput } from 'react-native';
import styles from './TextField.component.style';

class TextField extends Component {
  state = {
  text : ''
  }
  render() {
    const {...extraProps} = this.props;
    return (
      <TextInput
        {...extraProps}
        style={[styles.textField, extraProps.style]}
        multiline = {false}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        />
    );
  }
}
export default TextField;
