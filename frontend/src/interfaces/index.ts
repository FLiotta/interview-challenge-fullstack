// @Packages
import { ThunkDispatch } from "redux-thunk";

// @Project
import { IStoreState } from 'reducers/rootReducer';
import { AnyAction } from "redux";

export interface IThunkDispatch extends ThunkDispatch<IStoreState, any, AnyAction> {}

export interface BackendResponse<T> {
  error?: string
  message?: string
  data: T | T[] | any
  metadata?: {
    total: number
  }
}

export interface Profile {
  id: number
  username: string,
  first_name?: string
  last_name?: string
  email?: string
  is_superuser: boolean,
  is_staff: boolean
}

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
  operation_type: 'transfer' | 'deposit'
  receiver: any
  sender: any
  date: string | Date
}