import { combineEpics } from 'redux-observable';
import fetchTableEpic from './fetchTableEpic';

export const rootEpic = combineEpics(fetchTableEpic);
