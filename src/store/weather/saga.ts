import { all, call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { weatherActions } from './slice';
import { Address } from '@models/Address';
import { Weather } from '@models/Weather';
import { GetCurrentWeather } from '@services/dtos/GetCurrentWeather';
import { ReverseGeocoding } from '@services/dtos/ReverseGeocoding';
import * as weatherApi from '@services/weatherApi';

import { Logger } from '@utils/logger';

const logger = new Logger('WeatherSaga');

function* watchWeatherGetCurrentWeather(
  action: PayloadAction<GetCurrentWeather>,
) {
  try {
    const res: AxiosResponse = yield call(
      weatherApi.getCurrentWeather,
      action.payload,
    );

    const weather: Weather = {
      ...res.data?.current,
      location: {
        lat: res.data?.lat,
        lon: res.data?.lon,
        timezone: res.data?.timezone,
        timezone_offset: res.data?.timezone_offset,
      },
    };

    yield put({
      type: weatherActions.getCurrentWeatherSuccess.type,
      payload: weather,
    });
  } catch (err) {
    logger.log('get current weather saga error', err);

    yield put({
      type: weatherActions.getCurrentWeatherFailed.type,
      payload: (err as AxiosError).response?.data,
    });
  }
}

function* watchWeatherReverseGeocoding(
  action: PayloadAction<ReverseGeocoding>,
) {
  try {
    const res: AxiosResponse = yield call(
      weatherApi.reverseGeocoding,
      action.payload,
    );

    const address: Address = {
      street: '',
      city: res.data[0]?.name,
      state: res.data[0]?.state,
      country: res.data[0]?.country,
      postalCode: '',
      lat: res.data[0]?.lat,
      lon: res.data[0]?.lon,
    };

    logger.log({ address });

    yield put({
      type: weatherActions.reverseGeocodingSuccess.type,
      payload: address,
    });
  } catch (err) {
    logger.log('reverse geocoding saga error', err);

    yield put({
      type: weatherActions.reverseGeocodingFailed.type,
      payload: (err as AxiosError).response?.data,
    });
  }
}

export const weatherSagas = all([
  takeLatest(
    weatherActions.getCurrentWeather.type,
    watchWeatherGetCurrentWeather,
  ),
  takeLatest(
    weatherActions.reverseGeocoding.type,
    watchWeatherReverseGeocoding,
  ),
]);
