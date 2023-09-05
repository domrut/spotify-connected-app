const serverUrl = "https://filter-tempo.onrender.com";

export default {
    get: async (url) => {
        const res = await fetch(`${serverUrl}/${url}`);
        return await res.json();
    },
    post: async (url, data) => {
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const res = await fetch(`${serverUrl}/${url}`, options);


        return await res.json();
    }
}
