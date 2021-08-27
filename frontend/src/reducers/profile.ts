// @Packages
import { AnyAction } from "redux"

// @Project
import { Profile } from 'interfaces';
import {
  PROFILE_FETCH
} from 'actions/profile';

export interface IState extends Partial<Profile> { }

const defaultState: IState = { }

export default (state = defaultState, action: AnyAction) => {
  switch(action.type) {
    case PROFILE_FETCH:
      return action.payload;
    default:
      return state;
  } 
}