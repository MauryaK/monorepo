import dotenv from "dotenv";
import app from "./app";
dotenv.config();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    return `🚀 API running on port ${PORT}`
});
// const server = app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

// process.on("SIGTERM", () => {
//     console.log("SIGTERM signal received: closing HTTP server");
//     server.close(() => {
//         console.log("HTTP server closed");
//     });
// });
