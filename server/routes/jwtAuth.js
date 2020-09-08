const router = require("express").Router();
const pool = require("../db/db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validinfo")
const authorize = require("../middleware/authorize")

//Registering
router.post ("/register", validInfo, async (req,res) => {
  try {
    // 1. destructure the req.body (name, email, password)
    const {name, email, password} = req.body;

    // 2. Check if user exists (if true then throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1 OR user_name = $2", [email, name]);
    if(user.rows.length !== 0) {
      return res.status(401).json("User already exists")
    }

    // 3. Bcrypt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. enter the new user inside our database
    const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword])

    // 5. generating our jwt token
    const token = jwtGenerator(newUser.rows[0].user_id)
    res.json({token})

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error")
  }
})

router.post("/login", validInfo, async (req, res) => {
    try {
        // 1. Destructure req.body
        const { email, password } = req.body;
        // 2. Check if user doesnt exist (if not, throw err)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if(user.rows.length === 0) {
            return res.status(401).json("Password or email is incorrect");
        }
        // 3. check if incoming password is the same as the db password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

        if (!validPassword) {
          return res.status(401).json("Invalid Credential");
        }
        // 4. give them the jwt token
        const token = jwtGenerator(user.rows[0].user_id)
        res.json({token})

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.get("/is-verify", authorize, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error")
  }
})

module.exports = router;
