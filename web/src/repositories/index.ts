import axios from 'axios';

// Token
export const Token = {
  req: axios.create({
    baseURL: 'http://localhost:3000/api/v1/tokens',
  }),
  create: (params: any) => {
    return new Promise((resolve, reject) => {
      Token.req.post('/', params).then(({data}) => {
        resolve(data);
      }).catch((err: any) => reject(err));
    });
  },
};

// User
export const User = {
  req: axios.create({
    baseURL: 'http://localhost:3000/api/v1/users',
  }),
  find: (options: IRequestOptions) => {
    return new Promise((resolve, reject) => {
      User.req.get('/current', {
        headers: {Authorization: `Bearer ${options.accessToken}`},
      }).then(({data}) => {
        resolve(data);
      }).catch((err: any) => reject(err));
    });
  },
  update: (params: any, options: IRequestOptions) => {
    return new Promise((resolve, reject) => {
      User.req.put('/current', params, {
        headers: {Authorization: `Bearer ${options.accessToken}`},
      }).then(({data}) => {
        resolve(data);
      }).catch((err: any) => reject(err));
    });
  },
};

// Task
export const Task = {
  req: axios.create({
    baseURL: 'http://localhost:3000/api/v1/tasks',
  }),
  fetch: (options: IRequestOptions) => {
    return new Promise((resolve, reject) => {
      Task.req.get('/', {
        headers: {Authorization: `Bearer ${options.accessToken}`},
      }).then(({data}) => {
        resolve(data);
      }).catch((err: any) => reject(err));
    });
  },
  create: (params: {content: string; labelId: number; }, options: IRequestOptions) => {
    return new Promise((resolve, reject) => {
      Task.req.post('/', params, {
        headers: {Authorization: `Bearer ${options.accessToken}`},
      }).then((res: any) => {
        resolve(res.data);
      }).catch((err: any) => reject(err));
    });
  },
};

// Label
export const Label = {
  req: axios.create({
    baseURL: 'http://localhost:3000/api/v1/labels',
  }),
  fetch: (options: IRequestOptions) => {
    return new Promise((resolve, reject) => {
      Label.req.get('/', {
        headers: {Authorization: `Bearer ${options.accessToken}`},
      }).then(({data}) => {
        resolve(data);
      }).catch((err: any) => reject(err));
    });
  },
  fetchSharedLabel: (options: IRequestOptions) => {
    return new Promise((resolve, reject) => {
      Label.req.get('/', {
        headers: {Authorization: `Bearer ${options.accessToken}`},
        params: {shared: true}
      }).then(({data}) => {
        resolve(data);
      }).catch((err: any) => reject(err));
    });
  },
  create: (params: {name: string; }, options: IRequestOptions) => {
    return new Promise((resolve, reject) => {
      Label.req.post('/', params, {
        headers: {Authorization: `Bearer ${options.accessToken}`},
      }).then((res: any) => {
        resolve(res.data);
      }).catch((err: any) => reject(err));
    });
  },
};
