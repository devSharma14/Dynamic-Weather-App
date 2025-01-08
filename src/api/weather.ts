import { API_CONFIG } from "./config";
import type { WeatherData, ForecastData, GeocodingResponse, Coordinates } from "./types";

export const weatherAPI = {
  async fetchData<T>(endpoint: string, params: Record<string, string | number>): Promise<T> {
    const url = new URL(endpoint);
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });
    
    url.search = searchParams.toString();
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`Weather API Error: ${response.statusText}`);
    return response.json();
  },

  async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    return this.fetchData<WeatherData>(`${API_CONFIG.BASE_URL}/weather`, {
      lat,
      lon,
      units: "metric",
    });
  },

  async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    return this.fetchData<ForecastData>(`${API_CONFIG.BASE_URL}/forecast`, {
      lat,
      lon,
      units: "metric",
    });
  },

  // Reverse geocoding is the process of converting geographic coordinates (latitude and longitude) into a human-readable address or location name.
  async reverseGeocode({ lat, lon }: Coordinates): Promise<GeocodingResponse[]> {
    return this.fetchData<GeocodingResponse[]>(`${API_CONFIG.GEO}/reverse`, {
      lat,
      lon,
      limit: 1,
    });
  },

  async searchLocations(query: string): Promise<GeocodingResponse[]> {
    return this.fetchData<GeocodingResponse[]>(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: 5,
    });
  },
};
