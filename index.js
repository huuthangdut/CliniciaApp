/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import BackgroundMessaging from './src/BackgroundMessaging';
import Root from './src/Root';

AppRegistry.registerComponent(appName, () => Root);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => BackgroundMessaging); // <-- Add this line
