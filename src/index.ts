import express from 'express'

const app = express()
// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROUTES
app.get('/meals', (_req, res) => {
  console.log('piden comidas')

  res.send('Estas son tus comidas')
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
  console.log(`Succesfully connected to port ${PORT}`)
})
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
app.on('error', (err) => console.log(`Error on server: ${err}`))
