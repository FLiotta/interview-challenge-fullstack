// @Project
import { IStoreState } from 'reducers/rootReducer';
import { Account } from 'interfaces';

export const selectAccounts = (state: IStoreState): Account[] => state.accounts.data;
export const selectAccountsTotal = (state: IStoreState): number => state.accounts.total;