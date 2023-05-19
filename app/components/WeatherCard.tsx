import Image from "next/image";
import React from "react";
import MapChart from "./Map";

interface WeatherCardProps {
  weather: Weather;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-4xl flex">
        <div className="">
          <div className="rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-5 mx-auto">
            <div className="flex flex-col items-center justify-center w-full">
              <h1 className="text-4xl font-bold text-gray-800">
                {weather.main.temp.toFixed()}&#8451;
              </h1>
              <div>
                <h4 className="text-md font-semibold text-gray-800">
                  <Image
                    src={`https://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`}
                    alt="weather icon"
                    height={100}
                    width={100}
                  />
                  {weather.weather.description}
                  <br />
                  Feels like: {weather.main.feelsLike.toFixed()}&#8451;
                </h4>
              </div>
            </div>
          </div>
        </div>
        <MapChart
          markerOffset={-15}
          name={weather.name}
          coordinates={[weather.coord.lon, weather.coord.lat]}
        />
      </div>
    </div>
  );
};

export default WeatherCard;
