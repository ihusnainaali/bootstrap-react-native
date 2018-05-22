import { AppRegistry } from 'react-native';
import App from './app';
import { YellowBox } from 'react-native';

AppRegistry.registerComponent('Pangyou', () => App);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
