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
 

 

  const fileInputRef=useRef<HTMLInputElement>(null)
  
const openFileSelector=()=>{
 
fileInputRef.current?.click();
 
 
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

  
   
  
 
  return (
 <div className='w-100 min-vh-100 d-flex flex-column px-4'>
  <Toaster position="bottom-right" reverseOrder={false} />

  <div className='row my-3 gy-2 justify-content-lg-between'>
    <div className='col-12 col-lg-3 col-md-8'>
      <input
        type='text'
     
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
 


   

    </div>
  );
}

export default App;
