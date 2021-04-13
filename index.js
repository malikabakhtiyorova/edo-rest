const express = require('express')
const { rows, row } = require('./pg')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 4002
const { sign, verify } = require('./jwt')

app.use(cors())
app.use(express.json())

// app.use((req, res, next) => {
//   let accessToken = req.headers.token

//   if (!accessToken) {
//     return res.status(403).send()
//   }

//   let payload
//   try {
//     payload = verify(accessToken)
//     next()
//   }
//   catch (e) {
//     return res.status(401).send()
//   }
// })

// /users - role {superadmin, admin(filialdan-filialga ma'lumot yuboradi), guest}
// /documents
// /branches
// /departments

app.get('/documents', async (req, res) => {
  try {
    let { p: page = null, l: limit = null } = req.query

    let tables = await rows("select f.file_id, f.file_name, f.file_extension, d.document_created_at, u.user_username as receiver, c.correspondent_name as sender from files as f join documents as d on d.document_id = f.document_id join users as u on u.user_id = d.user_id join correspondents as c on c.correspondent_id = d.correspondent_id limit $1 offset ($2 - 1) * $1;", limit, page)
    res.status(200).send(tables)
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
});

app.get('/branches', async (req, res) => {
  try {
    let { p: page = null, l: limit = null } = req.query

    let tables = await rows("select b.branch_id, b.branch_name, b.branch_is_main from branches as b limit $1 offset ($2 - 1) * $1;", limit, page)
    res.status(200).send(tables)
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
})

app.get('/departments/:id', async (req, res) => {
  try {
    let { p: page = null, l: limit = null } = req.query
    let { id: id } = req.params
    let tables = await rows("select d.department_id, d.department_name, b.branch_name, b.branch_is_main from departments as d join branches as b on b.branch_id = d.branch_id where b.branch_id = $3 limit $1 offset ($2 - 1) * $1;", limit, page, id)
    res.status(200).send(tables)
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
})

app.get('/departments', async (req, res) => {
  try {
    let { p: page = null, l: limit = null } = req.query
    let tables = await rows("select d.department_id, d.department_name, b.branch_name, b.branch_is_main from departments as d join branches as b on b.branch_id = d.branch_id limit $1 offset ($2 - 1) * $1;", limit, page)
    res.status(200).send(tables)
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
})

app.get('/users', async (req, res) => {
  try {
    let { p: page = null, l: limit = null } = req.query
    let tables = await rows("select u.user_id, u.user_username, u.user_gender, s.staff_role as user_role, b.branch_name, d.department_name from staff as s join users as u on u.user_id = s.user_id join departments as d on d.department_id = s.department_id join branches as b on b.branch_id = d.branch_id limit $1 offset ($2 - 1) * $1;", limit, page)
    res.status(200).send(tables)
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    let { id } = req.params
    let table = await row("select u.user_id,u.server_id, u.user_username, u.user_gender, s.staff_role as user_role, b.branch_name, d.department_name from staff as s join users as u on u.user_id = s.user_id join departments as d on d.department_id = s.department_id join branches as b on b.branch_id = d.branch_id where u.server_id = $1;", id)
    res.status(200).send(table)
  } catch (e) {
    console.log(e)
    res.status(500).end()
  }
})

app.post('/users', async (req, res) => {

  console.log(req.body)

  try {
    // let { user_password } = verify(req.headers.token)
    let { user_username, server_id,user_password,user_gender } = req.body

    const user = await row('insert into users (user_username, server_id, user_password, user_gender) VALUES ($1, $2, $3, $4) returning *;', user_username, server_id,user_password,user_gender)

    res.status(201).send(user)
  } catch (e) {
    res.status(501).send({ message: e.message })
  }
})

app.post('/departments', async (req, res) => {

  console.log(req.body)

  try {
    // let { user_password } = verify(req.headers.token)
    let { department_name, branch_id } = req.body

    const department = await row('insert into departments (department_name, branch_id) VALUES ($1, $2) returning *;', department_name, branch_id)

    res.status(201).send(department)
  } catch (e) {
    res.status(501).send({ message: e.message })
  }
})

app.post('/branches', async (req, res) => {

  console.log(req.body)

  try {
    // let { user_password } = verify(req.headers.token)
    let { branch_name,branch_is_main } = req.body

    const branch = await row('insert into branches (branch_name,branch_is_main) VALUES ($1, $2) returning *;', branch_name,branch_is_main)

    res.status(201).send(branch)
  } catch (e) {
    res.status(501).send({ message: e.message })
  }
})

app.post('/documents', async (req, res) => {

  console.log(req.body)

  try {
    // let { user_password } = verify(req.headers.token)
    let { server_id,correspondent_id } = req.body

    const document = await row('insert into documents (server_id,correspondent_id) VALUES ($1, $2) returning *;', server_id,correspondent_id)

    res.status(201).send(document)
  } catch (e) {
    res.status(501).send({ message: e.message })
  }
})


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));