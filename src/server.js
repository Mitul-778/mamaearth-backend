const app = require("./index")
const connect = require("./configs/db");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.listen(port, async()=>{
    try {
        await connect()
        console.log(`Listening on port ${port}!`)
    } catch (error) {
        console.log(error);
    }
})