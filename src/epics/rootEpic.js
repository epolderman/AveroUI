import { combineEpics } from 'redux-observable';
import { fetchTablesEpic } from './fetchTablesEpic';
import { fetchChecksEpic } from './fetchChecksEpic';
import { fetchCheckEpic } from './fetchCheckEpic';
import { createCheckEpic } from './createCheckEpic';
import { fetchItemsEpic } from './fetchItemsEpic';
import { voidItemEpic } from './voidItemEpic';
import { addMenuItemEpic } from './addMenuItemEpic';
import { closeCheckEpic } from './closeCheckEpic';

export const rootEpic = combineEpics(
  fetchTablesEpic,
  createCheckEpic,
  fetchChecksEpic,
  fetchCheckEpic,
  fetchItemsEpic,
  voidItemEpic,
  addMenuItemEpic,
  closeCheckEpic
);
