const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); 
const imageRoutes=require("./routes/image.route")
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

 
app.use(cors());
app.use(express.json());

 
app.use('/api/images', imageRoutes);
app.use('/uploads', express.static('images'));

 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
