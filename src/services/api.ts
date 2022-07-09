import axios from 'axios';
import ENV_CONFIG from 'react-native-config';

import { Logger } from '@utils/logger';

const logger = new Logger('API');

const api = axios.create({
  baseURL: ENV_CONFIG.BASE_URL,
  headers: {
    'Content-type': 'application/json; charset=utf-8',
  },
});

api.defaults.params = {};
api.interceptors.request.use(
  function (config) {
    config.params.appid = ENV_CONFIG.WEATHER_API_KEY;
    config.params.exclude = 'minutely,hourly,daily,alerts';
    config.params.units = 'metric';
    config.params.lang = 'en';
    return config;
  },
  function (err) {
    logger.log('axios param weather api key include failed', err);
    return Promise.reject(err);
  },
);

export default api;
