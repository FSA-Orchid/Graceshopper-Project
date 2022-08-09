
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




router.get("/:id/payment", async (req, res, next) => {
  try {
    const payments = await PaymentInfo.findAll({
      where: { userId: req.params.id },
      attributes: {exclude: ["cardNumber"]},
    });
    res.send(payments);
  } catch (err) {
    next(err);
  }
});

//post routes for payment and shipping information
router.post("/:id/payment", async (req, res, next) => {
  try {
    let body = req.body
    const payment = await PaymentInfo.create({
      name: body.name,
      state: body.state,
      city: body.city,
      zipCode: 1*body.zipCode,
      apartmentNumber: body.apartmentNumber,
      streetAddress: body.streetAddress,
      userId: req.params.id,
      cardNumber: body.cardNumber,
      securityCode: body.securityCode,
      expirationDate: body.expirationDate,
      cardType: body.cardType,
    });
    res.send(payment);
  } catch (err) {
    next(err);
  }
});


//will remove payment info from user
router.put("/paymentUp", async (req, res, next) => {
  try {
    let payment = await PaymentInfo.findOne({
      where: { id: req.body.payment.id },
    });
    payment.update(req.body.payment);
    res.send(payment);
  } catch (err) {
    next(err);
  }
});

router.put("/:id/payment", async (req, res, next) => {
  try {
    let payment = await PaymentInfo.findOne({
      where: { id: req.body.payment.id, userId: req.params.id },
    });
    payment.update({ payment: null });
    res.send(payment);
  } catch (err) {
    next(err);
  }
});
