import React from 'react';

function RecentSearch({input, data}) {
    return (
        <div
            className="my-4 mr-2 cursor-pointer h-[36px] rounded-full px-6 py-2.5 text-xs font-normal bg-neutral-800 dark:bg-neutral-300 dark:border-black dark:border"
            onClick={() => input.current.value = data}>
            <p>{data}</p>
        </div>
    );
}

export default RecentSearch;