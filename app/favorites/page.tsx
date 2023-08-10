"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from '@/components/item-card';
import { Item } from '@/common/types';
import { ITEM_CARD_TYPE } from '@/common/constants';

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
      <div className="item-list" style={{display: 'flex', flexWrap: 'wrap'}}>
        {favoriteItems.map((item: Item) => (
          <ItemCard
            key={item.id}
            item={item}
            cardType={ITEM_CARD_TYPE.FAVORITE_CARD}
            onToggleFavorite={() => {}}
          />
        ))}
      </div>
      <br/>
      <br/>
    </>
   
  );
};

export default FavoritesPage;
