import { AppRegistry } from 'react-native';
import App from './app';
import { YellowBox } from 'react-native';

import Amplify from 'aws-amplify';

let myAppConfig = {
  'aws_appsync_graphqlEndpoint': 'https://ragcgxmk4nd23ocl62hdgd5x5m.appsync-api.us-east-1.amazonaws.com/graphql',
  'aws_appsync_region': 'us-east-1',
  'aws_appsync_authenticationType': 'API_KEY',
  'aws_appsync_apiKey': 'da2-v4zrynwksbd2znnzrne3nz2ryy',
}

Amplify.configure(myAppConfig);

AppRegistry.registerComponent('Pangyou', () => App);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
