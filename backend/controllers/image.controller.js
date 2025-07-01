
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

const getImages=(req,res)=>{
    try{
 
 const database=readDatabase()

  const searchQuery = req.query.search?.toLowerCase() || "";

  const filteredImages = database.images.filter((img) =>
      img.storedName.toLowerCase().includes(searchQuery)
    );
 res.status(200).json({"message":"Images Got Successfully",  images: filteredImages})

 

    }catch(error){
         console.log(error)
        return res.status(500).json({"message":"Internal Server Error"})
    }
}

const deleteImage=(req,res)=>{
    try{
 const id=Number(req.params.id)

 

 const database=readDatabase()
    
const  indexOfImage=database.images.findIndex((img)=>img.id===id)

const image=database.images[indexOfImage]

database.images.splice(indexOfImage,1)

writeDatabase(database)
 const filePath = path.join(uploadDir, image.storedName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

     return res.status(200).json({ message: "Image deleted successfully", image });

    }catch(error){
         console.log(error)
        return res.status(500).json({"message":"Internal Server Error"})
    }
}

module.exports = {
  postImage,getImages,deleteImage
};