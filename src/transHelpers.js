// @flow

import { type TFunction } from 'i18next';

// eslint-disable-next-line no-use-before-define
export type JSONVal = JSONObj | number | string | boolean | null | void;
export type JSONObj = {[ key: string ]: JSONVal};

const parsers: {[key: string]: (data: JSONObj, t: TFunction, namespace?: string) => string} = {
  dateTime(data: JSONObj): string {
    const { val } = data;
    const date = new Date(Number(val));

    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}`;
  },
  trans(data: JSONObj, t: TFunction, namespace?: string): string {
    const { params, key } = data;
    if (typeof key !== 'string') {
      throw new Error('Invalid key');
    }
    if (typeof params !== 'undefined' && (typeof params !== 'object' || params === null)) {
      throw new Error('Invalid params');
    }
    // eslint-disable-next-line no-use-before-define
    return tParse(t, key, params, namespace);
  },
};

function parse(t: TFunction, data: JSONObj, namespace?: string): string {
  if (!data || typeof data !== 'object') throw new Error('Invalid data');
  const { parser } = data;
  if (typeof parser !== 'string') throw new Error('Invalid parser type');
  if (Object.keys(parsers).includes(parser)) {
    return parsers[parser](data, t, namespace);
  }
  throw new Error(`Unknown parser: ${parser}`);
}

function tParse(t: TFunction, key: string, params?: JSONObj, namespace?: string): string {
  const parsedParams = {};
  const localParams = params;
  if (localParams) {
    Object.keys(localParams).forEach((param) => {
      const val: JSONVal = localParams[param];
      if (val === null || typeof val !== 'object') {
        parsedParams[param] = val;
        return;
      }
      parsedParams[param] = parse(t, val, namespace);
    });
  }
  if (!namespace) return t(key, parsedParams);
  const namespacedKey = key.includes(':') ? key : `${namespace}:${key}`;
  return t(namespacedKey, parsedParams);
}

function backendT(
  t: TFunction,
  _message: string | { message: string, trans?: { key: string, params?: JSONObj }},
  _trans?: {
    key: string,
    params?: JSONObj,
  },
  log?: boolean | (str: string) => void,
): string {
  let trans = _trans;
  let message = _message;
  if (typeof message === 'object') {
    ({ trans } = message);
    ({ message } = message);
  }
  if (!trans) {
    return message;
  }
  const { key, params } = trans;

  try {
    return tParse(t, key, params, 'backend');
  } catch (err) {
    if (log && typeof log === 'function') {
      log(err);
    } else if (log) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
    return message;
  }
}

export {
  backendT,
  tParse,
};

export type BackendMessage = {
    message: string,
    trans?: {
        key: string,
        params: {
            [key: string]: string | {
                parser: string,
                value: JSONVal,
            },
        },
    },
};
