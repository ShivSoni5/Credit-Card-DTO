import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const cardSelector = createSelector(
  (state: AppState) => state.card,
  card => card
);
