import React, {useState} from 'react'

export default function Imagecont() {
  const [containerStyle, setContainerStyle] = useState({
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, border-radius 0.3s ease",
  });

  const imageStyle = {
    width: "100%", // Adjust the width as needed
  };

  const handleHover = () => {
    
    setContainerStyle((prevStyle) => ({
      ...prevStyle,
      
      background: "linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))",
      transform: "scale(1.04)",
      animation: "bounce 0.5s ease infinite",
      borderRadius: "15px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }));
  };

  const handleMouseLeave = () => {
    setContainerStyle((prevStyle) => ({
      ...prevStyle,
      transform: "scale(1)",
      borderRadius: "0px", // Remove rounded edges
      boxShadow: "none", // Remove shadow
    }));
  };

  return (
    <div
      className="image-container"
      style={containerStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src="https://source.unsplash.com/720x600/?notes"
        alt="Note Image"
        style={imageStyle}
      />
    </div>
  );
}
