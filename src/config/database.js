import mongoose from "mongoose";



const connectMongoDB = async () => {
    try {
        const PASS_MONGO = 'bLsveGKxfX2hEU9J'
        const DB_URL = `mongodb+srv://CoderBertonasco:${PASS_MONGO}@codercluster.2eipwd5.mongodb.net/e_commerce?retryWrites=true&w=majority&appName=CoderCluster`
        await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Conectado con MongoDB");
    } catch (error) {
        console.error("No se pudo conectar a la DB", error);
        process.exit();
    }
};

export default connectMongoDB