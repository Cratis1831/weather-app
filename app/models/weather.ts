interface Weather {
  coord: Coords;
  weather: MiniData;
  main: MainWeatherData;
  name: string;
}

interface MiniData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainWeatherData {
  temp: number;
  feelsLike: number;
}

interface Coords {
  lon: number;
  lat: number;
}
