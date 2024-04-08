const secret = "Q6OmHMkZn5rPy7zVbC3uoJ5aoyKkhsMT";
const db = require("../model");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  console.log(req.body);
  try {
    const user = new User({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    await user.save();

    let roles = [];
    if (req.body.roles) {
      roles = await Role.find({ name: { $in: req.body.roles } });
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      roles.push(defaultRole);
    }

    user.roles = roles.map((role) => role._id);
    await user.save();

    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles",
      "-__v"
    );

    if (!user) {
      return res.status(404).send({ message: "Email Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      secret,
      {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      }
    );

    const authorities = user.roles.map(
      (role) => "ROLE_" + role.name.toUpperCase()
    );

    res.status(200).send({
      // id: user._id,
      name: user.name,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
