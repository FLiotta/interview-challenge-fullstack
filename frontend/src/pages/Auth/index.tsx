// @Packages
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import cogoToast from 'cogo-toast';

// @Project
import { selectSessionToken } from 'selectors/session';
import Hand3D from 'assets/hand_3d.png';
import { IThunkDispatch } from 'interfaces';
import { logIn } from 'actions/session';
import Logo from 'components/Logo';

// @Own
import './styles.scss';
import session from 'reducers/session';

interface IFormProps {
  onSubmit: (email: string, password: string) => void,
  mode: 'login' | 'signup'
}

const AuthForm: React.FC<IFormProps> = ({
  onSubmit,
  mode
}) => {
  const { handleSubmit, register } = useForm();

  interface FormPayload {
    username: string,
    password: string
  }

  const handleFormSubmit = (payload: FormPayload) => {
    onSubmit(payload.username, payload.password);
  }

  return (
    <form className="auth__form" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="form-group">
        <label htmlFor="username" className="mb-2"><small>Nombre de usuario</small></label>
        <input 
          className="form-control form-control-sm" 
          {...register('username', { required: true })}
        />
      </div>
      <div className="form-group mt-3">
        <label htmlFor="password" className="mb-2"><small>Contraseña</small></label>
        <input 
          type="password" 
          className="form-control form-control-sm" 
          {...register('password', { required: true })}
        />
      </div>
      <button className="btn btn-brand btn-sm mt-4 rounded-pill">
        {mode === 'login' ? 'Ingresar' : 'Registrarse'}
      </button>
    </form>
  )
}

const Auth: React.FC<any> = () => {
  const history = useHistory();
  const dispatch: IThunkDispatch = useDispatch();
  const sessionToken = useSelector(selectSessionToken)
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if(sessionToken) {
      history.push('/');
    }
  }, [sessionToken]);

  const handleLogin = (username: string, password: string) => {
    dispatch(logIn(username, password))
      .then(() => {
        cogoToast.success('Bienvenido!', {
          position: 'bottom-right'
        })

        history.push('/');
      })
      .catch(() => {
        cogoToast.error('Credenciales invalidas!', {
          position: 'bottom-right'
        })
      })
  }
  
  const handleSignup = (username: string, password: string) => {

  }

  return (
    <div className="auth">
      <div className="auth__left">
        <img src={Hand3D} className="auth__image" />
        <h1 className="auth__left-title">
          WE GOING <marker>TO MOON</marker>
        </h1>
        <h4 className="auth__left-description">
          Almacena todas tus divisas y sus transacciones
          <br />
          En un mismo monedero
        </h4>
      </div>
      <div className="auth__right">
        <Logo brandColor tag="h1" />

        <AuthForm
          mode={mode}
          onSubmit={mode === 'login' ? handleLogin : handleSignup }
        />

        {mode === 'login'
          ? <button className="btn btn-link text-decoration-none" onClick={() => setMode('signup')}>Crear cuenta 🤗</button>
          : <button className="btn btn-link text-decoration-none" onClick={() => setMode('login')}>Ya tengo una cuenta 🤗</button>
        }
        
      </div>
    </div>
  )
}

export default Auth;