import React from 'react';
import Clock from "../svgs/clock";

function TracksLegend() {
    return (
        <div
            className="grid grid-flow-col [&>*]:text-sm px-0 sm:px-[25px] auto-cols-mobileTrackLegend sm:auto-cols-track text-white border-b border-neutral-500 pb-5 mt-10 mb-10">
            <p>#</p>
            <p>Song</p>
            <p>Preview</p>
            <p className="hidden sm:block">Added</p>
            <Clock/>
        </div>
    );
}

export default TracksLegend;