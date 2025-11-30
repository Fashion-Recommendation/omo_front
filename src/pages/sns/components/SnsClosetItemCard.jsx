import React from 'react';
import { useNavigate } from 'react-router-dom';

const SnsClosetItemCard = ({ item }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/closet/detail/${item.id}`);
  };

  return (
    <article className="closet-item" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="closet-item__image">
        <img src={item.image} alt={item.category} />
      </div>
      <p className="closet-item__title">{item.category}</p>
    </article>
  );
};

export default SnsClosetItemCard;