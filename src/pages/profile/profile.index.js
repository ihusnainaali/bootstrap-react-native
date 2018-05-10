import React from 'react';
import { Text, View,Image, ScrollView, FlatList, StyleSheet, SectionList } from 'react-native';
import { Header, Avatar, Card, ListItem, Button, Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './profile.style';

// declare a sample user here for testing
const user = {
  
    name: 'Example Person',
    status: 'I want Soup Dumplings',
    location: 'Beijing, China',
    basic: {
      age: 'January 1, 1900',
      gender: 'Male',
      school: 'Peking University',
      major: 'Underwater Basket Weaving',
      language: 'English',
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

}

class Profile extends React.Component {

  render() {
    return (
      <ScrollView contentContainerStyle={styles.profileWrapper}>
        // Profile Box
        <View style={styles.profileCard}>
          <Image
          style={{width: 120, height: 120}}
          source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
          />
          <Icon name='sms-failed' marginTop={15}/>
          <Text style={styles.text}>{user.status}</Text>
        </View>
        // Description Box
        <View style={styles.descriptionCard}>
          <Icon name='location-on' marginTop={10}/>
          <Text style={styles.text}>{user.location}</Text>
          <Icon name='language' marginTop={10}/>
          <Text style={styles.text}>{user.basic.language}</Text>
          <Icon name='school' marginTop={10}/>
          <Text style={styles.text}>{user.basic.school}</Text>
          <Text style={styles.text}>{user.basic.major}</Text>
          <Icon name='cake' marginTop={10}/>
          <Text style={styles.text}>{user.basic.age}</Text>
          <Icon name='wc' marginTop={10}/>
          <Text style={styles.text}>{user.basic.gender}</Text>
        </View>
      </ScrollView>
    );
  }
}

export default withNavigation(Profile);