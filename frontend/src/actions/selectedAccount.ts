// @Packages
import { AxiosResponse } from 'axios';

// @Project
import AccountService from 'services/account';
import { BackendResponse, IThunkDispatch, Account, Operation } from 'interfaces';
import { IStoreState } from 'reducers/rootReducer';


export const SELECTEDACCOUNT_SELECT = '[SELECTED ACCOUNT] SELECT';
export const SELECTEDACCOUNT_FETCH_OPERATIONS = '[SELECTED ACCOUNT] FETCH OPERATIONS';
export const SELECTEDACCOUNT_FETCH_MORE_OPERATIONS = '[SELECTED ACCOUNT] FETCH MORE OPERATIONS'
export const SELECTEDACCOUNT_RESTART = '[SELECTED ACCOUNT] RESTART';

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
          payload: {
            operations: resp.data.data,
            operationsMetadata: resp.data.metadata
          }
        });
      })
      .catch(console.log)
  }
}

export const fetchOperationsNextPage = () => {
  return (dispatch: IThunkDispatch, getState: Function) => {
    const state: IStoreState = getState();
    const accountId = state.selectedAccount.account?.id;
    const lastPage: number = state.selectedAccount.operationsMetadata.page;

    if(!accountId) {
      return Promise.resolve();
    }

    return AccountService.getAccountOperations(accountId, lastPage + 1)
      .then((resp: BackendResponse<any>) => {
        dispatch({
          type: SELECTEDACCOUNT_FETCH_MORE_OPERATIONS,
          payload: {
            operations: resp.data.data,
            operationsMetadata: resp.data.metadata
          }
        });
      })
      .catch(console.log)
  }
}

export const restartSelectedAccount = () => ({
  type: SELECTEDACCOUNT_RESTART
});