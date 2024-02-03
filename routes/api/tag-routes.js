const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll({
      // include: [{ model: Product }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!data) {
      res.status(404).json({ message: 'No tags found with that id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const data = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const data = await Tag.findByPk(req.params.id);

    if (!data) {
      return res.status(404).json({ message: 'No tag found with that id!' });
    }

    await data.update({
      tag_name: req.body.tag_name
    });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const display = await Tag.findByPk(req.params.id);
    const data = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(`The ${display.tag_name} tag has been deleted!`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
