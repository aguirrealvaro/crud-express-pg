const express = require("express");
const router = express();
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "crudpg",
  port: "5432",
});

/*----------------------GET-----------------------------*/

router.get("/", async (req, res) => {
  const users = await pool.query("SELECT * FROM users");
  res.status(200).send({ cantidad: users.rows.length, users: users.rows });
});

/* router.get("/:id_user", async (req, res) => {
  const user = await pool.query(`
        SELECT *
        FROM users
        WHERE users.id = ${req.params.id_user};
    `);
  res.status(200).send({ user: user.rows });
}); */

router.get("/:id_user", async (req, res) => {
  const user = await pool.query(
    `
          SELECT *
          FROM users
          WHERE users.id = $1;
      `,
    [req.params.id_user]
  );
  res.status(200).send({ user: user.rows });
});

/*----------------------POST-----------------------------*/

router.post("/", async (req, res) => {
  const { nombre, email } = req.body;
  const newUser = await pool.query(
    `
        INSERT INTO users(nombre, email)
        VALUES ($1, $2);
    `,
    [nombre, email]
  );
  res.status(200).send({
    msg: "User added",
    body: {
      user: {
        nombre,
        email,
      },
    },
  });
});

/*-------------------------PUT------------------------------*/

router.put("/:id_user", async (req, res) => {
  const { nombre, email } = req.body;
  const userEdited = await pool.query(
    `
        UPDATE users
        SET nombre=$1, email=$2
        WHERE id=$3
    `,
    [nombre, email, req.params.id_user]
  );
  res.status(200).send({
    msg: "User edited",
    body: {
      user: {
        nombre,
        email,
      },
    },
  });
});

/*-------------------------DELETE------------------------------*/

router.delete("/:id_user", async (req, res) => {
  const userDeleted = await pool.query(
    `
        DELETE
        FROM users
        WHERE id=$1
    `,
    [req.params.id_user]
  );
  res.status(200).send({
    msg: "User deleted",
  });
});

module.exports = router;
