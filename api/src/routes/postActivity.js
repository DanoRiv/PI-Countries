const { Router } = require("express");
const { postActivity } = require("../controllers/post");


const router = Router()

router.post('/', async(req, res, next)=>{
    const {name, difficulty, duration, season, country} = req.body;

    try {
        const postAct = {
            name, difficulty, duration, season, country
        }
        postActivity(postAct)
        res.send("Success")
    } catch (error) {
        next(error)
    }
})

module.exports = router