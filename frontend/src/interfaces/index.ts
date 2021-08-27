// @Packages
import { ThunkDispatch } from "redux-thunk";

// @Project
import { IStoreState } from 'reducers/rootReducer';
import { AnyAction } from "redux";

export interface IThunkDispatch extends ThunkDispatch<IStoreState, any, AnyAction> {}

export interface Currency {
  id: number,
  name: string,
  symbol: string
}

export interface Account {
  id: number,
  name?: string,
  currency?: Currency
  currency_id?: number,
  funds: number,
  owner_id?: number,
  owner?: any
}

export interface Operation {  
  id: number
  amount: number
  currency: Currency
  receiver: any
  sender: any
  date: string | Date
}