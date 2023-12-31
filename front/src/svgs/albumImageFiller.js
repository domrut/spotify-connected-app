import React from 'react';

function AlbumImageFiller() {
    return (
        <svg
            className="fill-neutral-600 dark:fill-black w-[60px] h-[60px] 2xs:h-[100px] 2xs:w-[100px] xs:h-[150px] xs:m-auto rounded-md"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="none"
                  d="M12 4c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm-4 8H6c0-3.309 2.691-6 6-6v2c-2.206 0-4 1.794-4 4zm3.993 2a2.007 2.007 0 1 1 0-4.014 2.007 2.007 0 0 1 0 4.014z"/>
            <circle cx="11.993" cy="11.993" r="2.007"/>
            <path
                d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
            <path d="M12 6c-3.309 0-6 2.691-6 6h2c0-2.206 1.794-4 4-4V6z"/>
        </svg>
    );
}

export default AlbumImageFiller;