// @Packages
import React, { useEffect, useState } from 'react';
import Modal, { Styles } from 'react-modal';
import { useForm } from 'react-hook-form';
import cogoToast from 'cogo-toast';
import { useSelector } from 'react-redux';

// @Project
import DataService from 'services/data';
import { UpdateCreateCurrencyPayload } from 'services/data';
import { Account, Currency } from 'interfaces';
import { selectCurrencies } from 'selectors/app';

// @Own
import './styles.scss';
import selectedAccount from 'reducers/selectedAccount';

interface FormPayload { 
  name: string,
  symbol: string
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
  currency?: Currency
}

const DepositModal: React.FC<IProps> = ({
  visible,
  onClose,
  onSuccess,
  currency,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setValue('name', currency?.name);
    setValue('symbol', currency?.symbol);
  }, [currency]);

  const handleFormSubmit = (payload: FormPayload) => {
    setLoading(true);

    if(currency) {
      handleUpdateCurrency(currency.id, payload);
    } else {
      handleCreateCurrency(payload);
    }
  }

  const handleCreateCurrency = (payload: UpdateCreateCurrencyPayload) => {
    DataService.createCurrency(payload)
      .then((resp) => {
        console.warn("Se esta simulando un tiempo de 2s solo por fines esteticos =)")
        cogoToast.success('Divisa creada con exito!', {
          position: 'bottom-right'
        })
        reset()
        onSuccess();
        setLoading(false)
      })
      .catch(() => {
        cogoToast.error('Hubo un problema al crear la divisa.', {
          position: 'bottom-right'
        })
        setLoading(false)
      });
  }

  const handleUpdateCurrency = (currencyId: number ,payload: UpdateCreateCurrencyPayload) => {
    DataService.updateCurrency(currencyId, payload)
      .then((resp) => {
        console.warn("Se esta simulando un tiempo de 2s solo por fines esteticos =)")
        cogoToast.success('Divisa actualizada con exito!', {
          position: 'bottom-right'
        })
        reset()
        onSuccess();
        setLoading(false)
      })
      .catch(() => {
        cogoToast.error('Hubo un problema al actualizar la divisa.', {
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
      <h4>💵 {currency ? 'Editar divisa' : 'Nueva divisa'}</h4>
      <form 
        id="createAccountModalForm"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="form-group mt-3">
          <label htmlFor="name">Nombre</label>
          <input
            {...register('name', {
              required: true,
            })}
            className="form-control"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="symbol">Simbolo</label>
          <input
            {...register('symbol', {
              required: true
            })}
            className="form-control"
          />
        </div>
      </form>
      <div className="currencymodal__footer">
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
            : currency ? 'Actualizar' : 'Crear'
          }
        </button>
      </div>
    </Modal>
  )
}

export default DepositModal;