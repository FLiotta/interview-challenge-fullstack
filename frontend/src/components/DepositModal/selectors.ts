import { Account } from 'interfaces';
import { IStoreState } from 'reducers/rootReducer';

export const selectSelectedAccount = (state: IStoreState): Account | undefined => state.depositmodal.account;
export const selectVisible = (state: IStoreState): boolean => state.depositmodal.visible;