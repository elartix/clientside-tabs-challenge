import qs from 'qs';

export const getQueryStringValue = ( key: string | number, queryString = window.location.search ) => {
  const values = qs.parse(queryString, { ignoreQueryPrefix: true });
  return values[key];
};

export const setQueryStringWithoutPageReload = (qsValue: string | number) => {
  const newUrl = window.location.protocol + '//' +
  window.location.host +
  window.location.pathname +
  qsValue;

  // @ts-ignore
  window.history.pushState({}, '', newUrl);
};

export const setQueryStringValue = (key: any, value: any, queryString = window.location.search ) => {
  const values = qs.parse(queryString, { ignoreQueryPrefix: true });
  const newQsValue = qs.stringify({ ...values, [key]: value }, { addQueryPrefix: true});
  setQueryStringWithoutPageReload(`${newQsValue}`);
};
