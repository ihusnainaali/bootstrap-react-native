import { AppRegistry } from 'react-native';
import App from './app';
import { YellowBox } from 'react-native';

import Amplify from 'aws-amplify';

let myAppAWSConfig = {
  'aws_appsync_graphqlEndpoint': 'https://ragcgxmk4nd23ocl62hdgd5x5m.appsync-api.us-east-1.amazonaws.com/graphql',
  'aws_appsync_region': 'us-east-1',
  'aws_appsync_authenticationType': 'API_KEY',
  'aws_appsync_apiKey': 'da2-5tu3pq6dtzhppkbpcmuoyqan5y',
}

Amplify.configure(myAppAWSConfig);

AppRegistry.registerComponent('Pangyou', () => App);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
