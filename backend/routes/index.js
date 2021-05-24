var express = require('express');
var router = express.Router();
const Code = require('../models/codeSchema')
const http = require('http');
const axios = require('axios')
/* GET home page. */
router.post('/testCode', function(req, res, next) {
  console.log(req.body.code);
  //res.send(req.body)
  axios
    .post('https://api.jdoodle.com/execute',{
      "script" : req.body.code,
"language": req.body.language,
"versionIndex": "1",
     "clientId": "fb962a8e76d8a66f6cd91cf82df0049d",
     "clientSecret":
       "ab5e2d9b584358a93ef451ac0ee27b41f277a884611a822ef8c3cd9e8968fa0c"
   })
    .then(result => {
      res.json(result.data)
    })
    .catch(error => {
      console.log(error);
      res.json(error)
    })
});

router.post('/createCode', function(req, res, next) {
  const code = new Code(req.body.code)
  code.save().then(doc=>{
    res.json(doc)
}).catch(err=>{
    res.render(err)

})
});

router.get('/getCode/:id',async function(req, res, next) {
 const code =await Code.findById(req.params.id)
 res.json(code)
});

module.exports = router;
