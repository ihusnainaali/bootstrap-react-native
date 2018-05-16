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
    marginTop: 50,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 220,
    height: 220
  },
  icon: {
    color: theme.COLOR_SECONDARY_DARK,
    fontSize: theme.HEADER_ICON_SIZE
  }
})