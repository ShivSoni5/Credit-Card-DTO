import { Action, createReducer, on } from '@ngrx/store';
import { ICardDetails } from '../models';
import { setDetails } from './card-details.action';

export const initialState: ICardDetails = {
  cardNumber: '',
  cardHolderName: '',
  amount: null,
  cvv: '',
  expiry: new Date()
};

const _cardReducer = createReducer(
  initialState,
  on(setDetails, (state, { card }) => (
    {
      cardNumber: card.cardNumber,
      cardHolderName: card.cardHolderName,
      amount: card.amount,
      cvv: card.cvv,
      expiry: card.expiry
    }
  ))
);

export function cardReducer(state: ICardDetails | undefined, action: Action) {
  return _cardReducer(state, action);
}
