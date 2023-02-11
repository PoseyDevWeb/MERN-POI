const PoiController = require("../models/poi.model");

// Create and Save a new Tutorial

exports.create = (req, res) => {
  // remplacer l'adresse par la longitude et l'altitude

  // Create a POI
  const poi = new PoiController({
    nom: req.body.nom,
    email: req.body.email,
    statut: req.body.statut,
    adresse: req.body.adresse,
    typePoi: req.body.typePoi,
  });

  // Save POI in the database
  poi
    .save(poi)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the POI.",
      });
    });
};

// Retrieve all POI from the database.
exports.findAll = (req, res) => {
  const nom = req.query.nom;
  var condition = nom
    ? { nom: { $regex: new RegExp(nom), $options: "i" } }
    : {};

  PoiController.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving POI.",
      });
    });
};

// Find a single POI with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  PoiController.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Poi with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Poi with id=" + id });
    });
};

// Update a Poi by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  PoiController.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe POI was not found!`,
        });
      } else res.send({ message: "POI was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating POI with id=" + id,
      });
    });
};

// Delete a POI with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  PoiController.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete POI with id=${id}. Maybe POI was not found!`,
        });
      } else {
        res.send({
          message: "POI was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete POI with id=" + id,
      });
    });
};

// Delete all POI from the database.
exports.deleteAll = (req, res) => {
  PoiController.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} POI were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all POI.",
      });
    });
};

// Find all inline POI
