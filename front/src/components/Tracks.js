import React, {useState} from 'react';
import Track from "./searchComps/searchResult/Track";

function Tracks({store, type}) {
    const [filteredArray, setFilteredArray] = useState(store.tracks)
    const filterHandler = (value) => {
        const filterTempo = store.tracksAudioData.filter(item => item.tempo >= value);
        let arr;
        if (type === "playlists") arr = store.tracks.filter(item => filterTempo.some(el => item.track.uri === el.uri))
        if (type === "albums") arr = store.tracks.filter(item => filterTempo.some(el => item.uri === el.uri))
        setFilteredArray(arr)
    }

    const items = () => {
        if (type === "playlists") {
            console.log(filteredArray)
            return filteredArray.map((el, index) => {
                return <Track
                    artists={el.track.artists}
                    duration={el.track.duration_ms}
                    explicit={el.track.explicit}
                    id={el.track.id}
                    uri={el.track.uri}
                    name={el.track.name}
                    listen={el.track.preview_url}
                    index={index}
                    added={el.added_at}
                    tempo={store.tracksAudioData[index].tempo}
                    selectedTracks={store.selectedTrackURIs}
                    key={index}
                />
            })
        }
        if (type === "albums") {
            return filteredArray.map((el, index) => {
                return <Track
                    artists={el.artists}
                    duration={el.duration_ms}
                    explicit={el.explicit}
                    id={el.id}
                    uri={el.uri}
                    name={el.name}
                    listen={el.preview_url}
                    index={index}
                    tempo={store.tracksAudioData[index].tempo}
                    selectedTracks={store.selectedTrackURIs}
                    key={index}
                />
            })
        }
    }

    return (
        <div className="section-styling flex flex-col">
            <div className="flex flex-col items-center">
                <h1 className="text-white text-lg sm:text-2xl mb-5">Filter songs by BPM(Beats Per Minute)</h1>
                <label className="text-white max-w-xs mb-5">
                    <input
                        className="my-2 outline-none w-full bg-sectionColor border-b-2 border-white text-white px-2 py-0.5"
                        type="text"
                        onChange={(e) => filterHandler(e.target.value)}
                        placeholder="Enter numeric value"/>
                </label>
                <p className="text-neutral-500 whitespace-normal text-center text-sm mb-5">Select songs to add by clicking on them</p>
            </div>
            <div className="grid grid-flow-col [&>*]:text-sm px-0 sm:px-[25px] auto-cols-mobileTrackLegend sm:auto-cols-track text-white border-b border-neutral-500 pb-5 mt-10">
                <p>#</p>
                <p>Song</p>
                <p>Preview</p>
                <p className="hidden sm:block">Added</p>
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path id="Vector" d="M12 7V12H17M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                </svg>
            </div>
            <div className="flex flex-col h-[800px] overflow-y-scroll mt-5">
                {items()}
            </div>
        </div>
    );
}

export default Tracks;