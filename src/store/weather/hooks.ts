import { useCallback } from 'react';
import { weatherActions } from './slice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { zonedTimeToUtc } from 'date-fns-tz';

import { GetCurrentWeather } from '@services/dtos/GetCurrentWeather';
import { ReverseGeocoding } from '@services/dtos/ReverseGeocoding';

const useWeatherActions = () => {
  const dispatch = useAppDispatch();

  const getCurrentWeather = useCallback(
    (params: GetCurrentWeather) =>
      dispatch(weatherActions.getCurrentWeather(params)),
    [dispatch],
  );

  const reverseGeocoding = useCallback(
    (params: ReverseGeocoding) =>
      dispatch(weatherActions.reverseGeocoding(params)),
    [dispatch],
  );

  const resetGetCurrentWeatherStatus = useCallback(
    () => dispatch(weatherActions.resetStatus('GET_CURRENT_WEATHER')),
    [dispatch],
  );

  const resetReverseGeocodingStatus = useCallback(
    () => dispatch(weatherActions.resetStatus('REVERSE_GEOCODING')),
    [dispatch],
  );

  return {
    getCurrentWeather,
    reverseGeocoding,

    resetGetCurrentWeatherStatus,
    resetReverseGeocodingStatus,
  };
};

const useWeatherState = () => {
  const weatherStore = useAppSelector(state => state.weatherStore);
  const { address, weather, status } = weatherStore;
  const getCurrentWeatherStatus = status.find(
    item => item.name === 'GET_CURRENT_WEATHER',
  );
  const reverseGeocodingStatus = status.find(
    item => item.name === 'REVERSE_GEOCODING',
  );

  const weatherDateFormatted = weather
    ? zonedTimeToUtc(
        Number(weather.dt) * 1000,
        weather.location.timezone,
      ).toDateString()
    : undefined;

  const weatherTimeFormatted = weather
    ? zonedTimeToUtc(
        Number(weather.dt) * 1000,
        weather.location.timezone,
      ).toLocaleTimeString()
    : undefined;

  return {
    address,
    weather,
    status,
    weatherDateFormatted,
    weatherTimeFormatted,

    getCurrentWeatherStatus,
    reverseGeocodingStatus,
  };
};

export { useWeatherActions, useWeatherState };
