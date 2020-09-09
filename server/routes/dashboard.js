const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db/db");

router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
        'SELECT users.user_name, habits.habit, habits.frequency FROM habits LEFT JOIN users ON habits.user_id = users.user_id WHERE habits.user_id = $1',
        [req.user]
    );
    // console.log(user.rows);
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
