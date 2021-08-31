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
import { logIn, signUp } from 'actions/session';
import Logo from 'components/Logo';
import { SignupPayload } from 'services/auth';

// @Own
import './styles.scss';
import session from 'reducers/session';

interface IFormProps {
  onLogin: (email: string, password: string) => Promise<void>,
  onSignup: (payload: SignupPayload) => Promise<void>
  mode: 'login' | 'signup'
}

const AuthForm: React.FC<IFormProps> = ({
  onLogin,
  onSignup,
  mode
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const loginForm = useForm();
  const signupForm = useForm();

  interface FormPayload {
    username: string,
    password: string
  }

  const handleFormSubmit = async (payload: FormPayload) => {
    setLoading(true);

    await onLogin(payload.username, payload.password)

    setLoading(false);
  }

  const handleSignupSubmit = (payload: SignupPayload) => {
    setLoading(true);

    onSignup(payload)

    setLoading(false);
  }

  if(mode === "login") {
    return (
      <form className="auth__form" onSubmit={loginForm.handleSubmit(handleFormSubmit)}>
        <fieldset disabled={loading}>
          <div className="form-group">
            <label htmlFor="username" className="mb-2"><small>Nombre de usuario</small></label>
            <input 
              className="form-control form-control-sm" 
              {...loginForm.register('username', { required: true })}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="password" className="mb-2"><small>Contraseña</small></label>
            <input 
              type="password" 
              className="form-control form-control-sm" 
              {...loginForm.register('password', { required: true })}
            />
          </div>
        </fieldset>
        <button
          className="btn btn-brand btn-sm mt-4 rounded-pill"
          disabled={loading}
        >
          {loading
            ?  (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Ingresando...
            </>
          ) : "Ingresar"
          } 
        </button>
      </form>
    )
  } else {
    return (
      <form 
        className="auth__form" 
        onSubmit={signupForm.handleSubmit(handleSignupSubmit)}
      >
        <fieldset disabled={loading}>
          <div className="form-group">
            <label htmlFor="username"><small>Nombre de usuario</small></label>
            <input 
              className="form-control form-control-sm" 
              {...signupForm.register('username', { required: true })}
            />
          </div>
          <div className="form-group mt-2">
            <label htmlFor="email"><small>Email</small></label>
            <input 
              className="form-control form-control-sm" 
              type="email"
              {...signupForm.register('email', { required: true })}
            />
          </div>
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="form-group mt-2">
                <label htmlFor="first_name"><small>Nombre</small></label>
                <input 
                  className="form-control form-control-sm" 
                  {...signupForm.register('first_name', { required: true })}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group mt-2">
                <label htmlFor="last_name"><small>Apellido</small></label>
                <input 
                  className="form-control form-control-sm" 
                  type="last_name"
                  {...signupForm.register('last_name', { required: true })}
                />
              </div>
            </div>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="password"><small>Contraseña</small></label>
            <input 
              type="password" 
              className="form-control form-control-sm" 
              {...signupForm.register('password', { required: true })}
            />
          </div>
        </fieldset>
        <button 
          className="btn btn-brand btn-sm mt-4 rounded-pill"
          disabled={loading}
        >
          {loading
              ?  (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Creando cuenta...
              </>
            ) : "Registrarse"
            } 
        </button>
      </form>
    )
  }
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

  const handleLogin = (username: string, password: string): Promise<void> => {
    return dispatch(logIn(username, password))
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
  
  const handleSignup = (signupPayload: SignupPayload): Promise<void> => {
    return dispatch(signUp(signupPayload))
      .then(() => {
        cogoToast.success('Bienvenido!', {
          position: 'bottom-right'
        })

        history.push('/');
      })
      .catch(() => {
        cogoToast.error('Datos invalidos!', {
          position: 'bottom-right'
        })
      })
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
          onLogin={handleLogin}
          onSignup={handleSignup}
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