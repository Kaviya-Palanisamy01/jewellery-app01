import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/GiftingEdit.css';

const giftingData = [
  {
    label: 'SISTER',
    route: '/gifts/sister',
    illustration: 'https://cdn.pixabay.com/photo/2017/01/31/13/14/couple-2020902_1280.png',
    jewelry: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    jewelryAlt: 'Diamond Bracelet',
    bg: '#fbe9e7',
  },
  {
    label: 'BROTHER',
    route: '/gifts/brother',
    illustration: 'https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295394_1280.png',
    jewelry: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    jewelryAlt: 'Chain Bracelet',
    bg: '#e3f2fd',
  },
  {
    label: 'MOM',
    route: '/gifts/mom',
    illustration: 'https://cdn.pixabay.com/photo/2017/01/31/13/14/couple-2020902_1280.png',
    jewelry: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    jewelryAlt: 'Gold Nail Bracelet',
    bg: '#fce4ec',
  },
  {
    label: 'FATHER',
    route: '/gifts/father',
    illustration: 'https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295394_1280.png',
    jewelry: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    jewelryAlt: 'Silver Chain',
    bg: '#fffde7',
  },
  {
    label: 'GRANDPARENTS',
    route: '/gifts/grandparents',
    illustration: 'https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295394_1280.png',
    jewelry: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    jewelryAlt: 'Classic Brooch',
    bg: '#e8f5e9',
  },
  {
    label: 'FRIENDS',
    route: '/gifts/friends',
    illustration: 'https://cdn.pixabay.com/photo/2017/01/31/13/14/couple-2020902_1280.png',
    jewelry: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    jewelryAlt: 'Friendship Bracelet',
    bg: '#fff3e0',
  },
  {
    label: 'KIDS',
    route: '/gifts/kids',
    illustration: 'https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295394_1280.png',
    jewelry: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    jewelryAlt: 'Kids Jewelry',
    bg: '#f3e5f5',
  },
];

const GiftingEdit = () => (
  <section className="gifting-edit-section">
    <h2 className="gifting-title">THE GIFTING EDIT</h2>
    <div className="gifting-cards">
      {giftingData.map((item, idx) => (
        <Link to={item.route} className="gifting-card-link" key={item.label} style={{ textDecoration: 'none' }}>
          <div className="gifting-card" style={{ background: item.bg }}>
            <div className="gifting-illustration-wrapper">
              <img src={item.illustration} alt={item.label + ' illustration'} className="gifting-illustration" />
            </div>
            <img src={item.jewelry} alt={item.jewelryAlt} className="gifting-jewelry" />
            <div className="gifting-label">Gifts for <span>{item.label}</span></div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default GiftingEdit;
