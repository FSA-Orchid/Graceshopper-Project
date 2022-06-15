const router = require("express").Router();
const { User, ShoppingCart, Product, OrderProducts } = require("../db");



router.get("/:id", async (req, res, next) => {
  try {
    const order = await ShoppingCart.findAll({
        model: ShoppingCart,
        where: {
          orderFilled: 'true',
          userId: req.params.id
        },
        include:
          Product
    });

    if(!order){
     res.status(404).send('No Order History Found')
    }
    else {
    res.send(order);
    }
    //we want to return an array of items for the cart page, OR we can return the whole user.
  } catch (err) {
    next(err);
  }
});

router.post("/notLogged/:cartid", async (req,res,next) => {
  try{
    OrderProducts.create({

    })
  }
  catch(err) {
    next(err)
  }
})
module.exports = router;
