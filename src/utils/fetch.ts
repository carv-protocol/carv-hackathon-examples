import { toast } from 'react-toastify';

export interface PlainResponse<T> {
  code: -1 | 0;
  data: T;
  msg: string;
  success?: boolean;
}

export function fetchGet<T>(url: string, init?: any): Promise<T | null> {
  return fetch(url, {
    method: 'GET',
    ...init,
  })
    .then(res => res.json())
    .then(
      res =>
        new Promise(resolve => {
          if (res.code !== 0) {
            toast.error(res.msg);
          }
          resolve(res.data);
        })
    );
}

export function fetchPost<T>(
  url: string,
  body: Object
): Promise<PlainResponse<T>> {
  return fetch(url, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
}
