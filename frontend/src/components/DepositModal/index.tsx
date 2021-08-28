// @Packages
import React, { useState } from 'react';
import Modal, { Styles } from 'react-modal';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import cogoToast from 'cogo-toast';

// @Project
import AccountService from 'services/account';

// @Own
import { closeDepositModal } from './actions';
import { selectSelectedAccount, selectVisible } from './selectors';
import './styles.scss';

interface FormPayload { amount: number }

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

const DepositModal: React.FC<any> = () => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const selectedAccount = useSelector(selectSelectedAccount);
  const isVisible = useSelector(selectVisible);

  const handleFormSubmit = (payload: FormPayload) => {
    if(selectedAccount) {
      const { amount } = payload;

      setLoading(true);

      AccountService.deposit(selectedAccount.id, Number(amount))
        .then(() => {
          // Tiempo simulado con fines de muestra
          return setTimeout(() => Promise.resolve(), 5000);
        })
        .then(() => {
          console.warn("Se esta simulando un tiempo de 2s solo por fines esteticos =)")
          cogoToast.success('Deposito acreditado con exito', {
            position: 'bottom-right'
          })

          setValue('amount', undefined);
          setLoading(false)
        })
        .catch(() => {
          cogoToast.error('Hubo un problema con el procesamiento de tu deposito.', {
            position: 'bottom-right'
          })
          setLoading(false)
        });
    }
  }

  const handleClose = () => {
    dispatch(closeDepositModal());
  }

  return (
    <Modal
      isOpen={isVisible}
      onRequestClose={handleClose}
      style={customStyles}
      contentLabel="Modal de depositos"
    >
      <h4>💰 Depositos</h4>
      <p>
        Estas proximo a hacer un deposito en tu cuenta #{selectedAccount?.id} ({selectedAccount?.name}) en {selectedAccount?.currency?.name}.
        <br/><br/>
        Ingresa acontinuacion el valor deseado:
      </p>
      <form 
        id="depositModalForm"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="form-group">
          <input
            {...register('amount', { required: true })}
            placeholder="e.g: 1500"
            className="form-control"
          />
        </div>
      </form>

      <p className="depositmodal__payment">Se usara el metodo de pago configurado en tu cuenta por defecto para procesar la operacion.</p>

      <div className="depositmodal__footer">
        <button 
          type="button" 
          className="btn btn-brand-secondary" onClick={handleClose}
          disabled={loading}
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          className="btn btn-brand"
          disabled={loading}
          form="depositModalForm"
        >
          {loading
            ? <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Procesando...
            </>
            : 'Depositar'
          }
        </button>
      </div>
    </Modal>
  )
}

export default DepositModal;