import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { getNameDogs } from '../actions';
import Styles from "../styles/SearchBar.module.css"


export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameDogs(name));
        setName("")
    }


    return (
        <div>
            <input
            className={Styles.Search}
            type = 'text'
            placeholder="buscar..."
            onChange= {(e) => handleInputChange(e)}
            />

            <button className={Styles.btn} type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}