import { createAction, props } from '@ngrx/store';
import { ICardDetails } from '../models';

export const setDetails = createAction('[CarDetails] Set Details', props<{ card: ICardDetails }>());
