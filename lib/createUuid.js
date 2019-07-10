import { configs, hasBeenConfigured } from './configure';

export default category => {
  return new Promise((resolve, reject) => {
    hasBeenConfigured();
  
    return fetch(`${configs.url}/uuid?category=${category}`, {
      method: 'post',
      headers: {'content-type': 'application/x-www-urlencoded'},
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
