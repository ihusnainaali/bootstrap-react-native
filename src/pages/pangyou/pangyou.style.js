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
    width: 200,
    height: 200
  },
})