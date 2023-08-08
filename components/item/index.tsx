import React from 'react';
import FavoriteButton from '../favorite-button';

interface ItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    isFavorite: boolean;
    comments: {
      commenter: string;
      comment: string;
      postedDate: string;
    }[];
  };
  onToggleFavorite: () => void;
}

const Item: React.FC<ItemProps> = ({ item, onToggleFavorite }) => {
  return (
    <div className="item">
      <br />
      <img src={item.imageUrl} alt={item.title} />
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>Price: ${item.price.toFixed(2)}</p>
      <FavoriteButton isFavorite={item.isFavorite} onToggleFavorite={onToggleFavorite} />
      <div className="comments">
        <h3>Comments</h3>
        <ul>
          {item.comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.commenter}:</strong> {comment.comment}
            </li>
          ))}
        </ul>
      </div>
      <br />
      <hr />
    </div>
  );
};

export default Item;
