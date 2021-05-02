const { Router } = require('express')
const Links = require('../models/Link')
const router = Router()

router.get('/:code', async (req, res) => {
  try {

    const link = await Link.findOne({ code: req.params.code })

    if (link) {
      link.ckicks++
      await link.save()
      return res.redirect(link.from)
    }
    
    res.status(404).json('Link undefinded')

  } catch (e) {
    res.status(500).json( {message: 'Someyhing went wrong, try again 2'} )
  }
})

module.exports = router