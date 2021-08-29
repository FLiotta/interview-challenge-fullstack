// @Packages
import { AxiosResponse } from 'axios';

// @Project
import AccountService from 'services/account';
import { BackendResponse, IThunkDispatch, Account, Operation } from 'interfaces';
import { IStoreState } from 'reducers/rootReducer';


export const SELECTEDACCOUNT_SELECT = '[SELECTED ACCOUNT] SELECT';
export const SELECTEDACCOUNT_FETCH_OPERATIONS = '[SELECTED ACCOUNT] FETCH OPERATIONS';

export const selectAccount = (acc: Account) => ({
  type: SELECTEDACCOUNT_SELECT,
  payload: acc
});

export const fetchOperations = () => {
  return (dispatch: IThunkDispatch, getState: Function) => {
    const state: IStoreState = getState();
    const accountId = state.selectedAccount.account?.id;

    if(!accountId) {
      return;
    }

    return AccountService.getAccountOperations(accountId)
      .then((resp: BackendResponse<any>) => {
        dispatch({
          type: SELECTEDACCOUNT_FETCH_OPERATIONS,
          payload: resp.data.data
        });
      })
      .catch(console.log)
  }
}