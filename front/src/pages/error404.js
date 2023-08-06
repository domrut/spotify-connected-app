import React from 'react';
import {Link} from "react-router-dom";

function Error404() {
    return (
        <div className="section-styling h-[84vh] text-center">
            <div className="mt-20">
                <svg className="fill-white dark:fill-black m-auto" width="100px" height="100px" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                    <g fillRule="evenodd">
                        <path d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z"/>
                        <path className="dark:fill-white" d="M13 7A6 6 0 1 0 1 7a6 6 0 0 0 12 0z" fill="#121212"/>
                        <path d="M7 5.969L5.599 4.568a.29.29 0 0 0-.413.004l-.614.614a.294.294 0 0 0-.004.413L5.968 7l-1.4 1.401a.29.29 0 0 0 .004.413l.614.614c.113.114.3.117.413.004L7 8.032l1.401 1.4a.29.29 0 0 0 .413-.004l.614-.614a.294.294 0 0 0 .004-.413L8.032 7l1.4-1.401a.29.29 0 0 0-.004-.413l-.614-.614a.294.294 0 0 0-.413-.004L7 5.968z"/>
                    </g>
                </svg>
                <p className="text-xl sm:text-[4rem] text-white dark:text-black my-20 tracking-wide font-bold">Page does not exist</p>
                <Link to="/my-library" className="text-neutral-300 dark:text-neutral-800 p-2 sm:p-5 border-2 block max-w-[10rem] m-auto border-white dark:border-black rounded-full hover:bg-white hover:text-black">Go home</Link>

            </div>
        </div>
    );
}

export default Error404;
