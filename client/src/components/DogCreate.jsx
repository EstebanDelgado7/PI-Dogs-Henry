import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postDogs, getTemperaments } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import Styles from "../styles/DogCreate.module.css"


function validate(input) {
    let errors = {};

    //    NOMBRE
    if (!input.name) {
        errors.name = 'Se requiere un nombre';
        
    }

    //    ALTURA

    if (!input.height_min) {
        errors.height_min = 'Se requiere una altura mínima';
        
    }

    if (input.height_min > 100 || input.height_min < 0) {
        errors.height_min = 'Este Número no es valido (debe ser entre 1 y 100)';
    }

    if (!input.height_max) {
        errors.height_max = 'Se requiere una altura máxima';
    }

    if (input.height_max > 100 || input.height_max < 0) {
        errors.height_max = 'Este Número no es valido (debe ser entre 1 y 100)';
    }

    if (parseInt(input.height_min) >= parseInt(input.height_max)) {   
        errors.height_max = "La altura máxima debe ser mayor que la altura mínima";
    }

    //    PESO

    if (!input.weight_min) {
        errors.weight_min = 'Se requiere un peso mínimo';
    }

    if (input.weight_min > 100 || input.weight_min < 0) {
        errors.weight_min = 'Este Número no es valido (debe ser entre 1 y 100)';
    }

    if (!input.weight_max) {
        errors.weight_max = 'Se requiere un peso máximo';
    }

    if (input.weight_max > 100 || input.weight_max < 0) {
        errors.weight_max = 'Este Número no es valido (debe ser entre 1 y 100)';
    }

    if (parseInt(input.weight_min) >= parseInt(input.weight_max)) {      
        errors.weight_max = "El peso máximo debe ser mayor que el peso mínimo";
    }

    //    TIEMPO DE VIDA

    if (!input.life_time_min) {
        errors.life_time_min = 'Se requiere un tiempo de vida mínimo';
    }

    if (input.life_time_min > 100 || input.life_time_min < 0) {
        errors.life_time_min = 'Este Número no es valido (debe ser entre 1 y 100)';
    }

    if (!input.life_time_max) {
        errors.life_time_max = 'Se requiere un tiempo de vida máximo';
    }

    if (input.life_time_max > 100 || input.life_time_max < 0) {
        errors.life_time_max = 'Este Número no es valido (debe ser entre 1 y 100)';
    }

    if (parseInt(input.life_time_min) >= parseInt(input.life_time_max)) {      
        errors.life_time_max = "El año de vida máximo debe ser mayor que el año de vida mínimo";
    }


    if (!input.temperament) {
        errors.temperament = "Selecciona al menos un temperamento";
    }


    if (!input.img) {
        errors.img = "Por favor, Ingresa la URL de tu Imagen";
    }
    
    return errors;

};




