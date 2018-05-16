const express = require('express');

const router = express.Router();

/* 
  @route  /api/users/test
  @desc   Tests users api
  @access public
*/
router.use('/test', (req, res) => {
  res.json({
    msg: 'User API working',
  });
});

module.exports = router;