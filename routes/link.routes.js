const { Router } = require('express')
const config = require('config')
const shortid = require('shortid')
const Links = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const Link = require('../models/Link')
const router = Router()

router.post('/generate', auth, async (req,res) => {
  try {

    const baseUrl = config.get('baseUrl')
    const { from } = req.body

    const code = shortid.generate()

    const existing = await Link.findOne({ from })

    if (existing) {
      return res.json({ link: existing })
    }

    const to = baseUrl + '/t/' + code
    
    const link = new Link({
      code, to, from, owner: req.user.userId
    })

    await link.save()

    res.status(201).json({ link })

  } catch (e) {
    res.status(500).json( {message: 'Someyhing went wrong, try again 2'} )
  }
})

router.get('/', auth, async (req,res) => {
  try {
    const links = await Links.find({ owner: req.user.userId })
    res.json(links)
  } catch (e) {
    res.status(500).json( {message: 'Someyhing went wrong, try again 2'} )
  }
})

router.get('/:id', auth, async (req,res) => {
  try {
    const link = await Links.findById( req.params.id )
    res.json(link)
  } catch (e) {
    res.status(500).json( {message: 'Someyhing went wrong, try again 2'} )
  }
})

module.exports = router