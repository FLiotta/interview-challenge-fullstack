// @Project
import { Account } from 'interfaces';

export const DEPOSITMODAL_OPEN = '[DEPOSIT MODAL] OPEN';
export const DEPOSITMODAL_CLOSE = '[DEPOSIT MODAL] CLOSE';

export const openDepositModal = (acc: Account) => ({
  type: DEPOSITMODAL_OPEN,
  payload: { acc }
})

export const closeDepositModal = () => ({
  type: DEPOSITMODAL_CLOSE
})