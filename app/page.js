"use client"

import { useState ,  useEffect } from 'react';
const page =  () => {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  
    const [icon, setIcon] = useState(null)
    const [data , setData] = useState(null)
     
    useEffect(() => {
	
	const response =  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputValue}?unitGroup=us&key=5AWCSVFRYKEF58LU6SR9BT3KH&contentType=json`)
  .then((response) => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);

        if (data.days[0].icon ===  'cloudy-clear' || 'cloudy') {
          setIcon('/cloudy.svg')
        } else if (data.days[0].icon === 'sunny-day'  || 'sunny-clear' || 'sunny' || "clear-day"){
         setIcon('/sunny.svg')
        }else{
          setIcon('/rainy.svg')
        }
      })
      .catch((error) => {
        console.error(error);
      });
      
      

        


  } , [inputValue]);
  

    console.log(data)
      


  return (
    <div className='bg-gradient-to-br from-sky-300 via-stone-400 to-red-600  p-4 h-[1048px]'>
      <h1 className='text-center text-2xl font-semibold '>Weather App</h1>

      <div className='glassbg p-2 relative md:left-48 lg:left-96 md:w-1/2 mt-4  flex items-center justify-center'>
        <label className='p-4 md:ml-2 text-lg' htmlFor='location'>Location:</label>
        <input id='location' className='outline-none w-1/2 md:auto p-2 rounded-lg bg-slate-300' onChange={handleInputChange} value={inputValue} />
      </div> 
      <div className='glassbg flex flex-col items-center h-auto p-2 relative mb-auto md:left-48 lg:left-96 md:w-1/2 mt-4 flex justify-center '>
       <h1 className='block my-6 font-semibold text-justify'>Current status : <span className='font-bold text-5xl block'>
  {data && data.days && data.days.length > 0 ? data.days[0].description : "N/A"}
</span> </h1>

        <img className='w-1/2' src={icon}  />
      </div>
    

    </div>
  )
}

export default page
