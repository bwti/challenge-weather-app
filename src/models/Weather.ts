export interface Weather {
  dt: Date;
  sunrise: Date;
  sunset: Date;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  location: {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
  };
}
