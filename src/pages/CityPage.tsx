import { useParams, useSearchParams } from "react-router-dom";
import WeatherSkeleton from "../components/loading-skeleton";
import { useWeatherQuery, useForecastQuery } from "../hooks/use-weather";
import { Alert, AlertDescription } from "../components/ui/alert";
import CurrentWeather from "../components/currentWeather";
import HourlyTemperature from "../components/HourlyTemperature";
import { AlertTriangle } from "lucide-react";
import WeatherDetails from "../components/WeatherDetails";
import WeatherForecast from "../components/WeatherForecast";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };
  // console.log("coordinates are : ", coordinates);

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  // console.log(weatherQuery);
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    console.log("load hi hora bc");
    return <WeatherSkeleton />;
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityname}, {weatherQuery.data.sys.country}
        </h1>
        {/* <div className="flex gap-2">
          <FavoriteButton
            data={{ ...weatherQuery.data, name: params.cityname }}
          />
        </div> */}
      </div>

      <div className="grid gap-6">
        <CurrentWeather data={weatherQuery.data} />
        <HourlyTemperature data={forecastQuery.data} />
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default CityPage;
