import React from 'react';

function Outline({rotate}) {
    return (
        <svg className={`absolute ${rotate ? "rotated" : ""} left-[-70px]`} fill="#fff" width="200px" height="200px" viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg" >
            <path d="M64 272L176 160 240 224 352 112 384 144 240 288 176 224 96 304 64 272ZM24 0 0 0 0 0 0 0" />
        </svg>
    );
}

export default Outline;