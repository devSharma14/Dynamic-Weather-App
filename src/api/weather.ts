import { API_CONFIG } from "./config";
import type { WeatherData, ForecastData, GeocodingResponse, Coordinates } from "./types";

export const weatherAPI = {
  createUrl(endpoint: string, params: Record<string, string | number>): string {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  },

  async fetchData<T>(endpoint: string, params: Record<string, string | number>): Promise<T> {
    const url = this.createUrl(endpoint, params); 
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Weather API Error: ${response.status} - ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch data: ${(error as Error).message}`);
    }
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
