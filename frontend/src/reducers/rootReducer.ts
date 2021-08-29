// @Packages
import { combineReducers } from 'redux';

// @Project
import session, { IState as IStateSession } from './session';
import profile, { IState as IStateProfile } from './profile';
import accounts, { IState as IStateAccount } from './accounts';
import depositmodal, { IState as IStateDepositModal } from 'components/DepositModal/reducers';
import selectedAccount, { IState as IStateSelectedAccount } from './selectedAccount';

export interface IStoreState {
  session: IStateSession
  profile: IStateProfile
  accounts: IStateAccount
  depositmodal: IStateDepositModal
  selectedAccount: IStateSelectedAccount
}

export default combineReducers<IStoreState>({
  session,
  profile,
  accounts,
  depositmodal,
  selectedAccount
});