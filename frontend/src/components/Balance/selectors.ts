import { Operation } from 'interfaces';
import { IStoreState } from 'reducers/rootReducer';

export const selectOperations = (state: IStoreState): Operation[] => state.balance.operations;