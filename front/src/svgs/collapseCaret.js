import React from 'react';

function CollapseCaret({hideArtistsHandler, isShown}) {
    return (
        <svg onClick={hideArtistsHandler} className={`fill-white dark:fill-black w-8 h-8 inline md:hidden ${isShown ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="down-arrow">
            <path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"></path>
        </svg>
    );
}

export default CollapseCaret;