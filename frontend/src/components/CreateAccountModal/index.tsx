// @Packages
import React, { useState } from 'react';
import Modal, { Styles } from 'react-modal';
import { useForm } from 'react-hook-form';
import cogoToast from 'cogo-toast';
import { useSelector } from 'react-redux';

// @Project
import AccountService from 'services/account';
import { selectCurrencies } from 'selectors/app';

// @Own
import './styles.scss';

interface FormPayload { 
  name?: string
  currency_id: number
}

const customStyles: Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%',
    width: 550
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 15
  }
};

Modal.setAppElement('#root');

interface IProps {
  visible: boolean,
  onClose: () => void
  onSuccess: () => void
}

const CreateAccountModal: React.FC<IProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const currencies = useSelector(selectCurrencies);

  const handleFormSubmit = (payload: FormPayload) => {
    const { name, currency_id } = payload;
    setLoading(true);

    AccountService.create(currency_id, name)
      .then((resp) => {
        console.warn("Se esta simulando un tiempo de 2s solo por fines esteticos =)")
        cogoToast.success('Cuenta creada con exito!', {
          position: 'bottom-right'
        })
        reset()
        onSuccess();
        setLoading(false)
      })
      .catch(() => {
        cogoToast.error('Hubo un problema con la creacion de tu cuenta.', {
          position: 'bottom-right'
        })
        setLoading(false)
      });
  }


  return (
    <Modal
      isOpen={visible}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Modal de creacion de cuentas."
    >
      <h4>🏦 Nueva cuenta</h4>
      <p>
        Estas proximo a crear una cuenta; En ella podras depositar y gestionar tu dinero en la divisa que prefieras.
      </p>
      <form 
        id="createAccountModalForm"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="form-group">
          <label htmlFor="name">Nombre de la cuenta</label>
          <input
            {...register('name')}
            className="form-control"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="currency_id">Divisa</label>
          <select
            {...register('currency_id', { required: true })}
            className="form-control"
          >
            {currencies.map((c) => (
              <option
                value={c.id} 
                key={`currency_createaccmodal_${c.id}`}
              >
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div className="createaccountmodal__footer">
        <button 
          type="button" 
          className="btn btn-brand-secondary" onClick={onClose}
          disabled={loading}
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          className="btn btn-brand"
          disabled={loading}
          form="createAccountModalForm"
        >
          {loading
            ? <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Procesando...
            </>
            : 'Crear cuenta'
          }
        </button>
      </div>
    </Modal>
  )
}

export default CreateAccountModal;