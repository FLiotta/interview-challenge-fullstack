// @Packages
import { AnyAction } from "redux"

// @Project
import { Account } from 'interfaces';
import {
  ACCOUNTS_FETCH,
  ACCOUNTS_UPDATE_PRICE,
  ACCOUNTS_APPEND,
  ACCOUNTS_RESTART
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
    case ACCOUNTS_UPDATE_PRICE:
      const tempState: IState = Object.assign(state);
      const accountIndex: number = tempState.data.findIndex((acc) => acc.id === action.payload.accountId);

      if(action.payload.operation === 'increase') {
        tempState.data[accountIndex].funds += action.payload.amount;
      } else {
        tempState.data[accountIndex].funds -= action.payload.amount;
      }

      return {
        ...state,
        data: tempState.data
      };
    case ACCOUNTS_APPEND:
      return {
        data: [
          ...state.data,
          ...action.payload
        ],
        total: state.total + action.payload.length
      }
    case ACCOUNTS_RESTART:
      return defaultState;
    default:
      return state;
  } 
}