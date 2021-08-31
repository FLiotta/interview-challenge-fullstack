// @Packages
import { AnyAction } from 'redux';

// @Project
import { Currency } from 'interfaces';
import { APP_FETCH_CURRENCIES } from 'actions/app';

export interface IState {
  currencies: Currency[]
}

const defaultState: IState = {
  currencies: []
}

const appReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case APP_FETCH_CURRENCIES:
      return {
        ...state,
        currencies: action.payload.data
      };
    default:
      return state;
  }
}

export default appReducer;