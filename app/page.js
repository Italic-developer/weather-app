"use client"

import { useState , useEffect } from 'react';
import WeatherCard from './WeatherCard';

const page = () => {
  const [inputValue, setInputValue] = useState('');
  const [icon, setIcon] = useState(null);
  const [data, setData] = useState(null);
  const [units, setUnits] = useState('us');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {setInputValue('New York')}, []);

  useEffect(() => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputValue}?unitGroup=${units}&elements=conditions%2Cdescription%2Cfeelslike%2Chumidity%2Cicon%2Cname%2Coffset%2Cprecipprob%2Cpreciptype%2Csevererisk%2Csnow%2Csnowdepth%2CsunriseEpoch%2CsunsetEpoch%2Cuvindex%2Cwindspeed&include=current&key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&contentType=flatjson`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);

        const currentIcon = jsonData?.currentConditions?.icon;
        if (['cloudy-clear', 'cloudy', 'partly-cloudy-day', 'partly-cloudy-night', 'mostly-cloudy'].includes(currentIcon)) {
          setIcon('/cloudy.svg');
        } else if (['sunny-day', 'sunny-clear', 'sunny', 'clear-day', 'clear-night'].includes(currentIcon)) {
          setIcon('/sunny.svg');
        } else if (['rain', 'rainy', 'tstorms', 'thunderstorms', 'snow', 'sleet'].includes(currentIcon)) {
          setIcon('/rainy.svg');
        } else {
          setIcon('/cloudy.svg');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [inputValue, units]);

  return (
    <div className='bg-gradient-to-br from-sky-300 via-stone-400 to-red-600 p-4 '>
      <h1 className='text-center text-2xl font-semibold'>Weather App <sub className='[vertical-align:-0.25em] text-xs'>by <span className='text-red-800 font-black'>Italic <span className='text-black font-black'>Dev</span></span></sub></h1>

      <div className='mt-4 flex justify-center gap-2'>
        <button
          type='button'
          className={`rounded-full px-3 py-1.5 text-sm transition ${units === 'us' ? 'bg-slate-900 text-white' : 'bg-white/20 text-slate-900'}`}
          onClick={() => setUnits('us')}
        >
          US
        </button>
        <button
          type='button'
          className={`rounded-full px-3 py-1.5 text-sm transition ${units === 'metric' ? 'bg-slate-900 text-white' : 'bg-white/20 text-slate-900'}`}
          onClick={() => setUnits('metric')}
        >
          Metric
        </button>
      </div>

      <div className='glassbg p-2 md:mx-auto md:w-1/2 mt-4 flex flex-col md:flex-row items-center justify-center gap-4'>
        <label className='p-4 text-lg' htmlFor='location'>Location:</label>
        <input
          id='location'
          className='outline-none w-full md:w-1/2 p-2 rounded-lg bg-slate-300'
          onChange={handleInputChange}
          value={inputValue}
        />
      </div>

      <div className='glassbg flex flex-col items-center h-auto p-2 md:mx-auto md:w-1/2 mt-4'>
        <WeatherCard data={data} icon={icon} units={units} />
      </div>
    </div>
  );
};

export default page
