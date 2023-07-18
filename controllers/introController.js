const Identity = require("../models/contactModel");

class IntroController {
  async getallIdentity(req, res) {
    console.log("The request body is");
    const allIdentity = await Identity.find();
    res.status(200).json(allIdentity);
  };

  async createIdentity(req, res) {
    console.log("The request body is:", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400)
      throw new Error("All fields are mandatory !")
    }

    const identity = await Identity.create({
      name,
      email,
      phone,
    });
    res.status(201).json(identity);
  };

  async getIdentity(req, res) {
    const identity = await Identity.findById(req.params.id);
    if (!identity) {
      res.status(404);
      throw new Error("Identity not found");
    }
    res.status(201).json(identity);
  };

  async updateIdentity(req, res) {
    const identity = await Identity.findById(req.params.id);
    if (!identity) {
      res.status(404);
      throw new Error("Identity not found");
    }

    const updateIdentity = await Identity.findByIdUpdate(
      req.params.id,
      req.body,
      { new: true }
    );


    res.status(201).json(updateIdentity);
  };

  async deleteIdentity(req, res) {
    res.status(201).json({ message: `Delete identity for ${req.params.id}` });
  };
}

module.exports = new IntroController();