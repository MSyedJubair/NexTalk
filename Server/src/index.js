import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('heloooo')
})

app.listen(5000)