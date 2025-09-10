import React from "react";
import { useNavigate } from 'react-router-dom';
import "./CSS/CategoryMenu.css";

const categories = [
  { label: "Statement Chains", img: require('../assests/necklace1.jpg'), route: "/necklaces" },
  { label: "Signature Rings", img: require('../assests/necklace2.jpg'), route: "/rings" },
  { label: "Celestial Drops", img: require('../assests/necklace3.jpg'), route: "/earrings" },
  { label: "Charm Cuffs", img: require('../assests/necklace4.jpg'), route: "/bracelets" },
  { label: "Urban Edge", img: require('../assests/earing1.webp'), route: "/mens" },
  { label: "Sacred Threads", img: require('../assests/necklace1.jpg'), route: "/mangalsutra" },
];

const CategoryMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="category-menu-container">
      <div className="category-menu-scroll">
        {categories.map((cat, idx) => (
          <div
            className="category-item"
            key={idx}
            onClick={() => navigate(cat.route)}
            style={{ cursor: 'pointer' }}
          >
            <div className="category-img-wrapper">
              <img
                src={cat.img}
                alt={cat.label}
                className="category-img"
              />
            </div>
            <div className="category-label">{cat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu; 