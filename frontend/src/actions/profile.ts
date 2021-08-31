// @Packages
import { AxiosResponse } from 'axios';

// @Project
import ProfileService from 'services/profile';
import { BackendResponse, IThunkDispatch, Profile } from 'interfaces';


export const PROFILE_FETCH = '[PROFILE] FETCH';
export const PROFILE_RESET = '[PROFILE] RESET';

export const fetchProfile = () => {
  return (dispatch: IThunkDispatch) => {

    return ProfileService.myProfile()
      .then((resp: AxiosResponse<BackendResponse<Profile>>) => {
        const { data } = resp;
        
        dispatch({
          type: PROFILE_FETCH,
          payload: data.data
        });
      })
  }
}

export const resetProfile = () => ({
  type: PROFILE_RESET
});