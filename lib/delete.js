import { configs, hasBeenConfigured } from './configure';
import retrieve from './retrieve';

export default function(uuid, revision = null) {
  return new Promise((resolve, reject) => {
    hasBeenConfigured();

    let baseUrl = configs.url;
    let appendParams = '';

    if (revision !== null) {
      baseUrl = `${configs.url}/revisions`; 
      appendParams = `&rev=${revision}`;
    }

    return fetch(`${baseUrl}?uuid=${uuid}${appendParams}`, {
      method: 'delete',
      headers: {},
    }).then(response => {
      if (response.ok === false) {
        return reject(response);
      }
      return response.json().then(data => {
        resolve(data);
      });
    });
  });
}
