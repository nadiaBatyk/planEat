let d = new Date('2023-03-19') // ya lo recibo en utc
let f = Date.UTC(
  d.getFullYear(),
  d.getMonth(),
  d.getDate(),
  d.getHours(),
  d.getMinutes()
)
let g = new Date(f)
console.log(`utc to local time`, g)
let A = new Date()
let B = Date.UTC(
  A.getFullYear(),
  A.getMonth(),
  A.getDate(),
  A.getHours(),
  A.getMinutes()
)
let C = new Date(B)
console.log(`NEW DATE LOCAL`, A)
console.log(`DATE NOW EN HORA LOCAL`, C)
let h = new Date()
let p = Date.UTC(h.getUTCFullYear(), h.getUTCMonth(), h.getUTCDate())
let o = new Date(p)
console.log(`DATE NOW EN UTC`, o)
console.log(`date que recibo`, d)
console.log(d >= o)
