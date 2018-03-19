import { combineEpics } from 'redux-observable';
import { fetchTablesEpic } from './fetchTablesEpic';
import { fetchChecksEpic } from './fetchChecksEpic';

export const rootEpic = combineEpics(fetchTablesEpic, fetchChecksEpic);
