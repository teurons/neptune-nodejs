const axios = require("axios");

const DEFAULT_API_BASE = "https://api.teurons.com/neptune";
const EDGE_API_BASE = "https://edge.teurons.com/neptune";

const defaultAxios = axios.create();
const edgeAxios = axios.create();

defaultAxios.defaults.baseURL = DEFAULT_API_BASE;

defaultAxios.defaults.headers.common = {
  "Content-Type": "application/json",
};

edgeAxios.defaults.baseURL = EDGE_API_BASE;

edgeAxios.defaults.headers.common = {
  "Content-Type": "application/json",
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
};

module.exports = { fire, init, fetchEnvironments };
