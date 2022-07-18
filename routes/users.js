var express = require('express');
var router = express.Router();

/* GET users listing. */
/* point /users  */
router.get('/', function(req, res, next) {
  res.json({"name":"bob","age":13});
});

module.exports = router;
