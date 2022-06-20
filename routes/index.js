const { Router } = require('express')
const router = Router()
const { RAE } = require('rae-api');
const rae = new RAE(true);

const words = require('../dict')

const json = []
const raeDefs = async (e) => {
    try {
        const search = await rae.searchWord(e);
        const wordId = search.getRes()[0].getId(); // gets e word id
        const result = await rae.fetchWord(wordId); // fetches the word as object
        const definitions = result.getDefinitions(); // gets all 'hola' definitions as Defintion[]
        const first = definitions[0].getDefinition()
        let res = []
        let i = 0
        for (const definition of definitions) {
            res.push({
                id: i,
                Tipo: definition.getType(),
                Definición: definition.getDefinition()
            })
            i++
        }

        return res
    } catch (e){
        console.log("Error conecting RAE: ", e)
    }
}

words.map( e => { 
    json.push({
        word: e.w,
        group: e.g,
        gn: e.n,
        length: e.w.length,
    })
})

// Raiz
router.get('/', (req, res) => {
    const len = req.query.len
    const limit = req.query.limit
    const gen = req.query.gen
    const num = req.query.num
    let result = json

    if (len) result = result.filter( e => e.length == len )
    if (gen) result = result.filter( e => e.gn.includes(gen.toUpperCase()))
    if (num) result = result.filter( e => e.gn.includes(num.toUpperCase()))
    if (limit) result = result.slice(0, limit)

    if (result.length) res.status(200).json({
        result
    }) 
    else {
        res.status(404).send("No hay palabras de ese tamaño")
    }
})

router.get('/def/:word', async (req, res) => {
    const word = req.params.word
    res.status(200).json({
        [word]: await raeDefs(word)
    })
})

module.exports = router