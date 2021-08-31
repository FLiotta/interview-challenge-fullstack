// @Packages
import { AnyAction } from 'redux';

// @Project
import { 
  SELECTEDACCOUNT_SELECT, 
  SELECTEDACCOUNT_FETCH_OPERATIONS,
  SELECTEDACCOUNT_FETCH_MORE_OPERATIONS,
  SELECTEDACCOUNT_RESTART
} from 'actions/selectedAccount';
import { Operation, Account } from 'interfaces';

export interface IState {
  operations: Operation[],
  operationsMetadata: {
    total: number,
    page: number,
    limit: number
  }
  account?: Account
}

const defaultState: IState = {
  operations: [],
  operationsMetadata: {
    total: 0,
    page: 0,
    limit: 0
  }
}

const selectedAccountReducer = (state = defaultState, action: AnyAction) => {
  switch(action.type) {
    case SELECTEDACCOUNT_SELECT:
      return {
        ...state,
        account: action.payload
      }
    case SELECTEDACCOUNT_FETCH_OPERATIONS:
      return {
        ...state,
        operations: action.payload.operations,
        operationsMetadata: action.payload.operationsMetadata
      };
    case SELECTEDACCOUNT_FETCH_MORE_OPERATIONS:
      return {
        ...state,
        operations: [
          ...state.operations,
          ...action.payload.operations,
        ],
        operationsMetadata: action.payload.operationsMetadata
      }
    case SELECTEDACCOUNT_RESTART:
      return defaultState;
    default:
      return state
  }
}

export default selectedAccountReducer;