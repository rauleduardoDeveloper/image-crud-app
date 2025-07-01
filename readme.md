# Image Upload App (MERN Stack)

A simple full-stack image upload and management app built with the **MERN stack** (MongoDB *replacement* via JSON Server, Express, React, Node.js). It allows users to **upload, view, search, and delete images** with a smooth UI powered by **Bootstrap**.

> Built in just 3–4 hours!

---

## Features

- Upload images from your local device
- View all uploaded images in a responsive grid
- Search images by name
- Delete any image
- Fast and lightweight: no database used!

---

## Tech Stack

| Technology     | Purpose                             |
|----------------|-------------------------------------|
| **React.js**   | Frontend UI                         |
| **Node.js**    | Backend runtime                     |
| **Express.js** | API handling                        |
| **Multer**     | Handle image file uploads           |
| **JSON Server**| Acts as a mock database (`db.json`) |
| **Bootstrap**  | Styling and layout                  |
| **Axios**      | HTTP requests (GET, POST, DELETE)   |

---

#  Folder Structure

```bash
Image-Upload-App/
├── frontend/  
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── App.test.tsx
│   │   ├── index.css
│   │   ├── index.tsx
│   │   └── logo.svg
│   ├── .env                   
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── .gitignore
│
├── backend/  
│   ├── controllers/
│   │   └── image.controller.js
│   ├── routes/
│   │   └── image.route.js
│   ├── images/               # Stored image files
│   ├── index.js  
│   ├── db.json               # JSON Server mock DB
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
│
├── README.md
```

#  Setup Instructions
### Change Frontend .env-example te .env

### Install dependencies
npm install

### Start frontend and backend
npm start


 

