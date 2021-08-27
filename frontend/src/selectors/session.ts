// @Project
import { IStoreState } from 'reducers/rootReducer';

export const selectSessionToken = (state: IStoreState) => state.session?.token;
export const selectSessionId = (state: IStoreState) => state.session?.id;