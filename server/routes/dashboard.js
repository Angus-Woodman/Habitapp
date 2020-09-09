const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db/db");

router.get("/habits", authorize, async (req, res) => {
  try {
    const user = await pool.query(
        'SELECT users.user_name, users.user_id, habits.habit, habits.frequency FROM habits LEFT JOIN users ON habits.user_id = users.user_id WHERE habits.user_id = $1',
        [req.user]
    );
    // console.log(user.rows);
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/", authorize, async (req, res) => {
    try {
      const user = await pool.query(
        "SELECT user_name, user_id FROM users WHERE user_id = $1",
        [req.user]
      );
      res.json(user.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});

// doesn't work with authorize maybe need to set correct id 
router.post("/habits", async (req, res) => {
    try {
      const { id, habit, frequency } = req.body;
      const user = await pool.query(
        "INSERT INTO habits (user_id, habit, frequency) VALUES ($1, $2, $3)",
        [id, habit, frequency]
      );
      console.log(req.body)
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
});



module.exports = router;
