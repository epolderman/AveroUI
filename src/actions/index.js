import { AUTH_KEY, ROOT_URL } from '../Utils/keys';
import {
  FETCH_TABLES,
  FETCH_CHECKS,
  FETCH_CHECK,
  CREATE_CHECK,
  FETCH_ITEMS,
  CLEAR_MESSAGE,
  ASYNC_ERROR,
  FETCH_TABLES_COMPLETE,
  FETCH_CHECKS_COMPLETE,
  FETCH_CHECK_COMPLETE,
  CREATE_CHECK_COMPLETE,
  FETCH_ITEMS_COMPLETE,
  VOID_ITEM,
  ADD_ITEM,
  CLOSE_CHECK,
} from './types';

export { ROOT_URL, AUTH_KEY };

//tables
export function getTables() {
  return { type: FETCH_TABLES };
}

export function setTables(tables) {
  return {
    type: FETCH_TABLES_COMPLETE,
    payload: tables.response,
  };
}

//checkS
export function getChecks() {
  return { type: FETCH_CHECKS };
}

export function setChecks(checks) {
  return {
    type: FETCH_CHECKS_COMPLETE,
    payload: checks.response,
  };
}

//check(single)
export const getCheck = id => {
  return {
    type: FETCH_CHECK,
    payload: id,
  };
};

export const setCheck = check => {
  return {
    type: FETCH_CHECK_COMPLETE,
    payload: check.response,
  };
};

//items
export const getItems = () => {
  return { type: FETCH_ITEMS };
};

export const setItems = items => {
  return {
    type: FETCH_ITEMS_COMPLETE,
    payload: items.response,
  };
};

export const getItemtoAdd = (checkid, menuItemID, callback) => {
  const fullItemID = { itemId: menuItemID };
  return {
    type: ADD_ITEM,
    payload: fullItemID,
    check: checkid,
    callbacktoInvoke: callback,
  };
};

//items
export const getItemtoVoid = (checkid, menuItemID, callback) => {
  const fullItemIDtoVoid = { orderedItemId: menuItemID };
  return {
    type: VOID_ITEM,
    payload: fullItemIDtoVoid,
    check: checkid,
    callbacktoInvoke: callback,
  };
};

//open check
export const openCheck = stringTableID => {
  const id = { tableId: stringTableID };
  return {
    type: CREATE_CHECK,
    payload: id,
  };
};

export const completeOpenCheck = check => {
  return {
    type: CREATE_CHECK_COMPLETE,
    payload: check.response,
  };
};

export const closeThisCheck = (id, callback) => {
  return {
    type: CLOSE_CHECK,
    payload: id,
    callbacktoInvoke: callback,
  };
};

export const clearMessage = () => {
  return { type: CLEAR_MESSAGE };
};
