const express = require('express')
const router = express.Router()

const charactersService = require('../services/characters.services')



router.get("/listado", (req, res, next) => {

  charactersService
    .getAllCharacters()
    .then(response => res.render('characters/list', { characters: response.data }))
    .catch(err => next(err))

})

router.get('/detalles/:id', (req, res, next) => {

  const { id: character_id } = req.params

  charactersService
    .getOneCharacter(character_id)
    .then(response => res.render('characters/details', { character: response.data }))
    .catch(err => next(err))
})



router.get('/crear', (req, res, next) => {
  res.render('characters/create')
})

router.post('/crear', (req, res, next) => {

  const { name, occupation, weapon } = req.body

  const character_data = { name, occupation, weapon }

  charactersService
    .saveCharacter(character_data)
    .then(() => res.redirect('/personajes/listado'))
    .catch(err => next(err))
})




router.get('/editar/:character_id', (req, res, next) => {

  const { character_id } = req.params

  charactersService
    .getOneCharacter(character_id)
    .then(response => res.render('characters/edit', { character: response.data }))
    .catch(err => next(err))
})


router.post('/editar/:character_id', (req, res, next) => {

  const { name, occupation, weapon } = req.body
  const { character_id } = req.params

  const character_data = { name, occupation, weapon }

  charactersService
    .editCharacter(character_id, character_data)
    .then(() => res.redirect(`/personajes/detalles/${character_id}`))
    .catch(err => next(err))
})


module.exports = router