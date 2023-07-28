import React from 'react';

function Logout({logoutHandler}) {
    return (
        <div onClick={logoutHandler} className="after:content-['Logout'] hover:text-neutral-500 cursor-pointer after:pointer-events-auto sm:after:content-none flex items-center text-white">
            <svg className="cursor-pointer mr-2 sm:mr-0" width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12H19M19 12L16 15M19 12L16 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    );
}

export default Logout;