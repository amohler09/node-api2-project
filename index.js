//  STEP THREE

//  import server from server.js
const server = require('./api/server.js');

//  define a port
const PORT = 5002;

//  set up server to listen
server.listen(PORT, () => {
    console.log((`\n***Server Running on Port ${PORT}*** \n`))
})