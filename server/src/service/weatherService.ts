import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}
// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  wind: number;
  humidity: number;

  constructor (temperature: number, wind: number, humidity: number) {
    this.temperature = temperature;
    this.wind = wind;
    this.humidity = humidity;
  }


}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  API_BASE_URL: string;
  API_KEY: string;
  cityName: string;

  constructor (API_BASE_URL: string, cityName: string) {
    this.API_BASE_URL = API_BASE_URL;
    this.API_KEY = process.env.API_Key || '';
    this.cityName = cityName;
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates | null> {
    try {
    const responseFetch = await fetch(`${this.API_BASE_URL}/geo/1.0/direct?q=${query}&appid=${this.API_KEY}`);
    const geoData = await responseFetch.json();

    if (geoData.length > 0) {
      const { lat, lon } = geoData[0];
      return { latitude: lat, longitude: lon };
    } else {
      console.error('City not found');
      return null; 
    } 
  } catch (error) {
    console.error('Error fetching location data', error);
    return null;
  }   
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { latitude, longitude } = locationData;
    return { latitude, longitude };

  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string): string {
    return `${this.API_BASE_URL}/geo/1.0/direct?q=${city}&appid=${this.API_KEY}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.API_BASE_URL}/data/3.0/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&exclude={part}&appid=${this.API_Key}`
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {}
}

export default new WeatherService();
