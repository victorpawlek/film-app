const db = require('../db');

async function getFilme() {
  const { rows } = await db.query('SELECT * FROM filme');
  return rows
}

async function changeStatusFilm(id, status) {
  const { rows } = await db.query('UPDATE filme SET status = $1 where id= $2 returning *', [
    status,
    id,
  ]);
  return {
    code: 200,
    data: rows,
  };
}

async function deleteFilm(id) {
  await db.query('DELETE fromm filme where id= $1', [id]);
  return getFilme();
}

async function addFilm(data) {
  const Filme = await getFilme();
  const id = Math.max(...Filme.data.map((Film) => Film.id)) + 1;
  const { rows } = await db.query(
    'INSERT INTO Filme (id,title ,image ,status ,price ,miles ,year_of_make ,description ,owner) VALUES($1, $2, $3, $4,$5,$6,$7,$8,$9) returning *',
    [
      id,
      data.title,
      data.image,
      data.status,
      data.price,
      data.miles,
      data.year_of_make,
      data.description,
      data.owner,
    ],
  );
  return {
    code: 200,
    data: rows,
  };
}

module.exports = { getFilme, changeStatusFilm, deleteFilm, addFilm };
