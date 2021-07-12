// import Config from '../../config';
// import jwt_decode from 'jwt-decode';
import Axios from 'axios';
// import NetInfo from '@react-native-community/netinfo';
import { getItem, setItem, removeItem } from './localStorage';

// Except accessToken, the other 4 variables has a prefix named teacherId(email)
const ACCESSTOKEN = 'accesToken';
// let REFRESHTOKEN = 'refreshToken';
const ROLE = 'role';
const COMCODE = 'comCode';
const TEACHERID = 'teacherId';
const TEACHERNAME = 'teacherName';
const TELEPHONE = 'telephone';
// let COMNAME = 'companyName';
const TOKENSAVEDTIME = 'tokenSavedTime';
const ISLOGGEDIN = 'isLoggedIn';

// global GET/SET tools for sensitive info
export const setAccessToken = (token) => {
  setItem(ACCESSTOKEN, token);
};
export const setComCode = (comCode) => {
  setItem(COMCODE, comCode);
};
export const setTeacherId = (teacherId) => {
  setItem(TEACHERID, teacherId);
};
export const setRole = (role) => {
  setItem(ROLE, role);
};
export const setTeacherName = (teacherName) => {
  setItem(TEACHERNAME, teacherName);
};
export const setTelephone = (telephone) => {
  setItem(TELEPHONE, telephone);
};
export const setTokenSavedTime = (dataTime) => {
  const tmpTime = dataTime.toString();
  setItem(TOKENSAVEDTIME, tmpTime);
};
export const setIsLoggedIn = (value) => {
  setItem(ISLOGGEDIN, value);
};
// ///GET/////////////////////////////////////////
export const getAccessToken = () => getItem(ACCESSTOKEN);
export const getRole = () => getItem(ROLE);
export const getComCode = () => getItem(COMCODE);
export const getTeacherId = () => getItem(TEACHERID);
export const getTeacherName = () => getItem(TEACHERNAME);
export const getTelephone = () => getItem(TELEPHONE);
export const getTokenSavedTime = () => {
  const value = getItem(TOKENSAVEDTIME);
  return Number(value);
};
export const getIsLoggedIn = () => getItem(ISLOGGEDIN);
// ///////DELETE///////////////////////////////////
export const deleteAccessToken = () => removeItem(ACCESSTOKEN);
export const deleteComCode = () => removeItem(COMCODE);
export const deleteRole = () => removeItem(ROLE);
export const deleteTeacherId = () => removeItem(TEACHERID);
export const deleteTeacherName = () => removeItem(TEACHERNAME);
export const deleteTelephone = () => removeItem(TELEPHONE);
export const deleteTokenSavedTime = () => removeItem(TOKENSAVEDTIME);
export const deleteIsLoggedIn = () => removeItem(ISLOGGEDIN);

/**
 * save sensitive data to local
 */
export const saveInfoToLocal = (
  token,
  comCode,
  teacherId,
  role,
  teacherName,
  telephone,
  tokenSavedTime,
  isLoggedIn
) => {
  setItem(ACCESSTOKEN, token);
  setItem(COMCODE, comCode);
  setItem(TEACHERID, teacherId);
  setItem(ROLE, role);
  setItem(TEACHERNAME, teacherName);
  setItem(TELEPHONE, telephone);
  setItem(TOKENSAVEDTIME, tokenSavedTime);
  setItem(ISLOGGEDIN, isLoggedIn);
};
/**
 * logout function
 */
export const deleteInfofromLocal = () => {
  // serialize the deleting operations
  removeItem(ACCESSTOKEN);
  // const refreshTokenP = SInfo.deleteItem(REFRESHTOKEN);
  removeItem(ROLE);
  removeItem(COMCODE);
  removeItem(TEACHERID);
  removeItem(TEACHERNAME);
  removeItem(TELEPHONE);
  removeItem(TOKENSAVEDTIME);
  removeItem(ISLOGGEDIN);
};

const instance = Axios.create({
  baseURL: 'http://localhost:3000/', // 'https://jizhangapi.shanshankangfu.com/',
  timeout: 30000
});

const setAccessTokenToHTTP = () => {
  const token = getItem(ACCESSTOKEN);
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return instance;
};

// using operation flow:
// 1. check network is connected
// 2. set token to HTTP Header
// 3. do http action etc(post/get/put).
export const http = {
  get: (url, config) => {
    // 1. check accesstoken is valid 2. add the latest token to http header
    setAccessTokenToHTTP();
    return instance.get(url, config);
  },
  post: (url, data, config) => {
    setAccessTokenToHTTP();
    return instance.post(url, data, config);
  },
  put: (url, data, config) => {
    setAccessTokenToHTTP();
    return instance.put(url, data, config);
  },
  delete: (url, config) => {
    setAccessTokenToHTTP();
    return instance.delete(url, config);
  }
};

export const formatDateTime = (dateObj) => {
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth() + 1;
  const d = dateObj.getDate();
  return `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d} ${dateObj
    .toTimeString()
    .substr(0, 8)}`;
};

export const formatDate = (dateObj) => {
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth() + 1;
  const d = dateObj.getDate();
  return `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`;
};

export const isNumeric = (value) => !Number.isNaN(parseFloat(value)) && Number.isFinite(value);

export const isNull = (value) => !value && typeof value !== 'undefined' && value !== 0;

export const isNumOrAlpha = (value) => {
  const Regx = /^[A-Za-z0-9]*$/;
  if (Regx.test(value)) {
    return true;
  }
  return false;
};
export const isChineseChr = (value) => /^[\u4e00-\u9fa5]+$/i.test(value);
export const isNumOrAlphaOrChineseChr = (value) => /^[a-zA-Z0-9\u4e00-\u9fa5]+$/i.test(value);
export const getRandomColor = (key) => {
  const colors = [
    'firebrick',
    'firebrick',
    'darksalmon',
    'crimson',
    'cornflowerblue',
    'blueviolet',
    'cadetblue',
    'darkcyan',
    'darkviolet',
    'lightseagreen',
    'mediumorchid'
  ];
  if (key) {
    if (typeof key !== 'string') {
      return;
    }
    // eslint-disable-next-line consistent-return
    return colors[key.length % 11];
  }
  const max = colors.length - 1;
  const min = 0;
  const rand = Math.floor(Math.random() * (max - min + 1)) + min;
  // eslint-disable-next-line consistent-return
  return colors[rand];
};
