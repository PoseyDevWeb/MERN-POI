const poi = require("../controllers/poi.controller.js");

var router = require("express").Router();

// Create a new POI
router.post("/", poi.create);

// Retrieve all POI
router.get("/", poi.findAll);

// Retrieve a single POI with id
router.get("/:id", poi.findOne);

// Update a POI with id
router.put("/:id", poi.update);

// Delete a POI with id
router.delete("/:id", poi.delete);

// Create a new POI
router.delete("/", poi.deleteAll);

module.exports = router;
