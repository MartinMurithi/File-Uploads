const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING);
        console.log('DB Connected');
    } catch (err) {
        console.log(`An error ${err} occurred`);
    }
}

module.exports = dbConnect;