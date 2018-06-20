import { combineReducers } from 'redux';

import auth from './auth.reducer';
import friends from './friends.reducer';

export default combineReducers({
  auth,
  friends
});
