"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  comments: Array<{
    commenter: string;
    comment: string;
    postedDate: string;
  }>
}


const FavoritesPage: React.FC = () => {
  const [favoriteItems, setFavoriteItems] = useState<Array<Item>>([]);
  
  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        const response = await axios.get('/api/favorites');
        if(response.data.favoriteItems){
          setFavoriteItems(response.data.favoriteItems);
        }
      } catch (error) {
        console.error('Error fetching favorite items:', error);
      }
    };
    fetchFavoriteItems();
  }, []);

  return (
    <>
      <div>This is the Favorites page</div>
      <ul>
        {favoriteItems.length>=0 && favoriteItems.map((item: Item) => (
          <div className="item">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>Price: ${item.price.toFixed(2)}</p>
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
        </div>
        ))}
      </ul>
    </>
  );
};

export default FavoritesPage;
