import express from "express";
import expressFileUpload from "express-fileupload"
import cors from "cors";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";
import vacationsRoutes from "./6-routes/vacations-routes";
import authRutes from "./6-routes/auth-routes";

const server = express();

server.use(cors());
server.use(express.json());

// Get files sent by the front into request.files object: 
server.use(expressFileUpload());
server.use("/api",vacationsRoutes );
server.use("/api", authRutes);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
