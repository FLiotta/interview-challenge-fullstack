// @Packages
import { AxiosResponse } from 'axios';

// @Project
import DataService from 'services/data';
import { BackendResponse, IThunkDispatch, Currency } from 'interfaces';


export const APP_FETCH_CURRENCIES = '[APP] FETCH CURRENCIES';

export const fetchCurrencies = () => {
  return (dispatch: IThunkDispatch) => {

    return DataService.getCurrencies()
      .then((resp: AxiosResponse<BackendResponse<Currency[]>>) => {
        const { metadata } = resp.data
        const { data } = resp.data;

        dispatch({
          type: APP_FETCH_CURRENCIES,
          payload: {
            data: data,
            total: metadata?.total
          }
        });
      })
  }
}