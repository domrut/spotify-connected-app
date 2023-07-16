import React from 'react';
import Search from "../components/Search";
import SearchResult from "../components/SearchResult";
import http from "../plugins/http";
import {Button} from "../styled/Button.styled";
import {updateError, updatePlaylists, updateSearchResults} from "../features/spotifyStore";
import {useDispatch} from "react-redux";

function SearchPage({store}) {

    const dispatch = useDispatch();
    const nextPage = async (url) => {
        const res = await http.post("nextPage", {
            url, token: sessionStorage.getItem("token")
        });
        res.error ?
            dispatch(updateError({code: res.error.status, message: res.error.message})) :
            dispatch(updateSearchResults(res.data))
    }

    const prevPage = async (url) => {
        const res = await http.post("prevPage", {
            url, token: sessionStorage.getItem("token")
        });
        res.error ?
            dispatch(updateError({code: res.error.status, message: res.error.message})) :
            dispatch(updateSearchResults(res.data))
    }

    return (
        <>
            <Search/>
            <div>
                {store.searchResult.length !== 0 && Object.values(store.searchResult)[0].items.map((el, index) => {
                    return <SearchResult type={Object.keys(store.searchResult)} data={el} index={index} key={index}/>
                })
                }
            </div>
            {store.searchResult.length !== 0 &&
                <div className="mt-10 text-center">
                    {Object.values(store.searchResult)[0].previous !== null &&
                        <Button className="mr-5"
                                onClick={() => prevPage(Object.values(store.searchResult)[0].previous)}>Previous
                            page</Button>}
                    {Object.values(store.searchResult)[0].next !== null &&
                        <Button onClick={() => nextPage(Object.values(store.searchResult)[0].next)}>Next page</Button>}
                </div>
            }
        </>
    );
}

export default SearchPage;