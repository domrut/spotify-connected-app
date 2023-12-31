import React from 'react';

function NavLogo({login}) {
    return (
        <svg className={`fill-white dark:fill-black ${login ? "w-[50px] h-[50px] mt-10" : ""}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="m21 11h-3.94a.78.78 0 0 0 -.21 0h-.17a1.3 1.3 0 0 0 -.15.1 1.67 1.67 0 0 0 -.16.12 1 1 0 0 0 -.09.13 1.32 1.32 0 0 0 -.12.2l-1.6 4.41-4.17-11.3a1 1 0 0 0 -1.88 0l-2.31 6.34h-3.2a1 1 0 0 0 0 2h3.92.23.15a.86.86 0 0 0 .16-.1 1.67 1.67 0 0 0 .16-.12l.09-.13a1 1 0 0 0 .12-.2l1.62-4.53 4.16 11.42a1 1 0 0 0 .94.66 1 1 0 0 0 .94-.66l2.3-6.34h3.21a1 1 0 0 0 0-2z"/>
        </svg>
    );
}

export default NavLogo;