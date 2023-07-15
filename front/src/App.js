import {useSelector} from "react-redux";
import Layout from "./pages/Layout";
import React from "react";

function App() {
    const store = useSelector(store => store.spotifyStore);

    return (
        <div className="App">
            <Layout store={store}/>
            {console.log(store)}
        </div>
    );
}

export default App;
