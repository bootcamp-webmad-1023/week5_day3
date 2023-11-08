# week5_day3

`Promise.all()` permite gestionar varias promesas de manera paralela. Recibe como argumento un array de promesas no gestionadas y retorna un array con las promesas argumentadas, resueltas, en el orden estipulado:

````javascript
router.get("/editar/:movie_id", (req, res, next) => {

  const { movie_id } = req.params

  const promises = [
    Movie.findById(movie_id),
    Celebrities.find()
  ]

  Promise
    .all(promises)
    .then(response => {
      const movie = response[0]
      const celebs = response[1]

      res.render('movies/edit', { movie, celebs })
    })
    .catch(err => next(err))
})
````
