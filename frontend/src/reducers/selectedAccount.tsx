// @Packages
import { AnyAction } from 'redux';

// @Project
import { SELECTEDACCOUNT_SELECT, SELECTEDACCOUNT_FETCH_OPERATIONS } from 'actions/selectedAccount';
import { Operation, Account } from 'interfaces';

export interface IState {
  operations: Operation[],
  account?: Account
}

const defaultState: IState = {
  operations: [],
}

export default (state = defaultState, action: AnyAction) => {
  switch(action.type) {
    case SELECTEDACCOUNT_SELECT:
      return {
        ...state,
        account: action.payload
      }
    case SELECTEDACCOUNT_FETCH_OPERATIONS:
      return {
        ...state,
        operations: action.payload
      };
    default:
      return state
  }
}