export default function DogCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({});



    const [input, setInput] = useState({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_time_min: "",
        life_time_max: "",
        temperament: [],
        img: "",
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    
    }

    function handleDelete(el) {
        setInput({
            ...input,
            temperament: input.temperament.filter(e => e !== el)
        })
    }




    function handleSubmit(e) {
        e.preventDefault()
        validate(input)
        
        if (Object.keys(errors).length === 0 && input.name !== "" && input.height_min !== "" && input.height_max !== "" && input.weight_min !== "" && input.weight_max !== "" && input.life_time_min !== "" && input.life_time_max !== "" && input.temperament.length !== 0) {
            dispatch(postDogs(input))
            alert("Perro creado con éxito")
            setInput({
                name:"",
                height_min: "", 
                height_max: "", 
                weight_min: "", 
                weight_max: "", 
                life_time_min: "", 
                life_time_max: "", 
                temperaments: [], 
                img: "",
            })
            history.push('/home')
        } else {
            alert("Por favor complete los campos con datos válidos")
        }
    }


    useEffect(() => {
        dispatch(getTemperaments());
    }, []);

    return (
    
        <div className={Styles.Form}>
            <h1>Crear perro</h1>
            <form  onSubmit={(e) => handleSubmit(e)}>

                <div className={Styles.Items}>
                <div>
                    <br />
                    <label >Nombre:</label>
                    <input 
                    placeholder="Nombre del perro"
                    type= "text"
                    value= {input.name}
                    name= "name"
                    id='name'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                    <p className={Styles.Alerta}>{errors.name}</p>
                    )}
                </div>


                <br />
                <div>
                    <label >Tamaño:</label>
                    <br />
                    <input 
                    
                    type="number" 
                    value={input.height_min}
                    name='height_min' 
                    id='height_min'
                    placeholder="Min (Cm)"
                    onChange={(e) => handleChange(e)}  
                    />



                    <input
                    
                    type="number" 
                    value={input.height_max} 
                    name='height_max' 
                    id='height_max' 
                    placeholder="Max (Cm)"
                    onChange={(e) => handleChange(e)}
                    />
                    
                    {errors.height_min && (
                    <p className={Styles.Alerta}>{errors.height_min}</p>
                    )}
                    {errors.height_max && (
                    <p className={Styles.Alerta}>{errors.height_max}</p>
                    )}
                    
                </div>



                <br />
                <div>
                    <label >Peso:</label>
                    <br />
                    <input 
                    
                    type="number" 
                    value={input.weight_min}
                    name='weight_min' 
                    id='weight_min'
                    placeholder="Min (Kg)"
                    onChange={(e) => handleChange(e)}
                    />
                    


                    <input
                    
                    type="number" 
                    value={input.weight_max} name='weight_max' 
                    id='weight_max' 
                    placeholder="Max (Kg)"
                    onChange={(e) => handleChange(e)}
                    />

                    {errors.weight_min && (
                    <p className={Styles.Alerta}>{errors.weight_min}</p>
                    )}

                    {errors.weight_max && (
                    <p className={Styles.Alerta}>{errors.weight_max}</p>
                    )}
                </div>


                <br />
                <div>
                    <label >Años de vida:</label>
                    <br />
                    <input
                    
                    type="number" 
                    value={input.life_time_min}
                    name='life_time_min' 
                    id='life_time_min'
                    placeholder="Min"
                    onChange={(e) => handleChange(e)}
                    
                    />
                    <input
                    
                    type="number" 
                    value={input.life_time_max} name='life_time_max' 
                    id='life_time_max' 
                    placeholder="Max"
                    onChange={(e) => handleChange(e)}
                    />
                    
                    {errors.life_time_min && (
                    <p className={Styles.Alerta}>{errors.life_time_min}</p>
                    )}


                    {errors.life_time_max && (
                    <p className={Styles.Alerta}>{errors.life_time_max}</p>
                    )}
                </div>
                <br />
                <div>
                <label >Selecciona al menos un Temperamento:</label>
                <br />
                <select className={Styles.Select} onChange={(e) => handleSelect(e)}>
                    {temperaments.map((temp) => (
                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                    ))}
                </select>
                </div>
                <div>
                {input.temperament.map(el => <button type='button' key={el.id} onClick={() => handleDelete(el)}>{el}</button>)}
            
                {errors.temperament && (
                <p className={Styles.Alerta}>{errors.temperament}</p>
                )}
                </div>
                <br />

                <div>
                    <label >Imagen:</label>
                    <br />
                    <input
                    
                    type= "url"
                    value= {input.img}
                    name= "img"
                    id='img'
                    placeholder="Inserta la URL de tu Imagen"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.img && (
                    <p className={Styles.Alerta}>{errors.img}</p>
                    )}
                    
                </div>
                <br />
                <div>
                    {input.img ? <img className={Styles.Img} src={input.img} alt="img no disponible" /> : ""}
                    </div>
                <div>

                <button className={Styles.btn} type='submit'>Crear</button>
                </div>

                <div>
                <Link to= '/home'><button className={Styles.btn2}>Volver al inicio</button></Link>
                </div>
                
                </div>
             


            </form>





        </div>

    )





}