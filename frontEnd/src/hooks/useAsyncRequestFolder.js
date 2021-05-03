import {useState, useEffect} from 'react';

const useAsyncRequest = amount => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8080/folder/all`);
                const json = await response.json();
                setData(json, setLoading(false));
                console.log(JSON.stringify(json));
            } catch (err) {
                console.warn("Something went wrong fetching the API...", err);
                setLoading(false);
            }
        }

        if (amount) {
         fetchData(amount);
        }
    }, [amount]);

    return [data, loading]
}

export default useAsyncRequest;
