import React from 'react';
import { View, Text} from 'react-native';

import { withNavigation } from 'react-navigation';

import styles from './matchmaking.style';

class Matchmaking extends React.Component { 

    render() {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Matchmaking!</Text>
          </View>
        );
    }
}

export default withNavigation(Matchmaking);