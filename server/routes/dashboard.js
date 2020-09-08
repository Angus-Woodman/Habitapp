const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db/db");

router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      // "SELECT user_name FROM users WHERE user_id = $1",
    //   'SELECT * FROM habits WHERE user_id = $1',
    'SELECT users.user_name, habits.habit, habits.frequency FROM habits LEFT JOIN users ON habits.user_id = users.user_id WHERE habits.user_id = $1',
      [req.user]
    );
    // console.log(req.user)
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// router.get('/userdata', async (req, res) => {
//   // console.log('hello')
//     try {
//         const user = await pool.query(
//         'SELECT * FROM habits WHERE user_id = $1',
//          [req.user]
//         );
//         console.log[user.rows[0]]
//         // console.log(res.json(user))
//         // console.log(user)
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send('Server Error')
//     }
// })

module.exports = router;
