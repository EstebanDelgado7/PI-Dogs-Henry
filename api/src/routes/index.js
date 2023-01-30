const { Router } = require('express');
const axios = require("axios");
const { Dog, Temperament} = require("../db");
const { API_KEY } = process.env;
const contentController = require ("../controller/model")



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo = await apiUrl.data.map(e => {
        return {
            name: e.name,
            id: e.id,
            height_max: 
                e.height.metric.split(" - ")[1] && e.height.metric.split(" - ")[1],
            height_min:
                e.height.metric.split(" - ")[0] && e.height.metric.split(" - ")[0],
            weight_max: 
                e.weight.metric.split(" - ")[1] && e.weight.metric.split(" - ")[1],
            weight_min: 
                e.weight.metric.split(" - ")[0] !== "NaN" 
                ? e.weight.metric.split(" - ")[0]
                : 6,
            life_time_max: 
                e.life_span.split(" - ")[1] && e.life_span.split(" - ")[1].split(" ")[0],
            life_time_min: 
                e.life_span.split(" - ")[0] && e.life_span.split(" - ")[0],
            temperament: 
                e.temperament
                ? e.temperament
                : "No tiene temperamento",
            img: e.image.url,
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}

router.get("/dogs", async (req, res) => {
    const name = req.query.name
    let dogsTotal = await getAllDogs();
    if (name) {
        let dogsName = await dogsTotal.filter( e => e.name.toLowerCase().includes(name.toLowerCase()))
        dogsName.length ? 
        res.status(200).send(dogsName) :
        res.status(404).send("No se encontró el Perro :C");
    } else {
        res.status(200).send(dogsTotal);
    }
})


const prueba = async () => {
    let listaDogs = await axios (`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    let arr = listaDogs.data.map( e => {
        return e.temperament
    });
    let arr2 = arr.join(',').split(',')
    let arr3 = arr2.map(e => {
        return e.trim()
    })
    let arr4 = []
    arr3.forEach(e => {
        if (!arr4.includes(e) && e !== '') {
            arr4.push(e)
        }
    });
    arr4.forEach(e => {
        Temperament.findOrCreate({
            where: {name: e}
        })
    })
    let arr5 = await Temperament.findAll()
    return arr5
}

router.get("/temperaments", async (req, res) => {
    let prueba2 = await prueba()
    res.status(200).json(prueba2)
})

router.post("/dogs", async (req, res) => {
    const {
        name,
        height_max,
        height_min,
        weight_max,
        weight_min,
        life_time_max,
        life_time_min,
        temperament,
        img,
        createInDb,
      } = req.body;

    let dogCreated = await Dog.create({
        name,
        height_max,
        height_min,
        weight_max,
        weight_min,
        life_time_max,
        life_time_min,
        img,
        createInDb,
      });

    let temperamentDb = await Temperament.findAll({
        where: { name: temperament },
      });

    let ejemplo = await dogCreated.addTemperaments(temperamentDb);
    res.send(ejemplo)
});

router.get("/dogs/:id", async (req, res) => {
    const { id } = req.params;
    const allDog = await getAllDogs();

    if (id) {
        let dogId = await allDog.filter(el => el.id == id)
        dogId.length?
        res.status(200).json(dogId) :
        res.status(404).send("No se encontró ese Perro");
    }
});


module.exports = router;
