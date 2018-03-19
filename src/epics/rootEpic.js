import { combineEpics } from 'redux-observable';
import { fetchTablesEpic } from './fetchTablesEpic';
import { fetchChecksEpic } from './fetchChecksEpic';
import { fetchCheckEpic } from './fetchCheckEpic';
import { createCheckEpic } from './createCheckEpic';

export const rootEpic = combineEpics(
  fetchTablesEpic,
  createCheckEpic,
  fetchChecksEpic,
  fetchCheckEpic
);
