// @Packages
import { combineReducers } from 'redux';

// @Project
import session, { IState as IStateSession } from './session';
import profile, { IState as IStateProfile } from './profile';

export interface IStoreState {
  session: IStateSession
  profile: IStateProfile
}

export default combineReducers<IStoreState>({
  session,
  profile
});