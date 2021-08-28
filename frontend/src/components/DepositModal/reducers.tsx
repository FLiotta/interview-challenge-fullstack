// @Packages
import { AnyAction } from "redux";

// @Project
import { Account } from 'interfaces';

// @Own
import { DEPOSITMODAL_OPEN, DEPOSITMODAL_CLOSE } from './actions';

export interface IState {
  visible: boolean
  account?: Account
}

const defaultState: IState = {
  visible: false,
  account: undefined
}

export default (state = defaultState, action: AnyAction) => {
  switch(action.type) {
    case DEPOSITMODAL_OPEN:
      return {
        visible: true,
        account: action.payload.acc
      }
    case DEPOSITMODAL_CLOSE:
      return {
        visible: false,
        account: {}
      }
    default: 
      return state;
  }
}