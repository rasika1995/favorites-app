"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard, { Item } from '@/components/item-card';

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
    <div className="item-list" style={{display: 'flex', flexWrap: 'wrap'}}>
      {favoriteItems.map((item: Item) => (
        <ItemCard
          key={item.id}
          item={item}
          cardType='FAVORITE_CARD'
          onToggleFavorite={() => {}}
        />
      ))}
    </div>
  );
};

export default FavoritesPage;
