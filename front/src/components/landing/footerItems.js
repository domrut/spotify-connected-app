import React from 'react';
import Github from "../../svgs/github";
import Linkedin from "../../svgs/linkedin";

function FooterItems() {
    return (
        <>
            <div className="text-neutral-400 flex items-center justify-between px-7 pt-20 max-w-[1160px] mx-auto">
                <div className="text-xs">
                    <p> Idea by
                        <a className="underline ml-1.5"
                           href="https://github.com/Divide-By-0/ideas-for-projects-people-would-use"
                           target="_blank">Divide-By-0</a>
                    </p>
                </div>
                <div className="text-xs flex">
                    <a className="mr-5" href="https://github.com/domrut/spotify-connected-app" target="_blank">
                        <Github/>
                    </a>
                    <a href="https://www.linkedin.com/in/dominykas-rutkauskas-2bb282166/" target="_blank">
                        <Linkedin/>
                    </a>
                </div>
            </div>
        </>
    );
}

export default FooterItems;