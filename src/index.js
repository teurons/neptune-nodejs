const axios = require("axios");

const DEFAULT_API_BASE = "https://api.teurons.com/neptune";
const EDGE_API_BASE = "https://edge.teurons.com/neptune";

const defaultAxios = axios.create();
const edgeAxios = axios.create();
const usersAxios = axios.create();

defaultAxios.defaults.baseURL = DEFAULT_API_BASE;

defaultAxios.defaults.headers.common = {
  "Content-Type": "application/json",
};

edgeAxios.defaults.baseURL = EDGE_API_BASE;

edgeAxios.defaults.headers.common = {
  "Content-Type": "application/json",
};

usersAxios.defaults.baseURL = DEFAULT_API_BASE;

usersAxios.defaults.headers.common = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEPTUNE_TOKEN}`,
};

const envSet = () => {
  if (process.env.NEPTUNE_ENV && process.env.NEPTUNE_TOKEN) {
    return true;
  }
  return false;
};

const init = (env, token) => {
  process.env.NEPTUNE_ENV = env;
  process.env.NEPTUNE_TOKEN = token;
};

const fetchEnvironments = () => {
  return new Promise((resolve, reject) => {
    let uri = `/environments`;

    defaultAxios
      .get(uri, {
        headers: {
          Authorization: `Bearer ${process.env.NEPTUNE_TOKEN}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((errors) => {
        reject(errors);
      });
  });
};

const fire = (eventType, data, payload) => {
  let isEnvSet = envSet();
  if (isEnvSet) {
    let finalPayload = {
      event_type: eventType,
      environment: process.env.NEPTUNE_ENV,
      api_token: process.env.NEPTUNE_TOKEN,
      version: "1",
      data: data,
    };

    finalPayload = { ...payload, ...finalPayload };

    return new Promise((resolve, reject) => {
      let uri = `/events/ingest`;

      edgeAxios
        .post(uri, finalPayload)
        .then((response) => {
          resolve(response);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  }
};

const createUser = (payload) => {
  let isEnvSet = envSet();
  if (isEnvSet) {
    return new Promise((resolve, reject) => {
      let uri = `/${process.env.NEPTUNE_ENV}/users`;

      usersAxios
        .post(uri, payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  }
};

const getUser = (user_id) => {
  let isEnvSet = envSet();
  if (isEnvSet) {
    return new Promise((resolve, reject) => {
      let uri = `/${process.env.NEPTUNE_ENV}/users/${user_id}?includes=contact_infos`;

      usersAxios
        .get(uri)
        .then((response) => {
          resolve(response.data);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  }
};

const getAllUsers = () => {
  let isEnvSet = envSet();
  if (isEnvSet) {
    return new Promise((resolve, reject) => {
      let uri = `/${process.env.NEPTUNE_ENV}/users`;

      usersAxios
        .get(uri)
        .then((response) => {
          resolve(response.data);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  }
};

const updateUser = (user_id, payload) => {
  let isEnvSet = envSet();
  if (isEnvSet) {
    return new Promise((resolve, reject) => {
      let uri = `/${process.env.NEPTUNE_ENV}/users/${user_id}`;

      usersAxios
        .put(uri, payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  }
};

const deleteUser = (user_id) => {
  let isEnvSet = envSet();
  if (isEnvSet) {
    return new Promise((resolve, reject) => {
      let uri = `/${process.env.NEPTUNE_ENV}/users/${user_id}`;

      usersAxios
        .delete(uri)
        .then((response) => {
          resolve(response.data);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  }
};

const addUserContactInfo = (user_id, payload) => {
  let isEnvSet = envSet();
  if (isEnvSet) {
    return new Promise((resolve, reject) => {
      let uri = `/${process.env.NEPTUNE_ENV}/users/${user_id}/contacts_info`;

      usersAxios
        .post(uri, payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  }
};

const updateUserContactInfo = (user_id, payload) => {
  let isEnvSet = envSet();
  if (isEnvSet) {
    return new Promise((resolve, reject) => {
      let uri = `/${process.env.NEPTUNE_ENV}/users/${user_id}/contacts_info`;

      usersAxios
        .put(uri, payload)
        .then((response) => {
          resolve(response.data);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  }
};

const deleteUserContactInfo = (user_id, payload) => {
  let isEnvSet = envSet();
  if (isEnvSet) {
    return new Promise((resolve, reject) => {
      let uri = `/${process.env.NEPTUNE_ENV}/users/${user_id}/contacts_info`;

      usersAxios
        .delete(uri, { data: payload })
        .then((response) => {
          resolve(response.data);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  }
};

module.exports = {
  fire,
  init,
  fetchEnvironments,
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addUserContactInfo,
  updateUserContactInfo,
  deleteUserContactInfo,
};
