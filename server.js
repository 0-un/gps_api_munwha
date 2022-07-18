const express = require("express");

const server = express();
passportConfig();
// 헤로쿠에서 랜덤으로 부여하기 위해서 사용되는 포트 번호 || 로컬에서 포트 번호
const PORT = process.env.PORT || 9077;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRoutuer = require('./routes/auth');
const logoutRouter = require('./routes/logout');
const passportConfig = require('./passport');
const passport = require('passport');
const session = require('express-session');

server.set("view engine", "ejs");
server.set("views", process.cwd() + "/client/html");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/client", express.static("client"));


server.use(express.static(path.join(__dirname, 'public')));
server.use(express.static(path.join(__dirname, 'views')));
server.use(express.static(path.join(__dirname, 'assets')));



//social auth
server.use(session({
 
  resave:false,
  saveUninitialized:true,
  secret:process.env.SECRET
 
}));
server.use(passport.initialize())
server.use(passport.session());

server.use('/', indexRouter);
server.use('/users', usersRouter);
server.use('/auth',authRoutuer);
server.use('/logout',logoutRouter);



// let db = [ "MUSEUM", "SKYMARU", "BREAD", "B612", "GAMNAE", "GREEN", "DOGHOUSE", "SALT",
//               "EOSEULLEONG", "STAIR180", "PLATFORM", "DRAMA", "MUNWHA", "CLOUDSTAIR", "STAR100", "LEEJUNGSEOB", 
//               "MOVIE", "DUREBAK", "GGOMAK", "OBSERVATORY", "ROAD", "TUNNEL",];
let db = ["MUSEUM", "SKYMARU", "BREAD", "B612","EOSEULLEONG", "STAIR180", "PLATFORM"];
// db 체크
console.log(db);

server.get("/", function (req, res) {
  res.render("splash");
});
server.get("/login", function (req, res) {
  res.render("login");
});
server.get("/home", function (req, res) {
  res.render("home");
});
server.get("/greet1", function (req, res) {
  res.render("greet1");
});
server.get("/greet2", function (req, res) {
  res.render("greet2");
});
server.get("/greet3", function (req, res) {
  res.render("greet3");
});
server.get("/course1", function (req, res) {
  res.render("course1", { db: db });
});
server.get("/course2", function (req, res) {
  res.render("course2", { db: db });
});
server.get("/course3", function (req, res) {
  res.render("course3", { db: db });
});
server.get("/all_stamp", function (req, res) {
  res.render("all_stamp", { db: db });
});
server.get("/stamp1", function (req, res) {
  res.render("stamp1", { db: db });
});
server.get("/stamp2", function (req, res) {
  res.render("stamp2", { db: db });
});
server.get("/stamp3", function (req, res) {
  res.render("stamp3", { db: db });
});
server.get("/qr", function (req, res) {
  res.render("qr", { db: db });
});
server.post("/qr", function (req, res) {
  const type = req.body.type;
  if (db.indexOf(type) === -1) {
    db.push(type);
  }
  console.log(db);
  res.send({ success: true });
});

server.get("/test", function (req, res) {
  res.render("test");
});









// 실습
//Allow CORS: Access-Control-Allow-Origin
/*
server.get("/test", function (req, res) {
  res.render("test");
});
*/
server.post("/ajax/query", function (req, res) {
  const apiKey = req.query.api_key;
  if (!apiKey || apiKey !== "node") {
    return res.send({ msg: "api키를 확인해주세요" });
  }
  return res.send({ msg: "성공하셨습니다" });
});
server.post("/ajax/body", function (req, res) {
  const getData = req.body.data;
  let msg = "여러분이 보낸 값은 " + getData + " 입니다.";
  return res.send({ msg: msg });
});

server.listen(PORT, function () {
  console.log("로컬서버오픈: http://localhost:" + PORT);
});
