// @Packages
import { combineReducers } from 'redux';

// @Project
import session, { IState as IStateSession } from './session';
import profile, { IState as IStateProfile } from './profile';
import accounts, { IState as IStateAccount } from './accounts';
import selectedAccount, { IState as IStateSelectedAccount } from './selectedAccount';
import app, { IState as IStateApp } from './app';

export interface IStoreState {
  session: IStateSession
  app: IStateApp,
  profile: IStateProfile
  accounts: IStateAccount
  selectedAccount: IStateSelectedAccount
}

export default combineReducers<IStoreState>({
  session,
  app,
  profile,
  accounts,
  selectedAccount
});