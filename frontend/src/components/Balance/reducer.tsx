// @Packages
import { AnyAction } from 'redux';

// @Project
import { Operation } from 'interfaces';

export interface IState {
  operations: Operation[]
}

const defaultState: IState = {
  operations: []
}

export default (state = defaultState, action: AnyAction) => {
  switch(action.type) {
    default:
      return state
  }
}

