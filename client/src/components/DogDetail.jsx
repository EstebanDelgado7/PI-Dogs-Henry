import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../actions";
import Styles from "../styles/DogDetail.module.css"

export default function Detail(props, content) {
















    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch])




    const myDog = useSelector((state) => state.detail)


    return(
        <div className={Styles.Card}>
            {
                myDog.length > 0 ?
                <div className={Styles.Margen}>
                    <h1>{myDog[0].name}</h1>
                    <img src={myDog[0].img ? myDog[0].img : ""} alt="" width="400px" height="400px"/>

                    <h2 className={Styles.Tamaño}>Tamaño: </h2>
                    <p className={Styles.TamañoInfo}> {myDog[0].height_min}  -  </p>
                    <p className={Styles.TamañoInfo2}>{myDog[0].height_max}  Centimetros</p>

                    <h2 className={Styles.Peso}>Peso: </h2>
                    <p className={Styles.PesoInfo}> {myDog[0].weight_min}  -  </p>
                    <p className={Styles.PesoInfo2}>{myDog[0].weight_max}  Kilogramos</p>

                    <h2 className={Styles.Años}>Tiempo de Vida: </h2>
                    <p className={Styles.AñosInfo}> {myDog[0].life_time_min}  -  </p>
                    <p className={Styles.AñosInfo2}>{myDog[0].life_time_max}  Años</p>

                    <h2 className={Styles.Temp}>Temperamentos: </h2>
                    <p className={Styles.TempInfo}>{!myDog[0].createInDb ? myDog[0].temperament + " ": myDog[0].Temperaments.map(e => e.name + " ")}</p>






                    <div className="content">
                        <h2>{content.name}</h2>
                        <p>Me gusta: {likes}</p>
                        <button onClick={handleLikeClick}>Me gusta</button>
                    </div>





                </div> : <p>Cargando...</p>
            }
            <Link to= '/home'>
                <button className={Styles.btn}>Volver</button>
            </Link>
        </div>
    )
}


