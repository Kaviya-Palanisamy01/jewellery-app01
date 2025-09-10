import React, { useEffect, useState } from 'react';
import './CSS/About.css';

const About = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={`about-container${visible ? ' fade-in' : ''}`}>
      <h1>About Ziva</h1>
      <p>
        Welcome to Ziva, where every jewel tells a story! Our philosophy is simple: craft with passion, shine with elegance. We use the finest materials and a touch of artistry to make every piece special. Whether you seek classic designs or unique creations, our jewelry is crafted to delight your senses and warm your heart.
      </p>
    </div>
  );
};

export default About; 