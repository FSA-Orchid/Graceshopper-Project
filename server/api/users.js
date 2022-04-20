const router = require('express').Router();
const { User } = require('../db');
<<<<<<< HEAD
module.exports = router;
=======

module.exports = router;

//GET /api/users
>>>>>>> 39f63a1da22f0978315fa8d528235b637443eb9c

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
<<<<<<< HEAD
      // send everything to anyone who asks!
=======
      // send everything to anyone who asks
>>>>>>> 39f63a1da22f0978315fa8d528235b637443eb9c
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
