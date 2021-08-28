// @Packages
import { AnyAction } from "redux"

// @Project
import { Account } from 'interfaces';
import {
  ACCOUNTS_FETCH
} from 'actions/accounts';

export interface IState { 
  data: Account[],
  total: number
}

const defaultState: IState = {
  data: [],
  total: 0
}

export default (state = defaultState, action: AnyAction) => {
  switch(action.type) {
    case ACCOUNTS_FETCH:
      return action.payload;
    default:
      return state;
  } 
}