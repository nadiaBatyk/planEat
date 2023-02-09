import express from 'express'

const app = express()
app.use(express.json())

const PORT = 3000
app.get('/hola', (_req, res) => {
  console.log('alguien me saluda')
  console.log('holis')
  console.log('soy pinkyyy aaa')
  // const arr = []
  res.send('como estas??')
})
app.listen(PORT, () => {
  console.log(`conectado con exito al puerto ${PORT}`)
})
