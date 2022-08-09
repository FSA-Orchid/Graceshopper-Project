
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


router.get("/:id/shipping", async (req, res, next) => {
  try {
    const shipments = await ShippingAddress.findAll({
      where: { userId: req.params.id },
    });
    res.send(shipments);
  } catch (err) {
    next(err);
  }
});

router.post("/:id/shipping", async (req, res, next) => {
  try {
    let body = req.body

    const shipping = await ShippingAddress.create({
      firstName: body.firstName,
      lastName: body.lastName,
      state: body.state,
      email: body.email,
      city: body.city,
      zipCode: 1*body.zipCode,
      apartmentNumber: body.apartmentNumber,
      streetAddress: body.streetAddress,
      userId: req.params.id,
    });

    res.send(shipping);
  } catch (err) {
    next(err);
  }
});

//In reality will remove the address from user
router.put("/shippingUp", async (req, res, next) => {
  try {
    let shipping = await ShippingAddress.findOne({
      where: { id: req.body.shipping.id },
    });
    shipping.update(req.body.shipping);
    res.send(shipping);
  } catch (err) {
    next(err);
  }
});


router.put("/:id/shipping", async (req, res, next) => {
  try {
    let shipping = await ShippingAddress.findOne({
      where: { id: req.body.shipping.id, userId: req.params.id },
    });
    shipping.update({ userId: null });
    res.send(shipping);
  } catch (err) {
    next(err);
  }
});
