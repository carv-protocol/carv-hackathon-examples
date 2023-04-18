import { fetchPost } from 'src/utils/fetch';
import { BACKEND_API } from '../login';

type GetUserPresignedUrlResponse = {
  url: string;
  fields: {
    key: string;
    AWSAccessKeyId: string;
    'x-amz-security-token': string;
    policy: string;
    signature: string;
  };
};
export async function uploadFile(file: File, folder?: string): Promise<string> {
  const names = file.name.split('.');
  const body: {
    file_suffix: string;
    folder?: string;
  } = {
    file_suffix: names[names.length - 1],
  };
  if (folder) {
    body.folder = folder;
  }

  const presignedRes = await fetchPost<GetUserPresignedUrlResponse>(
    BACKEND_API + '/users/presigned_url',
    body
  );

  if (presignedRes.code === 0) {
    const presignedUrl = presignedRes.data;
    const fd = new FormData();

    Object.keys(presignedUrl.fields).forEach(k => {
      fd.append(k, (presignedUrl.fields as any)[k]);
    });
    fd.append('file', file);

    const res = await fetch(presignedUrl.url, {
      method: 'POST',
      body: fd,
      mode: 'cors',
    });
    if (!res.ok) {
      throw res;
    }

    if (res.status === 204) {
      return presignedUrl.fields.key;
    }

    return res.json();
  } else {
    return Promise.resolve('');
  }
}
