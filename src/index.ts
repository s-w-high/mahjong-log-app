import App, { getDefaultApp } from "./app";
import DatabaseConnectionManager from "./database";

const APP_SECRET =
  process.env.APP_SECRET ||
  "5s5seA2~JaFq'#%x}pN9iD@Sv+^bD7K,qf}9<VvwaXzyuDj@ez%xWmtr27Aikz1";
const { setupServer } = require("./server");

const PORT = process.env.PORT || 3000;
const app = setupServer();
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

DatabaseConnectionManager.connect().then(() => {
  const app: App = getDefaultApp(APP_SECRET);
  app.start();
});
