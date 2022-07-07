const express = require('express');
// const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

var admin = require("firebase-admin");

var serviceAccount = require("./keys/key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(express.json());// express > 4.16
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const firestore = admin.firestore();

// app.route('/api/students').get((req, res) => {
//   console.log('students');
//     res.send([{ name: 'lilly', id:'id1' }, { name: 'Oscar', id:'id2' }]
//     );
// });

app.get("/", (request, response) => {
  response.send({
    message: "Hello Worlde",
  });
});

//get all item in colleciton
app.get("/api/:name", async function (request, response) {
  try {
    let params = request.params.name
    console.log(params);
    let querySnapshot = await firestore.collection(params).get();
    let datas = await querySnapshot.docs.map((value) => {
      let id = value.id;
      let temp = value.data();
      temp = { ...temp, docID: id }
      return temp;
    });
    console.log(datas);
    response.send(datas);
  } catch (err) {
    console.log(err);
    response.json(err);
  }

});

//insert 1 item to colletion
app.post("/api/:name", async (req,res) => {
  try{
    let params = req.params.name;
    let body = req.body;
    // let docName = body.data.Name.split(" ").join(""); "-" + Math.round(Math.random() * 10).toString();
    await firestore.collection(params).add(body);
    res.send({
      message:"Successs",
    });
  }catch(error){
    res.status(500).send(error);
  }
});

// update hoàn toàn dữ liệu mới
app.put("/api/:docID", async (request, response) => {
  let params = "students";
  let docId = request.params.docID;
  try {
    let result = await firestore.collection(params)
      .doc(docId)
      .set(request.body);
    response.send({
      message: "Update successful!!",
      updateTime: result.writeTime,
    })
  } catch (error) {
    response.send({
      error: error.toString(),
    });
  }
});

//xóa một doc bất kỳ
app.delete("/api/students/:docid", (request, response) => {
  let collectionName = "students";
  let docId = request.params.docid;
  try {
    firestore.collection(collectionName).doc(docId).delete();
    response.send({
      message: "Thành công!",
      // updateTime: docId.writeTime,
    });
  } catch (error) {
    response.send({
      message: error.toString(),
    });
  }
});

let PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server starting on http://127.0.0.1:${PORT} `);
});