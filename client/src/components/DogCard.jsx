import React from 'react';

export default function DogCard({name, img, temperaments}) {
    return(
        <div >
            <h3 >{name}</h3>
            <h5 >{temperaments}</h5>
            <img src={img} alt="img not found" width="320px" height="370px"/>
        </div>
    )
}