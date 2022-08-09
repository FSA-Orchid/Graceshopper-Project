
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




//this route will set the cart to being an archive of the order and will change quantites
router.put("/:id/cart/complete", async (req, res, next) => {
  try {
    let cart = await ShoppingCart.findOne({
      where: {
        userId: req.params.id,
        orderFilled: "false",
      },
      include: Product,
    });
    if (!cart) {
      res.status(404).send("There is no order to fulfill");
    }

    //closes the order
    let finalCart = await cart.set({
      orderFilled: "true",
      shippingInfoId:req.body.shipping,
      paymentInfoId: req.body.payment
    });

    //item inventory gets updated

    finalCart.products.map(async (product) => {
      await product.set({
        inventory: product.inventory - product.orderProduct.inventory,
      });
      await product.save();
    });
    await finalCart.save();
    await ShoppingCart.create({
      userId: req.params.id,
    });
    //just to make sure it saves, will check if redundant

    res.send(finalCart);
  } catch (err) {
    next(err);
  }
});



router.put("/notLoggedShipping", async (req, res, next) => {
  try {
    let shipping = await ShippingAddress.create(req.body.shipping)
    res.send(shipping);
  } catch (err) {
    next(err);
  }
});
