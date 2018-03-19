import axios from 'axios';
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
} from './types';

const ROOT_URL = 'https://check-api.herokuapp.com';
const AUTH_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxOWNmNGVjLWUxY2QtNDFhZC04NWU5LTU3ODBhMjE4MzZiNyIsIm5hbWUiOiJFcmlrIFBvbGRlcm1hbiJ9.CpEZ14y8_s6u9F5mhPrhBtruNlTIVmzVPDq9afbQbjE';

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

//checks
export function getChecks() {
  return { type: FETCH_CHECKS };
}

export function setChecks(checks) {
  return {
    type: FETCH_CHECKS_COMPLETE,
    payload: checks.response,
  };
}

//check
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

export const addMenuItem = (checkid, menuItemID, callback) => async dispatch => {
  const fullItemID = { itemId: menuItemID };
  try {
    const response = await axios.put(
      ROOT_URL + '/checks/' + checkid + '/addItem',
      fullItemID,
      { headers: { Authorization: AUTH_KEY } }
    );
    if (response) callback();
  } catch (e) {
    dispatch({ type: ASYNC_ERROR });
  }
};

export const voidMenuItem = (checkid, menuItemID, callback) => async dispatch => {
  const fullItemIDtoVoid = { orderedItemId: menuItemID };
  try {
    const response = await axios.put(
      ROOT_URL + '/checks/' + checkid + '/voidItem',
      fullItemIDtoVoid,
      { headers: { Authorization: AUTH_KEY } }
    );
    if (response) callback();
  } catch (e) {
    dispatch({ type: ASYNC_ERROR });
  }
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

export const CloseCheckforTable = (id, callback) => async dispatch => {
  try {
    const response = await axios.put(ROOT_URL + '/checks/' + id + '/close', id, {
      headers: { Authorization: AUTH_KEY },
    });
    if (response) callback();
  } catch (e) {
    dispatch({ type: ASYNC_ERROR });
  }
};

export const clearMessage = () => {
  return { type: CLEAR_MESSAGE };
};
