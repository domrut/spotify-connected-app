import React from 'react';

function HomeCards({heading, steps, index}) {
    return (
        <div className="flex flex-col text-center items-center">
            <p className={`bg-white rounded-full py-5 ${index === 0 ? "px-8" : "px-7"} mx-auto text-black mb-5 font-extrabold text-xl sm:text-2xl`}>{index + 1}</p>
            <p className={`font-semibold text-md sm:text-xl mb-10 ${index === 0 ? "h-full sm:h-[56px]" : ""} tracking-wide whitespace-normal 1.1md:max-w-[250px]`}>{heading}</p>
            <p className="max-w-[400px] 1.1md:max-w-[200px] text-sm text-neutral-400 whitespace-normal mx-auto">{steps}</p>
        </div>
    );
}

export default HomeCards;