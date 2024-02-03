const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const data = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
// url/api/categories/
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const data = await Category.findByPk(req.params.id);

    if (!data) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const data = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = await Category.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({ message: 'No category found with that id!' });
    }

    await data.update({
      category_name: req.body.category_name
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const display = await Category.findByPk(req.params.id);
    const data = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(`The ${display.category_name} category has been deleted!`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
