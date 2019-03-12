var express = require('express');
var router = express.Router();
var Estimate = require('../models').Estimate;
var Type = require('../models').Type;
var Platform = require('../models').Platform;

router.get('/', function(req, res, next) {
  res.render('assemble');
});

router.post('/',  async (req, res, next) => {
  try {
    const estimate = await Estimate.create({
      name: req.body.name,
      phone: req.body.tel,
      email: req.body.email,
      company: req.body.corp,
      body: req.body.body,
    })
    if (req.body.type) {
      const estimate_type = await Type.findOrCreate({ where: { title: req.body.type },});
      await estimate.addType(estimate_type[0]);
    }
    if (req.body.platform) {
      const platforms = req.body.platform
      const result = await Promise.all(platforms.map(pf => Platform.findOrCreate({ where: { title: pf }})));
      await estimate.addPlatforms(result.map(r => r[0]));
    }
    res.redirect('/');
  } catch(err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;

