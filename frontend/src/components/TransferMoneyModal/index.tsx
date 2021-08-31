// @Packages
import React, { useState } from 'react';
import Modal, { Styles } from 'react-modal';
import { useForm } from 'react-hook-form';
import cogoToast from 'cogo-toast';

// @Project
import AccountService from 'services/account';
import { Account } from 'interfaces';

// @Own
import './styles.scss';

interface FormPayload { 
  depositAddress: string
  amount: number
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
  onSuccess: (transferedAmount: number) => void
  account: Account
}

const DepositModal: React.FC<IProps> = ({
  visible,
  onClose,
  onSuccess,
  account,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFormSubmit = (payload: FormPayload) => {
    const amount = Number(payload.amount);
    const depositAddress = payload.depositAddress;

    setLoading(true);

    AccountService.transfer(account.id, amount, depositAddress)
      .then((resp) => {
        console.warn("Se esta simulando un tiempo de 2s solo por fines esteticos =)")
        cogoToast.success('Transferencia realizada con exito!', {
          position: 'bottom-right'
        })
        reset()
        onSuccess(amount);
        setLoading(false)
      })
      .catch(() => {
        cogoToast.error('Hubo un problema al realizar la transferencia.', {
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
      <h4>🤝 Nueva transferencia</h4>
      <p>
        Estas proximo a enviar dinero; Recuerda que solo puede enviarse dinero entre cuentas de su misma divisa, como
        en este caso <strong>{account.currency?.name}</strong>
      </p>
      <form 
        id="createAccountModalForm"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="form-group">
          <label htmlFor="name">Direccion de deposito de la cuenta</label>
          <input
            {...register('depositAddress', {
              required: true
            })}
            className="form-control"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="amount">Monto</label>
          <input
            {...register('amount', {
              required: true,
              min: 1,
              max: account.funds
            })}
            className="form-control"
            type="number"
          />
        </div>
      </form>
      <div className="transfermodal__footer">
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
            : 'Enviar'
          }
        </button>
      </div>
    </Modal>
  )
}

export default DepositModal;