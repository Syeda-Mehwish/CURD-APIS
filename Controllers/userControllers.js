const users = require("../modals/userSchema");
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { firstname, email, password, mobile, gender, status } = req.body;
  if (!firstname || !email || !password || !mobile || !gender || !status) {
    res.status(400).json({ error: "All fields are mandatory!" });
  }
  const userAvailable = await users.findOne({ email: email });
  if (userAvailable) {
    res.status(400).json({ error: "This user already exist in our databse" });
  } else {
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const dateCreate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    const userData = new users({
      firstname,
      email,
      password: hashedPassword,
      mobile,
      gender,
      status,
      datecreated: dateCreate,
    });
    const user = await userData.save();

    console.log(`User created ${user}`);
    if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
    } else {
      res.status(400).json({ error: "User data is not valid" });
    }
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "All fields are mandatory!" });
  }
  const foundUser = await users.findOne({ email });
  //compare password with hashedpassword
  if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: foundUser.username,
          email: foundUser.email,
          id: foundUser.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ error: "email or password is not valid" });
  }
};

// create user
exports.userpost = async (req, res) => {
  const { firstname, email, mobile, gender, status } = req.body;

  if (!firstname || !email || !mobile || !gender || !status) {
    res.status(400).json({ error: "All Input Is required" });
  }

  try {
    const preuser = await users.findOne({ email: email });
    if (preuser) {
      res.status(400).json({ error: "This user already exist in our databse" });
    } else {
      const dateCreate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

      const userData = new users({
        firstname,
        email,
        mobile,
        gender,
        status,
        datecreated: dateCreate,
      });

      await userData.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

// get all users
exports.getUsers = async (req, res) => {
  const search = req.query.search || "";
  const status = req.query.status || "";
  const gender = req.query.gender || "";
  const sort = req.query.sort || "";
  const page = req.query.page || 1;
  const ITEM_PER_PAGE = req.query.iteams || 4;

  const query = {
    firstname: { $regex: search, $options: "i" },
  };

  if (status !== "All") {
    query.status = status;
  }

  if (gender !== "All") {
    query.gender = gender;
  }

  try {
    // skip
    const skip = (page - 1) * ITEM_PER_PAGE;

    // count Document
    const count = await users.countDocuments(query);

    const usersData = await users
      .find(query)
      .sort({ datecreated: sort == "new" ? -1 : 1 })
      .limit(ITEM_PER_PAGE)
      .skip(skip);

    // api example: http://localhost:3000/users/?search=m&status=All&gender=female&sort=&page=1&iteams=2

    const pageCount = Math.ceil(count / ITEM_PER_PAGE);

    res.status(200).json({
      pagination: {
        count: pageCount,
      },
      usersData,
    });
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

// get single user
exports.getSingleuser = async (req, res) => {
  const { id } = req.params;

  try {
    const singleUserData = await users.findOne({ _id: id });

    res.status(200).json(singleUserData);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

// delete user
exports.deleteuser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUserData = await users.findByIdAndDelete({ _id: id });

    res.status(200).json(deleteUserData);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};

// update user

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstname, email, mobile, gender, status } = req.body;

  try {
    const dateUpdate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    const updateUserdata = await users.findByIdAndUpdate(
      { _id: id },
      {
        firstname,
        email,
        mobile,
        gender,
        status,
        dateUpdated: dateUpdate,
      },
      { new: true }
    );

    await updateUserdata.save();

    res.status(200).json(updateUserdata);
  } catch (error) {
    res.status(400).json(error);
    console.log("catch block error");
  }
};
