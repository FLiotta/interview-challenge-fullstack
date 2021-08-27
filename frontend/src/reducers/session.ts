// @Packages
import { AnyAction } from "redux"

// @Project
import {
  SESSION_LOG_IN,
  SESSION_RECONNECT,
  SESSION_DISCONNECT
} from 'actions/session';

export interface IState {
  token?: string
  refresh_token: string;
  user_id: number;
}

const defaultState: Partial<IState> = { }

export default (state = defaultState, action: AnyAction) => {
  switch(action.type) {
    case SESSION_LOG_IN:
    case SESSION_RECONNECT:
      return action.payload;
    case SESSION_DISCONNECT:
      return defaultState;
    default:
      return state;
  } 
}