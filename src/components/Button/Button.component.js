import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from './Button.component.style';

class Button extends Component {
  render() {
    let screen = this.props.screen;
    let name = this.props.name;
    return (
      <TouchableOpacity style={styles.container}
        onPress={() => this.props.navigation.navigate(screen)}>
          <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Button);
