import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url, initialData) => {
    const [data, setData] = useState([initialData])
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchData = async () => {
        try{
            const response = await axios.get(`${url}`)
            const data = await response.data

            setData(data)
            setIsLoading(false)
        } catch(err){
            console.error(err)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const returnData = {
        data, isLoading
    }
    return returnData

}

export default useFetch;