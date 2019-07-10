import { configs, hasBeenConfigured } from './configure';
import File from '../src/entity/File';

export default file => {
  return new Promise((resolve, reject) => {
    hasBeenConfigured();
    let fileEntity = new File(file);
    return fetch(`${configs.url}/data/${fileEntity.uuid}`, {
      method: 'get',
      headers: {},
    }).then(response => {
      if (response.ok === false) {
        return reject(response);
      }
      response.blob().then(myBlob => {
        fileEntity.data = myBlob;
        resolve(fileEntity.toJson());
      });
    });
  });
};