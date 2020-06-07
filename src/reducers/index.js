import { combineReducers } from 'redux';
import UserRegistration from '../screens/user-registration/reducer';

// const reducer = () => {
//     return null;
// };

export default combineReducers({ userRegistration: UserRegistration });