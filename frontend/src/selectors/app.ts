// @Project
import { IStoreState } from 'reducers/rootReducer';
import { Currency } from 'interfaces';

export const selectCurrencies = (state: IStoreState): Currency[] => state.app.currencies;