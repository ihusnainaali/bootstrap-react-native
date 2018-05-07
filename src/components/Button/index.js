import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import { withNavigation } from 'react-navigation';

class Button extends Component {

  render() {

    let screen = this.props.screen;

    return (
      <TouchableOpacity style={styles.container}
        onPress={() => this.props.navigation.navigate(screen)}>
          <Text style={styles.text}>{this.props.name}
          </Text>
      </TouchableOpacity>
    );
  }
}

export default withNavigation(Button);