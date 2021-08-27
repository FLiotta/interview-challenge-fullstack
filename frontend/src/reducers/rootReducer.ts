// @Packages
import { combineReducers } from 'redux';

// @Project
import session, { IState as IStateSession } from './session';

export interface IStoreState {
  session: IStateSession
}

export default combineReducers<IStoreState>({
  session,
});