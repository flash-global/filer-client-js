import { configs, hasBeenConfigured } from './configure';
import File from '../src/entity/File';

export default uuid => {
  return new Promise((resolve, reject) => {
    hasBeenConfigured();
  
    return fetch(`${configs.url}?uuid=${uuid}`, {
      method: 'get',
      headers: {},
    }).then(response => {
      if (response.ok === false) {
        return reject(response);
      }
      return response.json().then(data => {
        resolve(new File(data.data).toJson());
      });
    });
  });
}
