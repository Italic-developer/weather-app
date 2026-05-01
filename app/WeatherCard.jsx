export default function WeatherCard({ data, icon, units = 'us' }) {
  const current = data?.currentConditions;
  const description = current?.conditions || current?.description || data?.description || 'N/A';
  const precipProb = current?.precipprob ?? 0;
  const precipType = current?.preciptype || 'precipitation';
  const humidity = current?.humidity;
  const feelsLike = current?.feelslike;
  const windSpeed = current?.windspeed;
  const uvIndex = current?.uvindex;
  const snow = current?.snow;
  const snowDepth = current?.snowdepth;
  const tempUnit = units === 'us' ? '°F' : '°C';
  const windUnit = units === 'us' ? 'mph' : 'kph';
  const snowUnit = units === 'us' ? 'in' : 'cm';

  const uvAdvice = (index) => {
    if (index == null) return 'UV advice unavailable.';
    if (index <= 2) return 'Low UV — still nice, but sunscreen never hurts.';
    if (index <= 5) return 'Moderate UV — you might want sunscreen if you stay outside.';
    if (index <= 7) return 'High UV — definitely use sunscreen and wear a hat.';
    if (index <= 10) return 'Very high UV — sunglasses, sunscreen, and shade are a great idea.';
    return 'Extreme UV — sunscreen, hat, and indoors are the smart move.';
  };

  const formatTime = (epoch) => {
    if (!epoch) return 'N/A';
    return new Date(epoch * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className='w-full rounded-3xl glassbg border border-white/20 p-6 shadow-2xl text-slate-900'>
      <div className='flex flex-col items-center gap-4'>
        {icon && <img className='w-28 h-28 object-contain' src={icon} alt='weather icon' />}
        <div className='text-center'>
          <h2 className='font-semibold text-xl mb-2'>Current status</h2>
          <p className='text-4xl font-bold'>{description}</p>
        </div>
      </div>

      <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='rounded-2xl bg-white/20 backdrop-blur-sm border border-white/10 p-4'>
          <p className='font-semibold'>Feels like</p>
          <p>{feelsLike != null ? `${feelsLike.toFixed(1)}${tempUnit}` : 'N/A'}</p>
        </div>
        <div className='rounded-2xl bg-white/20 backdrop-blur-sm border border-white/10 p-4'>
          <p className='font-semibold'>Humidity</p>
          <p>{humidity != null ? `${humidity.toFixed(0)}%` : 'N/A'}</p>
        </div>
        <div className='rounded-2xl bg-white/20 backdrop-blur-sm border border-white/10 p-4'>
          <p className='font-semibold'>Wind speed</p>
          <p>{windSpeed != null ? `${windSpeed.toFixed(1)} ${windUnit}` : 'N/A'}</p>
        </div>
        <div className='rounded-2xl bg-white/20 backdrop-blur-sm border border-white/10 p-4'>
          <p className='font-semibold'>UV index</p>
          <p>{uvIndex != null ? uvIndex : 'N/A'}</p>
          <p className='mt-2 text-sm text-slate-600'>{uvAdvice(uvIndex)}</p>
        </div>
      </div>

      <div className='mt-6 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/10 p-4'>
        <p className='font-semibold'>Precipitation</p>
        <p>
          {precipProb > 0
            ? `There is a ${precipProb}% chance of ${precipType}.`
            : 'No precipitation expected.'}
        </p>
        {snow > 0 && (
          <p className='mt-2'>Snow: {snow} {snowUnit}, depth {snowDepth ?? 0} {snowUnit}</p>
        )}
      </div>

      <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='rounded-2xl bg-white/20 backdrop-blur-sm border border-white/10 p-4'>
          <p className='font-semibold'>Sunrise</p>
          <p>{formatTime(current?.sunriseEpoch)}</p>
        </div>
        <div className='rounded-2xl bg-white/20 backdrop-blur-sm border border-white/10 p-4'>
          <p className='font-semibold'>Sunset</p>
          <p>{formatTime(current?.sunsetEpoch)}</p>
        </div>
      </div>
    </div>
  );
}
