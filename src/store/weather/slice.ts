import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Address } from '@models/Address';
import { Weather } from '@models/Weather';

import { GetCurrentWeather } from '@services/dtos/GetCurrentWeather';
import { StatusState, ServiceStatus } from '@store/types';
import { ReverseGeocoding } from '@services/dtos/ReverseGeocoding';

interface WeatherState {
  address: Address | undefined;
  weather: Weather | undefined;
  status: ServiceStatus[];
}

const initialState: WeatherState = {
  address: undefined,
  weather: undefined,
  status: [
    {
      name: 'GET_CURRENT_WEATHER',
      state: StatusState.Idle,
      failure: undefined,
    },
    {
      name: 'REVERSE_GEOCODING',
      state: StatusState.Idle,
      failure: undefined,
    },
  ],
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    //weather/RESET_STATUS
    resetStatus(state, action: PayloadAction<string>) {
      state.status = [
        ...state.status.filter(item => item.name !== action.payload),
        {
          name: action.payload,
          state: StatusState.Idle,
          failure: undefined,
        },
      ];
      return state;
    },

    // weather/GET_CURRENT_WEATHER
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getCurrentWeather(state, action: PayloadAction<GetCurrentWeather>) {
      state.status = [
        ...state.status.filter(item => item.name !== 'GET_CURRENT_WEATHER'),
        {
          name: 'GET_CURRENT_WEATHER',
          state: StatusState.Pending,
          failure: undefined,
        },
      ];
      return state;
    },
    getCurrentWeatherSuccess(state, action: PayloadAction<Weather>) {
      state.weather = action.payload;
      state.status = [
        ...state.status.filter(item => item.name !== 'GET_CURRENT_WEATHER'),
        {
          name: 'GET_CURRENT_WEATHER',
          state: StatusState.Succeeded,
          failure: undefined,
        },
      ];
      return state;
    },
    getCurrentWeatherFailed(state, action: PayloadAction<{ message: string }>) {
      state.status = [
        ...state.status.filter(item => item.name !== 'GET_CURRENT_WEATHER'),
        {
          name: 'GET_CURRENT_WEATHER',
          state: StatusState.Failed,
          failure: action.payload.message,
        },
      ];
      return state;
    },

    // weather/REVERSE_GEOCODING
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reverseGeocoding(state, action: PayloadAction<ReverseGeocoding>) {
      state.status = [
        ...state.status.filter(item => item.name !== 'REVERSE_GEOCODING'),
        {
          name: 'REVERSE_GEOCODING',
          state: StatusState.Pending,
          failure: undefined,
        },
      ];
      return state;
    },
    reverseGeocodingSuccess(state, action: PayloadAction<Address>) {
      state.address = action.payload;
      state.status = [
        ...state.status.filter(item => item.name !== 'REVERSE_GEOCODING'),
        {
          name: 'REVERSE_GEOCODING',
          state: StatusState.Succeeded,
          failure: undefined,
        },
      ];
      return state;
    },
    reverseGeocodingFailed(state, action: PayloadAction<{ message: string }>) {
      state.status = [
        ...state.status.filter(item => item.name !== 'REVERSE_GEOCODING'),
        {
          name: 'REVERSE_GEOCODING',
          state: StatusState.Failed,
          failure: action.payload.message,
        },
      ];
      return state;
    },
  },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;
