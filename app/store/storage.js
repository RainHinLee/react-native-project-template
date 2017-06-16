import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

import sync from './sync.js';

export default new Storage({
	storageBackend:AsyncStorage,
	sync,
})
