const mongoose = require("mongoose");

const connect = () =>{
    return mongoose.connect(`mongodb+srv://mitul:mamaearth@cluster0.3bb01.mongodb.net/MamaEarth?retryWrites=true&w=majority`)
}

module.exports = connect;