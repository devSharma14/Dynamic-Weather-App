import { AlertTriangle, RefreshCw, MapPin } from "lucide-react"
import { Button } from "../components/ui/button"
import { useGeolocation } from "../hooks/use-geolocation"
import WeatherSkeleton from "../components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "../hooks/use-weather";
import CurrentWeather from "../components/currentWeather";
import HourlyTemperature from "../components/HourlyTemperature";
import WeatherDetails from "../components/WeatherDetails";
import WeatherForecast from "../components/WeatherForecast";


const WeatherPage = () => {
  // creating a custom hook to fetch current location
  const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeolocation();
  // console.log("There you live : ", coordinates);

  const locationQuery = useReverseGeocodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  // console.log("Weather ki query : \n",weatherQuery);
  const forecastQuery = useForecastQuery(coordinates);
  // console.log("forecast ka data : \n", forecastQuery);
  const locationName = locationQuery.data?.[0]?.name;

  // console.log(locationQuery);
  
  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      locationQuery.refetch();
      weatherQuery.refetch();
      forecastQuery.refetch();
    }
  };

  if (locationLoading) {
    return <WeatherSkeleton />
  }

  if (locationError) {
    return <Alert variant={'destructive'}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p> {locationError} </p>
        <Button variant="outline" onClick={getLocation} className="w-fit">
          <MapPin className="mr-2 h-4 w-4" />
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
  }

  if (!coordinates) {
    return <Alert variant={'destructive'}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location required! </AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p> Please enable location access to see your local weather. </p>
        <Button onClick={getLocation}
          variant={"outline"}
          className="w-fit"
        >
        </Button>
      </AlertDescription>
    </Alert>
  }


  if (weatherQuery.error || forecastQuery.error) {
    return <Alert variant={'destructive'}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p> Failed to fetch weather data. Please try again! </p>
        <Button onClick={handleRefresh}
          variant={"outline"}
          className="w-fit"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />
  }

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button variant={'outline'}
          size={'icon'}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""
            }`} />
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">

          {/* current weather & hourly temp. */}
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemperature data={forecastQuery.data} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* details and forecast */}
          <WeatherDetails data = {weatherQuery.data} />
          <WeatherForecast data = {forecastQuery.data} />
        </div>
      </div>

    </div>
  )
}

export default WeatherPage