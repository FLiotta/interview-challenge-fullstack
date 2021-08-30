// @Packages
import { AxiosResponse } from 'axios';

// @Project
import AccountService from 'services/account';
import { BackendResponse, IThunkDispatch, Account } from 'interfaces';


export const ACCOUNTS_FETCH = '[ACCOUNTS] FETCH';
export const ACCOUNTS_UPDATE_PRICE = '[ACCOUNTS] UPDATE PRICE';
export const ACCOUNTS_APPEND = '[ACCOUNTS] APPEND ACCOUNTS';

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

export const appendAccounts = (accs: Account[]) => ({
  type: ACCOUNTS_APPEND,
  payload: accs
});

export const updateAccountValue = (
  accountId: number, 
  amount: number, 
  operation: 'increase' | 'decrease'
) => ({
  type: ACCOUNTS_UPDATE_PRICE,
  payload: {
    accountId,
    amount,
    operation
  }
});