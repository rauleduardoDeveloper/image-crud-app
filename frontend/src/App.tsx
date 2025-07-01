import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


 
const BASE_URL = process.env.REACT_APP_BASE_URL;
 
type Image = {
  id: number;
  filename: string;
  storedName: string;
  path: string;
  mimetype: string;
  size: number;
  uploadedAt: string;
};

function App() {
const [images, setImages] = useState<Image[]>([]);
const [searchQuery,setSearchQuery]=useState<String>("")

 

  const fileInputRef=useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
const openFileSelector=()=>{
 
fileInputRef.current?.click();
 
 
}

const getImages=async(searchQuery?:String)=>{
  try{

    const response=await axios.get(`${BASE_URL}/api/images`,{
      params: {
        search: searchQuery || "",
      },
    })
    setImages(response?.data?.images)
    

  }catch(error){
   toast.error("Something Went Wrong")
  }
}

  const handleSubmit = async(e: React.ChangeEvent<HTMLInputElement>) => {
    try{
      const file = e.target.files?.[0];
      
      if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed!');
      return;
    }

        
        const formData=new FormData()
        formData.append('file',file)

        const response=await axios.post(`${BASE_URL}/api/images`,formData,{
             headers: {
        'Content-Type': 'multipart/form-data',
      },
        })

     setImages((prev:any) => [...prev, response?.data?.image]);
          toast.success("Image Uploaded Successfully")
    
    
    }catch(error){
      toast.error("Something Went Wrong")
    }
  };

  const deleteImage=async(id:number)=>{
    try{

      const response=await axios.delete(`${BASE_URL}/api/images/${id}`)

   setImages((prevImages:any) => prevImages.filter((image:Image) => image.id !== response?.data?.image?.id));
      
    }catch(error){
     
  toast.error("Error Deleting Image")
    }
  }
   useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      getImages(searchQuery);
    }, 500); 
  }, [searchQuery]);
useEffect(()=>{
  getImages()
},[])
  return (
 <div className='w-100 min-vh-100 d-flex flex-column px-4'>
  <Toaster position="bottom-right" reverseOrder={false} />

  <div className='row my-3 gy-2 justify-content-lg-between'>
    <div className='col-12 col-lg-3 col-md-8'>
      <input
        type='text'
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search images...'
        className='form-control w-100'
      />
    </div>
    <div className='col-12 col-lg-3 col-md-4 d-flex justify-content-md-end'>
      <button type='button' className='btn btn-primary w-100 w-md-auto' onClick={openFileSelector}>
        Upload
      </button>
    </div>
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleSubmit}
      style={{ display: 'none' }}
      accept="image/*"
    />
  </div>
 


    <div className="row g-2 my-5">
{images.length > 0 && (
  <div className="d-flex align-items-center mb-2 text-secondary">
    <span className="fw-semibold">{images.length}</span>&nbsp;
    <span>{images.length === 1 ? 'image' : 'images'} found</span>
  </div>
)}


  {images.length>0? (images?.map((item: Image, index: number) => (
   <div key={index} className="col-12 col-sm-6 col-md-4 position-relative mb-3">
     <button
        type="button"
        className="btn btn-sm position-absolute top-0 end-0 m-2 "
        title="Delete Image"
        onClick={()=>{deleteImage(item.id)}}
      >
     <svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="red"
  className="bi bi-trash"
  viewBox="0 0 16 16"
>
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6zm2.5-.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z"/>
  <path
    fillRule="evenodd"
    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2H5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1h2.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3a.5.5 0 0 0 0 1H13.5a.5.5 0 0 0 0-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5z"
  />
</svg>

      </button>
 <img
  src={`${BASE_URL}${item?.path}`}
  className="rounded shadow-sm object-fit-cover w-100"
  alt={`${item?.id}`}
  style={{ height: '300px', objectFit: 'cover' }}
/>


      </div>
 
  ))):(<div className='d-flex align-items-center justify-content-center '><p>No Images Found</p></div>)}
</div>

    </div>
  );
}

export default App;
