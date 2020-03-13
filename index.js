require('dotenv').config();
//  STEP THREE

//  import server from server.js
const server = require('./api/server.js');

//  define a port
const port = process.env.PORT || 5000;

//  set up server to listen
server.listen(port, () => {
    console.log((`\n***Server Running on Port ${port}*** \n`))
})