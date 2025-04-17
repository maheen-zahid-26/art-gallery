const express = require("express");
const cors = require("cors");
const customerRoutes = require("./Routes/CustomerRoutes");
const artistRoutes = require("./Routes/ArtistRoutes");
const homeRoutes = require("./Routes/HomeRoutes"); 
const adminRoutes = require("./Routes/AdminRoutes");

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use('/uploads', express.static('uploads'));

app.use("/homePage", homeRoutes);
app.use("/customers", customerRoutes);
app.use("/artists", artistRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
