import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/dogs");
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getNameDogs(name) {
    return async function(dispatch){
        try {
            let dogsByName = await axios.get("http://localhost:3001/dogs?name=" + name);
            return dispatch({
                type: "GET_NAME_DOGS",
                payload: dogsByName.data
            })
        } catch(error){
            console.log(error)
        }
    }
}


export function getTemperaments(){
    return async function (dispatch){
        let temperamento = await axios.get("http://localhost:3001/temperaments", {
        
        });
        return dispatch ({type: "GET_TEMPERAMENTS", payload: temperamento.data});
    }
}


export function postDogs(payload) {
     return async function (dispatch){
         const response = await axios.post("http://localhost:3001/dogs", payload);
         return response;
     }
}


export function filterDogsByTemperaments(payload){
     return{
         type: "FILTER_BY_TEMPERAMENTS",
         payload
     }
}

export function orderByWeight(payload){
   
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function filterCreated(payload) {
    return{
        type:"FILTER_CREATED",
        payload
    }
}

export function orderByName(payload){
   
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function getDetail(id){
    return async function (dispatch){
        try {
            let json = await axios.get("http://localhost:3001/dogs/" + id);
            return dispatch ({
                type: 'GET_DETAILS',
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}