import { Operation, Account, Metadata } from 'interfaces';
import { IStoreState } from 'reducers/rootReducer';

export const selectSelectedAccount = (state: IStoreState): Account | undefined => state.selectedAccount?.account;
export const selectOperations = (state: IStoreState): Operation[] => state.selectedAccount.operations;
export const selectOperationsMetadata = (state: IStoreState): Metadata => state.selectedAccount.operationsMetadata;