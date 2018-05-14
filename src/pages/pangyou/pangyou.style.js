import {
  StyleSheet
} from 'react-native';
import theme from '../../styles/theme.style';

export default StyleSheet.create({

  wrapper: {
    backgroundColor: theme.COLOR_PRIMARY,
    flex: 1,
    alignItems: 'center'
  },
  avatarGrid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 168,
    height: 168
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
})