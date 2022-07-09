import React, { useCallback, useEffect, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import ENV_CONFIG from 'react-native-config';

import { Images } from '@assets/images';
import { SyncButton } from '@components/SyncButton';
import * as S from './styles';

import { useWeatherActions, useWeatherState } from '@store/weather/hooks';
import { geolocation } from '@utils/geolocation';
import { Logger } from '@utils/logger';
import { StatusState } from '@store/types';

const logger = new Logger('Home');

export const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState<ImageSourcePropType>();
  const [addressWeather, setAddressWeather] = useState<string>();

  const weatherActions = useWeatherActions();
  const {
    address,
    weather,
    weatherDateFormatted,
    weatherTimeFormatted,
    status,
    getCurrentWeatherStatus,
    reverseGeocodingStatus,
  } = useWeatherState();

  const syncWeatherHandle = useCallback(() => {
    async function getLocation() {
      geolocation
        .getLocation()
        .then(location => {
          weatherActions.getCurrentWeather({
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          });
          weatherActions.reverseGeocoding({
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          });
        })
        .catch(err => logger.log('geolocation error:', err));
    }
    getLocation();
  }, [weatherActions]);

  useEffect(() => {
    async function permissionGrant() {
      const permissionGranted = await geolocation.requestPermission();
      logger.log('Permission to access device location:', permissionGranted);
    }
    permissionGrant();
    syncWeatherHandle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const main = weather?.weather[0].main;
    const day = weather?.weather[0].icon?.slice(-1) === 'd';

    setAddressWeather(
      `${address?.street}\n${address?.city} - ${address?.state} - ${address?.country}`,
    );

    switch (main) {
      case 'Clear':
        setBackgroundImage(day ? Images.MorningClear : Images.NightClear);
        break;
      case 'Clouds':
        setBackgroundImage(day ? Images.MorningClouds : Images.NightClouds);
        break;
      case 'Drizzle':
      case 'Rain':
      case 'Thunderstorm':
        setBackgroundImage(
          day
            ? Images.MorningThunderstormDrizzleRain
            : Images.NightThunderstormDrizzleRain,
        );
        break;
      case 'Snow':
        setBackgroundImage(day ? Images.MorningSnow : Images.NightSnow);
        break;
      default:
        setBackgroundImage(
          day ? Images.MorningAtmosphere : Images.NightAtmosphere,
        );
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <S.Background source={backgroundImage}>
      <S.Container>
        <S.Header>
          <S.HeaderRow>
            <S.TextTitle>{`${Math.trunc(
              Number(weather?.temp),
            )}°C`}</S.TextTitle>
            <S.IconWeather
              source={{
                uri: `${ENV_CONFIG.BASE_IMAGE_URL}/${weather?.weather[0].icon}@2x.png`,
              }}
            />
          </S.HeaderRow>
          <S.TextSubtitle>{weather?.weather[0].description}</S.TextSubtitle>
          <S.Text>{weatherDateFormatted}</S.Text>
          <S.Text>{weatherTimeFormatted}</S.Text>
          <S.TextGroup>
            <S.Text>{`${weather?.humidity}% humidity`}</S.Text>
            <S.HeaderRow>
              <S.Text>{`Wind ${weather?.wind_speed} m/s`}</S.Text>
              <S.Text>{`${weather?.uvi} UVI`}</S.Text>
            </S.HeaderRow>
          </S.TextGroup>
        </S.Header>
        <SyncButton
          loading={
            getCurrentWeatherStatus?.state === StatusState.Pending ||
            reverseGeocodingStatus?.state === StatusState.Pending
          }
          onPress={syncWeatherHandle}
        />
        <S.Text>{`${addressWeather}\nwilliam.santos@bwti.net.br`}</S.Text>
      </S.Container>
    </S.Background>
  );
};
