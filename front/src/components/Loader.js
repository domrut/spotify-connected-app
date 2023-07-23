import React from 'react';

function Loader() {
    return (
        <div className="loader w-full my-5">
            <svg className="animate-spin fill-white" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg"
                 width="40px" height="40px" viewBox="0 0 50 50">
                <path
                    d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                </path>
            </svg>
        </div>
    );
}

export default Loader;