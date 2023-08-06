import React from 'react';
import {Text} from "../../Text";
import HomeCards from "./HomeCards";
function HowItWorks() {
    return (
        <div className="text-white dark:text-black flex flex-col max-w-[1160px] mx-auto">
            <p className="text-[1.25rem] sm:text-[2.5rem] text-center mb-20 sm:mb-40 whitespace-normal font-bold tracking-wide">How it works?</p>
            <div className="flex justify-between flex-col 1.1md:flex-row gap-x-4 gap-y-16">
                {Text.map((el, index) => {
                    return <HomeCards key={index} heading={el.heading} index={index} steps={el.steps} />
                })}
            </div>
        </div>
    );
}

export default HowItWorks;