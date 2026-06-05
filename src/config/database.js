const mongoose = require("mongoose");
const dns = require("dns");

// Set DNS servers to public resolvers to prevent querySrv ECONNREFUSED issues on Windows with certain ISPs
try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (err) {
    console.warn("Could not set DNS servers:", err.message);
}

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
