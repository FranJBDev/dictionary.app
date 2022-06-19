const express = require('express')
const app = express()
const morgan = require('morgan')

// config
app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2)

// routes
app.use(require('./routes'))

// Starting server
app.listen(app.get('port'), () =>{
    console.log(`Server listening on port ${app.get('port')}`)
})

