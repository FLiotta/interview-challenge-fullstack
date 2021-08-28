// @Project
import { IStoreState } from 'reducers/rootReducer';
import { Account } from 'interfaces';

export const selectAccounts = (state: IStoreState): Account[] => state.accounts.data;