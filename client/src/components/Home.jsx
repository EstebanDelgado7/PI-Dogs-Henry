import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, orderByWeight, getTemperaments, filterDogsByTemperaments, filterCreated, orderByName} from "../actions";
import { Link } from "react-router-dom";
import DogCard from "./DogCard";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Styles from "../styles/Home.module.css"


export default function Home() {

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    const temperaments = useSelector((state) => state.temperaments);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments())
    },[dispatch])


    function handleSortWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)

    }


    function handleFilterTemperament(e) {
        dispatch(filterDogsByTemperaments(e.target.value));
    }


    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value));
    }


    return (
        <div className={Styles.Home}>

            <h1 className={Styles.Title}>PI Dogs | By: Michael Delgado</h1>

            <Link className={Styles.Crear} to= '/dogs'>Crear perro</Link>

            <button className={Styles.btnRecargar} onClick={e=> {handleClick(e)}}>
                Cargar todos los perros
            </button>

            <div>
                <div>
                <label className={Styles.Option}> Orden   :</label>
                <select className={Styles.Seleccion} onChange={e => handleSort(e)}>
                    <option value= 'asc'>Ascendente</option>
                    <option value= 'desc'>Descendente</option>
                </select>
                </div>


                <div>
                <label className={Styles.Option}>  Peso   :</label>
                <select className={Styles.Seleccion} onChange={e => handleSortWeight(e)}>
                    <option value='weightasc'>Max - Min</option>
                    <option value='weightdesc'>Min - Max</option>
                </select>
                </div>


                <div>
                <label className={Styles.Option}> Temperamento   :</label>
                <select className={Styles.Seleccion} onChange={(e) => handleFilterTemperament(e)}>
                    {temperaments.map((temp) => (
                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                    ))}
                    
                </select>
                </div>
           

                <div>
                <label className={Styles.Option}> DB   :</label>
                <select  className={Styles.Seleccion} onChange={(e) => handleFilterCreated(e)}>
                    <option value="All">Todos</option>
                    <option value="created">Creados</option>
                    <option value="api">Existente</option>
                </select>
                </div>

                <SearchBar/>

                <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />

                

                <div className={Styles.Card}>
                    {currentDogs?.map((el) => {
                        return (
                        <div className={Styles.Margen}>
                            <Link className={Styles.Link} to={"/home/" + el.id}>
                                <DogCard 
                                name={el.name}
                                img={el.img}
                                key={el.id}
                       
                                
                                />
                                
                                </Link>
                                <div>
                                Temperamento : {!el.createInDb ? el.temperament : el.Temperaments.map(e => e.name + ", ")}
                                </div>
                        </div>
                        )
                    })}
                </div>

                <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />
            </div>
        </div>
    )
}