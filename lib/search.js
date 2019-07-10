import { configs, hasBeenConfigured } from './configure';
import File from '../src/entity/File';

export default (criterias = {}) => {
  return new Promise((resolve, reject) => {
    hasBeenConfigured();
  
    return fetch(`${configs.url}?criterias=${JSON.stringify(criterias)}`, {
      method: 'get',
      headers: {},
    }).then(response => {
      if (response.ok === false) {
        return reject(response);
      }

      let fileArray = [];

      return response.json().then(data => {
        data.files.map(file => {
          fileArray.push(new File(file).toJson());
        });
        resolve(fileArray);
      });
    });
  });
}
