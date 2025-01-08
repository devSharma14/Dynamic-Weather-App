import { useState, useEffect } from "react";
import { Coordinates } from '../src/api/types.ts';

interface GeolocationState {
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;
}

export function useGeolocation() {
    const [locationData, setLocationData] = useState<GeolocationState>({
        coordinates: null,
        error: null,
        isLoading: true,
    });

    const getLocation = () => {
        setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));
        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                error: "Geolocation could not be found",
                isLoading: false,
            });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocationData({
                    coordinates: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    },
                    error: null,
                    isLoading: false,
                });
            },
            (error) => {
                let errorMessage: string;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location permission denied. Please enable location access.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request time out.";
                        break;
                    default:
                        errorMessage = "An unknown error occured.";
                }
                setLocationData({
                    coordinates: null,
                    error: errorMessage,
                    isLoading: false,
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );
    };

    useEffect(() => {
        getLocation();
    }, []); // empty dependency array means that the effect will run only once after the component has been added to the DOM
    return {
        ...locationData,
        getLocation,
    };
}
