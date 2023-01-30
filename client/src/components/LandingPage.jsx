import React from 'react';
import {Link} from 'react-router-dom';
import Styles from '../styles/LandingPage.module.css'

export default function LandingPage(){
    return(
        <div className={Styles.Contenedor}>
            <h1 className={Styles.P}>PI DOGS</h1>
            <Link to ='/home'>
                <button className={Styles.btn}>Entrar</button>
            </Link>
        </div>
    )
}
		