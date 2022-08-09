const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/carts", require("./shoppingCart"));
router.use("/users", require("./cart"));
router.use("/users", require("./checkout"));
router.use("/users", require("./payment"));
router.use("/users", require("./shipping"));


router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
