import React , { Component } from 'react';
import { StyleSheet, Image, View,ListView, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { ListItem } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
    },
  });
  
class Friends extends React.Component {

    constructor(props) {
      super(props);
  
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      };
    }
    
    render() {
      return (
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(data) => <View><Text>{data}</Text></View>}
        />
      );
    }
  }
  

export default withNavigation(Friends);