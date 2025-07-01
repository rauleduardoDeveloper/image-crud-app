
const fs =require("fs")
const path =require("path")
const db=path.join(__dirname,"../db.json")
const uploadDir = path.join(__dirname, "../images");

function readDatabase(){
     return JSON.parse(fs.readFileSync(db));
}

function writeDatabase(data) {
  fs.writeFileSync(db, JSON.stringify(data, null, 2));
}




const postImage=(req,res)=>{
    try{
if(!req.file){
    return res.status(404).json({"message":"No Image Found"})
}

 
const database=readDatabase()

  const newImage = {
    id: Date.now(),
    filename: req.file.originalname,
    storedName: req.file.filename,
    path: `/uploads/${req.file.filename}`,
    mimetype: req.file.mimetype,
    size: req.file.size,
    uploadedAt: new Date().toISOString()
  };

  database.images.push(newImage);
  writeDatabase(database);

  res.status(200).json({message:"Image Uploaded Successfully",image:newImage});

    }catch(error){
         console.log(error)
        return res.status(500).json({"message":"Internal Server Error"})
    }
}

 

module.exports = {
  postImage,getImages,deleteImage
};