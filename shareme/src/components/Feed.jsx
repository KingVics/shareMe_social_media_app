import { useEffect, useState } from "react"
import  { useParams } from "react-router-dom"

import { client,  } from "../client"
import { searchQuery, feedQuery } from "../utils/data"
import MasonryLayout from "./MansonryLayout"
import Spinner from "./Spinner"



const Feed = () => {
    const [loading, setloading] = useState(false);
    const [pins, setpins] = useState(null);
    const { categoryId } = useParams();
    
    
    useEffect(() => {
        setloading(true);

        if(categoryId) {
            const query = searchQuery(categoryId);
            client.fetch(query).then(res => {
                setpins(res)
                setloading(false);
                console.log('fetched')
            })
        } else {
            client.fetch(feedQuery).then(res => {
                setpins(res)
                setloading(false);
                console.log('not fetched')
            })
        }

    }, [categoryId])


    if(loading) return <Spinner message="We are adding new category" />
    
    if(!pins?.length) return <h2>No pins available</h2>
    return (
        <div>
            {pins && <MasonryLayout pins={pins} />}
        </div>
    )
}

export default Feed
