import React from 'react';

function ArtistFillerImage() {
    return (
        <svg
            className="fill-neutral-600 w-[60px] h-[60px] 2xs:h-[100px] 2xs:w-[100px] xs:h-[150px] xs:m-auto rounded-md"
            fill="#000000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15.75 8l-3.74-3.75a3.99 3.99 0 0 1 6.82-3.08A4 4 0 0 1 15.75 8zm-13.9 7.3l9.2-9.19 2.83 2.83-9.2 9.2-2.82-2.84zm-1.4 2.83l2.11-2.12 1.42 1.42-2.12 2.12-1.42-1.42zM10 15l2-2v7h-2v-5z"/>
        </svg>
    );
}

export default ArtistFillerImage;