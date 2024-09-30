import React, { useState, useRef, forwardRef } from "react";
import { Camera as CameraComponent, CameraProps } from "react-camera-pro";

// Extend the Camera interface to include takePhoto method
interface ExtendedCameraProps extends CameraProps {
  takePhoto: () => string; // or the correct return type
}

// Create a ForwardRef for the Camera component
const ExtendedCamera = forwardRef<ExtendedCameraProps, CameraProps>((props, ref) => (
  <CameraComponent {...props} ref={ref} />
));

// Set the display name for better debugging
ExtendedCamera.displayName = "ExtendedCamera";

const Cam: React.FC = () => {
  const camera = useRef<ExtendedCameraProps | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const takePhoto = () => {
    console.log(image?image[0]:"no image");
    if (camera.current) {
      const photo = camera.current.takePhoto();
      setImage(photo);
      fetch(`/api/update_machine_status`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: photo }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.choices[0].message.content);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "16px" }}>
      <div
        style={{
          width: "100%",
          height: "500px", // Set the height of the camera
          overflow: "hidden", // Hide any overflow
          position: "relative" // Ensure the camera can be positioned correctly
        }}
      >
        <ExtendedCamera 
          ref={camera} 
          errorMessages={{}} // Provide default error messages or your custom ones
        />
      </div>
    
      <div className='py-7 px-30'>
      <button className="p-[3px] relative " onClick={(e) => {e.preventDefault(); takePhoto();}}>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
      <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
        Update Status
      </div>
    </button>
    </div>
    </div>
  );
}

export default Cam;
