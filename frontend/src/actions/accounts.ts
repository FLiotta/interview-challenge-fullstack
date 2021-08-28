// @Packages
import { AxiosResponse } from 'axios';

// @Project
import AccountService from 'services/account';
import { BackendResponse, IThunkDispatch, Account } from 'interfaces';


export const ACCOUNTS_FETCH = '[ACCOUNTS] FETCH';

export const fetchAccounts = () => {
  return (dispatch: IThunkDispatch) => {

    return AccountService.getAllAccounts()
      .then((resp: AxiosResponse<BackendResponse<Account[]>>) => {
        const { metadata } = resp.data
        const { data } = resp.data;

        dispatch({
          type: ACCOUNTS_FETCH,
          payload: {
            data: data,
            total: metadata?.total
          }
        });
      })
  }
}