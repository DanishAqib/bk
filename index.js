const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES
//create students
app.post("/students", async (req, res) => {
  try {
    const { id, first_name, last_name } = req.body;
    const newStudent = await pool.query(
      `INSERT INTO students(id, first_name, last_name) VALUES (${id}, '${first_name}','${last_name}') RETURNING *`
    );
    res.json(newStudent);
  } catch (error) {
    console.log(error.message);
  }
});

//create books
app.post("/books", async (req, res) => {
  try {
    const {
      book_id,
      book_name,
      book_author,
      borrowed_by,
      date_of_borrow,
      date_of_return,
    } = req.body;
    const newBook = await pool.query(
      `INSERT INTO books(book_id, book_name, book_author, borrowed_by, 
        date_of_borrow, date_of_return) VALUES (${book_id},'${book_name}', '${book_author}', '${borrowed_by}', '${date_of_borrow}', '${date_of_return}') RETURNING *`
    );
    res.json(newBook);
  } catch (error) {
    console.log(error.message);
  }
});

//get all students
app.get("/students", async (req, res) => {
  try {
    const allStudents = await pool.query("SELECT * from students");
    res.json(allStudents.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get all books
app.get("/books", async (req, res) => {
  try {
    const allBooks = await pool.query("SELECT * from books");
    res.json(allBooks.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//edit student
app.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name } = req.body;
    const updateStudent = await pool.query(
      `UPDATE students SET first_name='${first_name}', last_name='${last_name}' where id=${id}`
    );
    res.json("UPDATED");
  } catch (error) {
    console.log(error.message);
  }
});

//edit book
app.put("/books/:book_id", async (req, res) => {
  try {
    const { book_id } = req.params;
    const {
      book_name,
      book_author,
      borrowed_by,
      date_of_borrow,
      date_of_return,
    } = req.body;
    const updateBook = await pool.query(
      `UPDATE books SET book_name='${book_name}', book_author='${book_author}', borrowed_by='${borrowed_by}', date_of_borrow='${date_of_borrow}', date_of_return='${date_of_return}' where book_id=${book_id}`
    );
    res.json("UPDATED");
  } catch (error) {
    console.log(error.message);
  }
});

//delete student
app.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStudent = await pool.query(
      `DELETE FROM students WHERE id=${id}`
    );
    res.json("DELETED");
  } catch (error) {
    console.log(error.message);
  }
});

//delete book
app.delete("/books/:book_id", async (req, res) => {
  try {
    const { book_id } = req.params;
    const deleteBook = await pool.query(
      `DELETE FROM books WHERE book_id=${book_id}`
    );
    res.json("DELETED");
  } catch (error) {
    console.log(error.message);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`server started on port ${PORT}`);
});
