interface BaseDTO {}

interface PersonaPruebaDTO extends BaseDTO {
  nombre: string
  edad: number
}
interface AnimalPruebaDTO extends BaseDTO {
  nombre: string
  raza: string
}

const fun = <T extends BaseDTO>(hola: T) => {
  console.log('OBJETO POLIIII', hola)
}
const n: PersonaPruebaDTO = { nombre: 'Nadu', edad: 29 }
const w: AnimalPruebaDTO = { nombre: 'Keylo', raza: 'salchicha' }
fun(n)
fun(w)
