const router = require("express").Router();
const Product = require("../db/models/Product");

//GET "/api/products"

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

//GET /api/products/:productId
router.put("/:productId/amount", async (req, res, next) => {
  try {
    console.log('YOU FOUND ME')
    const product = await Product.findOne({
      where: {id: req.params.productId}
    });
    await product.set({
      inventory: product.inventory - req.body.inventory
        })
    res.send(product)
  } catch (error) {
    next(error);
  }
});





router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    if (!product) {
      res.status(404).send("Page Not Found");
    }
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/products/:productId

router.delete("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    await product.destroy();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// PUT /api/products/:productId


router.put("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.send(await product.update(req.body));
  } catch (error) {
    next(error);
  }
});

//POST /api/products/add

router.post("/add", async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
