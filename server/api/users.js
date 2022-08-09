const router = require("express").Router();

const {
  User,
  ShoppingCart,
  Product,
  OrderProducts,
  PaymentInfo,
  ShippingAddress,
} = require("../db");
module.exports = router;


//this will be used to check if a guests payment information matches an existing users email
router.put("/notLogged", async (req, res, next) => {
  try {

    let exists = await User.findOne({
      where: { email: req.body.email },
    });

    if (exists) {
      res
        .status(401)
        .send(
          "Email is already registered to an account, please login to continue checkout"
        );
      return;
    } else {
      let newCart = await ShoppingCart.create({
        userEmail: req.body.email,
        orderFilled: true,
      });
      res.send(newCart);
    }
  } catch (err) {
    next(err);
  }
});

//generates a list of users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just

      // send everything to anyone who asks!
      attributes: ["id", "username", "email", "isAdmin"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});


//gets specific user information
router.get("/:id", async (req, res, next) => {
  try {
    const users = await User.findOne({
      where: { id: req.params.id },
      attributes: ["id", "username", "email", "address", "isAdmin"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//allows for changing user information
router.put("/:id", async (req, res, next) => {
  try {
    const users = await User.findOne({
      where: { id: req.params.id },
    });

    await users.update(req.body);
    res.json(users);
  } catch (err) {
    next(err);
  }
});
