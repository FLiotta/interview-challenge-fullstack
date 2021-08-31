// @Packages
import { AnyAction } from "redux"

// @Project
import { Profile } from 'interfaces';
import {
  PROFILE_FETCH, PROFILE_RESET
} from 'actions/profile';

export interface IState extends Partial<Profile> { }

const defaultState: IState = { }

const profileReducer = (state = defaultState, action: AnyAction) => {
  switch(action.type) {
    case PROFILE_FETCH:
      return action.payload;
    case PROFILE_RESET:
      return defaultState;
    default:
      return state;
  } 
}

export default profileReducer;