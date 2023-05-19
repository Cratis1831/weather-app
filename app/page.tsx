"use client";
import Image from "next/image";
import { Suspense, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import WeatherCard from "./components/WeatherCard";
import Loading from "./loading";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const { toast } = useToast();
  const [searchCity, setSearchCity] = useState("");
  const [weather, setWeather] = useState<Weather>();
  const cities: City[] = [];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!searchCity) {
      toast({
        title: "Missing city name.",
        description: "Please enter a city",
      });
      return;
    }
    fetchGeoCode();
  };

  const fetchGeoCode = async () => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`;
    try {
      const res = await fetch(url, { method: "GET", next: { revalidate: 10 } });
      if (!res.ok) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        throw new Error("There was a problem with your request.");
      }

      const data = await res.json();
      cities.push(...data);
      fetchWeather(cities[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWeather = async (city: City) => {
    if (!city) {
      toast({
        title: "Uh oh!.",
        description: "Unable to find the city.",
      });
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${city.lat}&lon=${city.lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`;
    try {
      const res = await fetch(url, { method: "GET", next: { revalidate: 10 } });
      if (!res.ok) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        throw new Error("There was a problem with your request.");
      }
      const data = await res.json();

      const weather: Weather = {
        name: data.name,
        coord: {
          lon: data.coord.lon,
          lat: data.coord.lat,
        },
        main: {
          temp: data.main.temp,
          feelsLike: data.main.feels_like,
        },
        weather: {
          id: data.weather[0].id,
          description: data.weather[0].description,
          main: data.weather[0].main,
          icon: data.weather[0].icon,
        },
      };
      setWeather(weather);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <div className="relative w-full h-screen">
        <Image
          priority
          src="https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=100"
          alt="background image"
          fill
          className="object-cover"
        />
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/40 z-[1]" />
        <div className="relative z-10 px-4">
          <div className="flex justify-center">
            <div className="max-w-2xl w-full">
              <h1 className="mt-20 text-6xl font-bold text-white self-start">
                Weather API
              </h1>
              <h4 className="text-md font-semibold text-white">
                Powered by Next.js + Tailwind CSS + TypeScript + Open Weather
                API
              </h4>
            </div>
          </div>
          <div className="mx-5 mt-10" />

          {/* Search Bar */}
          <div className="flex justify-center">
            <form className="max-w-2xl w-full" onSubmit={handleSubmit}>
              <div className="flex items-center border-2 border-gray-300 bg-white h-16 px-5 rounded-lg text-lg">
                <input
                  className="w-full focus:outline-none"
                  type="text"
                  placeholder="Search for any city..."
                  onChange={(e) => setSearchCity(e.target.value)}
                />
                <MagnifyingGlassIcon
                  className="text-gray-500 w-7 h-7 cursor-pointer"
                  onClick={handleSubmit}
                />
              </div>
            </form>
          </div>
          {/* Weather Card */}
          <Suspense fallback={<Loading />}>
            {weather && <WeatherCard weather={weather} />}
          </Suspense>
        </div>
      </div>
    </main>
  );
}
