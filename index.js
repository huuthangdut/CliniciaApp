/**
 * @format
 */

import {AppRegistry} from 'react-native'
import App from './src/App'
import {name as appName} from './app.json'
import Root from './src/Root'

AppRegistry.registerComponent(appName, () => Root)
