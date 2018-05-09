import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from './button.component.style';

class Button extends Component {
  render() {
    let screen = this.props.screen;
    let name = this.props.name;
    let onPress = this.props.onPress;
    return (
      <TouchableOpacity style={styles.container}
        onPress={() => onPress ? onPress() : screen ? this.props.navigation.navigate(screen) : null}>
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Button);
