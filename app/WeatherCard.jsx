function WeathrrCard(props) {

    return (
        <div>
            <h1 className='block my-6 font-semibold text-justify'>Current status : <span className='font-bold text-5xl block'>
                {data && data.days && data.days.length > 0 ? data.days[0].description : "N/A"}
            </span> </h1>

            <img className='w-1/2' src={icon} />
        </div>


    )
}