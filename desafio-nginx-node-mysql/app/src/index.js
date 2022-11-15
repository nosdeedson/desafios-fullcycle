const express = require('express')
const app = express()

const port = 3000

app.get('/', (req, res) => {
    let teste = "edson"
    res.send(`<h1>Full Cycle Rocks!</h1> <br> <div>${teste}</div>`)
})

app.listen(port, () => {
    console.log(`listen: ${port}` )
})