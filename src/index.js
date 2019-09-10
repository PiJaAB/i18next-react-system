// @flow

import { type TFunc as _TFunc } from './i18n';
import {
  type BackendMessage as _BackendMessage,
  type JSONVal as _JSONVal,
  type JSONObj as _JSONObj,
} from './transHelpers';

export type TFunc = _TFunc;
export type JSONVal = _JSONVal;
export type JSONObj = _JSONObj;

export { default as i18n } from './i18n';
export { backendT, tParse } from './transHelpers';
export {
  useTranslation,
  WithTranslation,
  Translation,
  Trans,
  I18nextPRovider,
  useSSR,
  withSSR,
} from 'react-i18next';
