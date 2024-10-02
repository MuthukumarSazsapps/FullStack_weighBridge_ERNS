// import DigestFetch from 'digest-fetch';
// import fs from 'fs';
// import path from 'path';
// import { HttpStatusCode } from '../utils/constants.js';
// import responseHandler from '../utils/responseHandler.js';
// import { fileURLToPath } from 'url';

// const cameraScreenShot = async (req, res) => {
//   const cameraIp = '192.168.1.10';  // Camera IP
//   const username = 'admin';         // Your camera username
//   const password = 'Advika123';     // Your camera password
//   const tokenNo = req.query.tokenNo; // Accept tokenNo as a query parameter

//   // Get the current directory
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);

//   // Define the correct path to save the image
//   const imageDir = path.join(__dirname, '../../src/pages/camera/images');
//   const imagePath = path.join(imageDir, `weighing_${tokenNo}.jpg`);

//   // Create the directory if it doesn't exist
//   if (!fs.existsSync(imageDir)) {
//     fs.mkdirSync(imageDir, { recursive: true });
//   }

//   // Create a DigestFetch client
//   const client = new DigestFetch(username, password);

//   try {
//     // First, generate the digest header and get the response using DigestFetch
//     const response = await client.fetch(`http://${cameraIp}/ISAPI/Streaming/channels/1/picture`, {
//       method: 'GET',
//     });

//     if (response.ok) {
//       // Get binary data from the response
//       const arrayBuffer = await response.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       // Save the image locally
//       fs.writeFileSync(imagePath, buffer);

//       console.log(`Image saved to: ${imagePath}`);

//       return responseHandler({
//         req,
//         res,
//         data: { success: true, imagePath },
//         httpCode: HttpStatusCode.OK,
//       });
//     } else {
//       console.error('Camera responded with:', response.status);
//       return responseHandler({
//         req,
//         res,
//         data: { success: false, message: 'Failed to capture image from camera' },
//         httpCode: HttpStatusCode.BAD_REQUEST,
//       });
//     }
//   } catch (error) {
//     console.error('Error capturing image:', error);
//     return responseHandler({
//       req,
//       res,
//       data: { success: false, message: 'Error capturing image', error: error.message },
//       httpCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
//     });
//   }
// };
//----------------------------------------------
// export default  cameraScreenShot


// import DigestFetch from 'digest-fetch';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const cameraScreenShot = async (tokenNo) => {
//   const cameraIp = '192.168.1.10';  // Camera IP
//   const username = 'admin';         // Your camera username
//   const password = 'Advika123';     

//   // Get the current directory
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);

//   // Define the path to save the image
//   let imageDir;
//   if (process.env.NODE_ENV === "development") {
//     imageDir = path.join(__dirname, '../../src/assets/images/camImages');
//   } else {
//     imageDir = path.join(__dirname, '../../build/static/media'); // Adjust this path as needed
//   }
//   const imagePath = path.join(imageDir, `weighing_${tokenNo}.jpg`);

//   // Create the directory if it doesn't exist
//   if (!fs.existsSync(imageDir)) {
//     fs.mkdirSync(imageDir, { recursive: true });
//   }

//   // Create a DigestFetch client
//   const client = new DigestFetch(username, password);

//   try {
//     // Fetch the image from the camera
//     const response = await client.fetch(`http://${cameraIp}/ISAPI/Streaming/channels/1/picture`, {
//       method: 'GET',
//     });

//     if (response.ok) {
//       // Get binary data from the response
//       const arrayBuffer = await response.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       // Save the image locally
//       fs.writeFileSync(imagePath, buffer);

//       console.log(`Image saved to: ${imagePath}`);
//       return imagePath;
//     } else {
//       console.error('Camera responded with:', response.status);
//       throw new Error('Failed to capture image from camera');
//     }
//   } catch (error) {
//     console.error('Error capturing image:', error);
//     throw new Error('Error capturing image');
//   }
// };

// export default cameraScreenShot;



import DigestFetch from 'digest-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const cameraScreenShot = async (tokenNo) => {
  const cameraIp = '192.168.1.10';  // Camera IP
  const username = 'admin';         // Your camera username
  const password = 'Advika123';     

  // Get the current directory
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Define the path to save the image
  // const imageDir = process.env.IMAGE_SAVE_PATH || path.join(__dirname, '../../src/assets/images/camImages');
  let imageDir
  if(process.env.NODE_ENV==="development"){
     imageDir =path.join(__dirname, '../../src/assets/images/camImages');
  }else{
    imageDir = process.env.IMAGE_SAVE_PATH
  }
  const imagePath = path.join(imageDir, `weighing_${tokenNo}.jpg`);

  // Create the directory if it doesn't exist
  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  // Create a DigestFetch client
  const client = new DigestFetch(username, password);

  try {
    // Fetch the image from the camera
    const response = await client.fetch(`http://${cameraIp}/ISAPI/Streaming/channels/1/picture`, {
      method: 'GET',
    });

    if (response.ok) {
      // Get binary data from the response
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Save the image locally
      fs.writeFileSync(imagePath, buffer);

      console.log(`Image saved to: ${imagePath}`);
      return imagePath;
    } else {
      console.error('Camera responded with:', response.status);
      throw new Error('Failed to capture image from camera');
    }
  } catch (error) {
    console.error('Error capturing image:', error);
    throw new Error('Error capturing image');
  }
};

export default cameraScreenShot;
