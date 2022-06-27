const {Router} = require('express')
const { countriesActivity, getById, getByName } = require('../controllers')

const router = Router()

router.get('/', async(req, res, next)=>{

    const { name } = req.query;

    try {
        if(name) {
            const byName = await getByName(name)
            return res.json(byName)
        }
        const country = await countriesActivity() 
        res.json(country)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get('/:idCountry', async(req, res)=> {
    const { idCountry } = req.params;
    //idCountry.toUpperCase()
    try {
        const countryById = await getById(idCountry);
        res.json(countryById)
    } catch (error) {
        console.log(error.message)
        res.status(404).json({error: error.message})
    }

})

module.exports = router