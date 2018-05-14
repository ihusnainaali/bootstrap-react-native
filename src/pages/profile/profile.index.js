import React from 'react';
import { Text, View,Image, ScrollView, FlatList, StyleSheet, SectionList } from 'react-native';
import { Header, Avatar, Card, ListItem, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Button from '../../components/button/button.component';

import styles from './profile.style';

// declare a sample user here for testing
const user = {

    // name: 'Example Person',
    // status: 'I want Soup Dumplings',
    // location: 'Beijing, China'
    // basic: [
    //   age: 'January 1, 1900',
    //   gender: 'Male',
    //   school: 'Peking University',
    //   major: 'Underwater Basket Weaving',
    //   language: 'English',
    // ],
    // description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

}

const list = [
  {
    title: 'Example Person',
    icon: 'child-care'
  },
  {
    title: 'I want Soup Dumplings',
    icon: 'sms-failed'
  },
  {
    title: 'Beijing, China',
    icon: 'location-on'
  },
  {
    title: 'January 1, 1900',
    icon: 'cake'
  },
  {
    title: 'Male',
    icon: 'wc'
  },
  {
    title: 'Peking University',
    icon: 'school'
  },
  {
    title: 'Underwater Basket Weaving',
    icon: 'school'
  },
  {
    title: 'English',
    icon: 'language'
  }
]

class Profile extends React.Component {

  render() {
    return (
      <ScrollView>
        // Profile Box
        <View style={styles.profileCard}>
          <Icon name='face' marginTop={15} size={140}/>
          // <Text style={styles.text}>{user.status}</Text>
        </View>
        // Description Box
        <View style={styles.descriptionCard}>
          <View>
            {
              list.map((item, i) => (
                <ListItem
                  key={i}
                  title={item.title}
                  leftIcon={{ name: item.icon }}
                />
              ))
            }
          </View>
        </View>
        <View style={styles.profileBottomGrid}>
            <Button
                onPress={this.props.navigation.navigate('EditProfile')}
                name='Edit Profile'
                screen='editprofile'/>
        </View>
      </ScrollView>
    );
  }
}

export default withNavigation(Profile);
