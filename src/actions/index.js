import axios from 'axios';
import { FETCH_TABLES, FETCH_CHECKS, FETCH_CHECK, CREATE_CHECK, FETCH_ITEMS, CLEAR_MESSAGE, ASYNC_ERROR } from './types';

const ROOT_URL = 'https://check-api.herokuapp.com';
const AUTH_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxOWNmNGVjLWUxY2QtNDFhZC04NWU5LTU3ODBhMjE4MzZiNyIsIm5hbWUiOiJFcmlrIFBvbGRlcm1hbiJ9.CpEZ14y8_s6u9F5mhPrhBtruNlTIVmzVPDq9afbQbjE';

export const fetchTables = () => async dispatch => {
  try {
  const response = await axios.get(ROOT_URL + '/tables', {'headers': {'Authorization' : AUTH_KEY}});
  dispatch({ type: FETCH_TABLES, payload: response.data });
  }
  catch(e){
    dispatch({type: ASYNC_ERROR});
  }
}

export const fetchCheck = (checkID) => async dispatch => {
  try{
    const response = await axios.get(ROOT_URL + '/checks/' + checkID, {'headers': {'Authorization' : AUTH_KEY}});
    dispatch({ type: FETCH_CHECK, payload: response.data });
  }
  catch(e){
    dispatch({type: ASYNC_ERROR});
  }
}

export const fetchChecks = () => async dispatch => {
  try{
    const response = await axios.get(ROOT_URL + '/checks', {'headers': {'Authorization' : AUTH_KEY}});
    dispatch({ type: FETCH_CHECKS, payload: response.data });
  }
  catch(e){
    dispatch({type: ASYNC_ERROR});
  }
}

export const fetchItems = () => async dispatch => {
  try{
    const response = await axios.get(ROOT_URL + '/items', {'headers': {'Authorization' : AUTH_KEY}});
    if(response)
    dispatch({ type: FETCH_ITEMS, payload: response.data });
  }
  catch(e){
    dispatch({type: ASYNC_ERROR});
  }
}

export const addMenuItem = (checkid, menuItemID, callback) => async dispatch => {
  const fullItemID = {itemId: menuItemID};
  try{
    const response = await axios.put(ROOT_URL + '/checks/' + checkid + '/addItem', fullItemID, {'headers': {'Authorization' : AUTH_KEY}});
    if(response)
    callback();
  }
  catch(e){
    dispatch({type: ASYNC_ERROR});
  }
}

export const voidMenuItem = (checkid, menuItemID, callback) => async dispatch => {

  const fullItemIDtoVoid = {orderedItemId: menuItemID};
  try{
    const response = await axios.put(ROOT_URL + '/checks/' + checkid + '/voidItem', fullItemIDtoVoid, {'headers': {'Authorization' : AUTH_KEY}});
    if(response)
    callback();
  }
  catch(e){
    dispatch({type: ASYNC_ERROR});
  }
}

export const OpenCheckforTable = (stringTableID, callback) => async dispatch => {
  const id = { tableId: stringTableID };
  try{
    const response = await axios.post(ROOT_URL + '/checks', id, {'headers': {'Authorization' : AUTH_KEY}});
    if(response) {
    dispatch({ type: CREATE_CHECK, payload: response.data });
    callback();
    }
  }
  catch(e){
    dispatch({type: ASYNC_ERROR});
  }
}

//Notes: No dispatch call for close check because in Redux we do NOT want to mutate our state.
//We can invoke fetchPosts callback which will return our newly updated state via the backend.
//React will detect that change and re-render.
export const CloseCheckforTable = (id, callback) => async dispatch => {
  try{
    const response = await axios.put(ROOT_URL + '/checks/' + id + '/close', id, {'headers': {'Authorization' : AUTH_KEY}});
    if(response)
    callback();
  }
  catch(e){
    dispatch({type: ASYNC_ERROR});
  }
}

export const clearMessage = () => dispatch =>
    dispatch({type: CLEAR_MESSAGE})
