import { combineEpics } from 'redux-observable';
import { fetchTablesEpic } from './fetchTablesEpic';

export const rootEpic = combineEpics(fetchTablesEpic);
