import * as request from 'superagent';

export default function apiCall(data, type, url) {
  const contextPath = location.href.split('/')[3];
  const BASE_URL = `http://localhost:5000/api/v1/${url}`;
  // const BASE_URL = `https://ciat-yields.herokuapp.com/api/v1/${url}`;
  return new Promise((resolve, reject) => {
    request[type](BASE_URL)
      .send(data)
      .set('Content-Type','application/json')
      .end((err, res) => {
        if (res) {
          return resolve(res.body);
        }
        return reject(err);
      });
  });
}
