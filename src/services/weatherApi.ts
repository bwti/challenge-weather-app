import api from './api';
import { GetCurrentWeather } from './dtos/GetCurrentWeather';
import { ReverseGeocoding } from './dtos/ReverseGeocoding';

export const getCurrentWeather = async function (params: GetCurrentWeather) {
  const res = await api.get('/data/3.0/onecall', {
    params: params,
  });
  return res;
};

export const reverseGeocoding = async function name(params: ReverseGeocoding) {
  const res = await api.get('/geo/1.0/reverse', {
    params: params,
  });
  return res;
};
