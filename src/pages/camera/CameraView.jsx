// import React from 'react'

// const CameraView = () => {
//     const cameraIp = '192.168.1.10';
//     const username = 'admin';
//     const password = 'Advika123';

//     const streamUrl = `http://${username}:${password}@${cameraIp}/stream`;
//   return (
//     <div>
//           <iframe
//           src={streamUrl}
//           width="800" // Set appropriate width for the stream
//           height="600" // Set appropriate height for the stream
//           frameborder="0"
//           allowFullScreen
//           title="Live Camera View"
//         ></iframe>


//         {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/WeXy2mbvLPU?si=DqNLa813nan67JGK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}

        
//         {/* Option 2: Display live stream using video (for MJPEG or RTSP streams) */}
//         <video width="800" height="600" controls autoPlay>
//           <source src={streamUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//     </div>
//   )
// }

// export default CameraView

// import React, { useState } from 'react';
// import { Modal, Button } from 'antd';

// const CameraView = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   // Live camera details
//   const cameraIp = '192.168.1.10';
//   const username = 'admin';
//   const password = 'Advika123';

//   // RTSP or MJPEG stream URL (use the correct URL format for your camera)
//   const streamUrl = `http://${username}:${password}@${cameraIp}/stream`;

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <>
//       <Button type="primary" onClick={showModal}>
//         Start Weighing (Live View)
//       </Button>
//       <Modal
//         title="Weighing Process with Live Camera View"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         width={1000} // Adjust modal size
//         bodyStyle={{ display: 'flex', justifyContent: 'center' }} // Center the live stream
//       >
//         {/* Option 1: Display live stream using iframe */}
//         <iframe
//           src={streamUrl}
//           width="800" // Set appropriate width for the stream
//           height="600" // Set appropriate height for the stream
//           frameborder="0"
//           allowFullScreen
//           title="Live Camera View"
//         ></iframe>

//         {/* Option 2: Display live stream using video (for MJPEG or RTSP streams) */}
//         {/* <video width="800" height="600" controls autoPlay>
//           <source src={streamUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video> */}
//       </Modal>
//     </>
//   );
// };

// export default CameraView;


// import React, { useState } from 'react';
// import { Modal, Button } from 'antd';

// const CameraView = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   // URL for the camera's web interface live view
//   const cameraWebInterfaceUrl = `http://admin:Advika123@192.168.1.10`; // URL for live view

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <>
//       <Button type="primary" onClick={showModal}>
//         Start Weighing (Live View)
//       </Button>
//       <Modal
//         title="Weighing Process with Live Camera View"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         width={1000} 
//         style={{ display: 'flex', justifyContent: 'center' }}
//       >
//         <iframe
//           src={cameraWebInterfaceUrl}
//           width="800"
//           height="600"
//           title="Live Camera Feed"
//         />
//       </Modal>

//       <video id="cameraStream" autoPlay playsInline>
//         <source src="webrtc://192.168.1.10/liveStream" type="video/webm" />
//       </video>
//     </>
//   );
// };

// export default CameraView;


// import React, { useState } from 'react';
// import { Modal, Button } from 'antd';

// const CameraView = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   // Live MJPEG stream URL (check your camera documentation for the correct URL)
//   const streamUrl = `http://admin:Advika123@192.168.1.10/video.mjpeg`;

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <>
//       <Button type="primary" onClick={showModal}>
//         Start Weighing (Live View)
//       </Button>
//       <Modal
//         title="Weighing Process with Live Camera View"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         width={1000} 
//         bodyStyle={{ display: 'flex', justifyContent: 'center' }}
//       >
//         <img
//           src={streamUrl}
//           width="800"
//           height="600"
//           alt="Live Camera Feed"
//         />
//       </Modal>
//     </>
//   );
// };

// export default CameraView;

// import React, { useEffect, useState } from 'react';

// const CameraView = () => {
//     const [streamUrl, setStreamUrl] = useState('');

//     useEffect(() => {
//         const cameraIp = process.env.REACT_APP_CAMERA_IP;
//         const username = process.env.REACT_APP_CAMERA_USERNAME;
//         const password = process.env.REACT_APP_CAMERA_PASSWORD;

//         const url = `http://${username}:${password}@${cameraIp}/stream`;
//         setStreamUrl(url);
//     }, []);

//     return (
//         <div>
//             {streamUrl ? (
//                 <>
//                     <iframe
//                         src={streamUrl}
//                         width="800"
//                         height="600"
//                         frameborder="0"
//                         allowFullScreen
//                         title="Live Camera View"
//                     ></iframe>

//                     <video width="800" height="600" controls autoPlay>
//                         <source src={streamUrl} type="video/mp4" />
//                         Your browser does not support the video tag.
//                     </video>
//                 </>
//             ) : (
//                 <p>Loading stream...</p>
//             )}
//         </div>
//     );
// };

// export default CameraView;

// import React, { useEffect, useState } from 'react';

// const CameraView = () => {
//     // const [streamUrl, setStreamUrl] = useState('');

//     // useEffect(async() => {
//     //     const url = await 'http://localhost:5000/stream';
//     //     setStreamUrl(url);
//     // }, []);

//     return (
//         <div>
//              <iframe
//                         src='http://192.168.1.10/doc/page/preview.asp'
//                         width="800"
//                         height="600"
//                         frameborder="0"
//                         allowFullScreen
//                         title="Live Camera View"
//                     ></iframe>
//             {true ? (
//                 <video width="800" height="600" controls autoPlay>
//                     <source src="https://www.youtube.com/embed/WeXy2mbvLPU?si=DqNLa813nan67JGK" type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>
//             ) : (
//                 <p>Loading stream...</p>
//             )}
//         </div>
//     );
// };

// export default CameraView;


// const CameraView = () => {
//     return (
//       <div>
//         <h2>Live Camera View (via Proxy)</h2>
//         <iframe
//           src="http://localhost:5000/camera"
//           width="800"
//           height="600"
//           frameborder="0"
//           allowFullScreen
//           title="Live Camera View"
//         ></iframe>
//       </div>
//     );
//   };
  
//   export default CameraView;


import axios from 'axios';
import React from 'react';
import { getScreenShot } from '../../app/api/camera';

const CameraView = () => {
  const captureAndSaveImage = async (tokenNo) => {
    try {
      // const response = await fetch(`http://localhost:5000/api/capture-image?tokenNo=${tokenNo}`);
      const response=await getScreenShot(tokenNo)
      const data = await response.json();

      if (data.success) {
        console.log('Image captured and saved to', data.imagePath);
      } else {
        console.error('Failed to capture image:', data.message);
      }
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => captureAndSaveImage('t2025-1')}>Get Image</button>
      </div>
    </div>
  );
};

export default CameraView;
