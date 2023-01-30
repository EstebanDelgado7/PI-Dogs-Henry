import React from 'react';
import Styles from '../styles/Paginado.module.css';


export default function Paginado ({dogsPerPage, allDogs, paginado}) {
    const pageNumbers = [];

    for(let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav className={Styles.nav}>
            <ul className={Styles.paginado}>
                { pageNumbers && 
                pageNumbers.map(number => (
                    <li className={Styles.number} key={number}>
                    <a className={Styles.img} onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>   
    )
}