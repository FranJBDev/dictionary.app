const { Router } = require('express')
const router = Router()

const words = require('../dict')
const json = []
words.map((e)=> {
        json.push({
            word: e,
            length: e.length
        })
    })

// Raiz
router.get('/', (req, res) => {
    res.json(json)
})

module.exports = router