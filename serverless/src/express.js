// Creates an express server to host the app in development when running via npm run start:express
// You can delete this file if you use moovsdk to run your app (npm start)

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import theme from "../../src/theme";
import model from "../../src/AppModel";
import App from "../../src/App";
import router from "../../src/routes";
import Server from "react-storefront/Server";
import reactStorefrontMiddleware from "react-storefront-middleware";
import paths from "../../config/paths";
import path from "path";

const app = express();

const staticPath = path.join(paths.clientBuild, paths.publicPath);
app.use(paths.publicPath, express.static(staticPath));

app.use(cors());
app.use(bodyParser.json());

app.use(
  reactStorefrontMiddleware(
    new Server({
      theme,
      model,
      App,
      router
    })
  )
);

// app.listen(process.env.PORT || 8500, () => {
//   console.log(
//     `[${new Date().toISOString()}]`,
//     chalk.blue(`App is running: 🌎 http://localhost:${process.env.PORT || 8500}`)
//   )
// })

export default app;
