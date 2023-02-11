const { mongoose } = require("mongoose");
const { isEmail } = require("validator");

var schema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    lowercase: true,
    unique: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  typePoi: {
    type: String,
    required: true,
  },
  statut: {
    type: String,
    required: true,
  },

  etat: {
    type: String,
    required: false,
  },
});

const Poi = mongoose.model("poi", schema);
module.exports = Poi;
