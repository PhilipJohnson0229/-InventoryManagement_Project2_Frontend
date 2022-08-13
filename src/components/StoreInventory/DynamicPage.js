import React from "react";
import { useParams } from 'react-router-dom'

function DynamicPage(){
    const {id} = useParams();
    return(
        <div>
            <h1>This is dynamic page for {id}</h1>
        </div>
    )
}

export default DynamicPage;