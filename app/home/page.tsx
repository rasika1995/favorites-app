"use client"
import { useEffect, useState } from "react";
import axios from 'axios';
import ItemCard from "@/components/item-card";
import { Item } from "@/common/types";
import { ITEM_CARD_TYPE } from "@/common/constants";

const HomePage: React.FC = () => {
  const [items, setItems] = useState<Array<Item>>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseFavorites = await axios.get('/api/favorites');
        const responseItems = await axios.get('/api/items');
      
        if(responseItems.data.items){
          // Update items' favorite status based on the response
          const updatedItems = responseItems.data.items.length > 0 && responseItems.data.items.map((item: Item)=> {
            const favoriteItems = responseFavorites?.data?.favoriteItems || [];
            if(favoriteItems.find((favorite: { id: number; }) => favorite.id === item.id)){
              item.isFavorite = true;
              return item
            }
            item.isFavorite = false;
            return item
          })
          setItems(updatedItems);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  const addFavorite = async (itemId: number) => {
    try {
      const response = await axios.post('/api/favorites', { itemId });
      if (response.status === 200) {
        // Update the items array to reflect the new favorite status
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId
              ? { ...item, isFavorite: !item.isFavorite }
              : item
          )
        );
      } else {
        console.error('Error while adding favorite:', response.statusText);
      }
    } catch (error) {
      console.error('Error while adding favorite:', error);
    }
  };

  const removeFavorite = async (id: number) => {
    try {
      const response = await axios.delete(`/api/favorites/${id}`);
      if (response.status === 200) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id
              ? { ...item, isFavorite: !item.isFavorite }
              : item
          )
        );
      } else {
        console.error('Error while removing favorite:', response.statusText);
      }
    } catch (error) {
      console.error('Error while removing favorite:', error);
    }
  };

  const handleToggleFavorite = async (itemId: number, isFavorite: boolean) => {
    try {
      if(isFavorite){
        await removeFavorite(itemId)
      }
      else {
        await addFavorite(itemId)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <>
      <div className="item-list" style={{display: 'flex', flexWrap: 'wrap'}}>
        {items.map((item: Item) => (
          <ItemCard
            key={item.id}
            item={item}
            cardType={ITEM_CARD_TYPE.ITEM_CARD}
            onToggleFavorite={() => handleToggleFavorite(item.id, item.isFavorite)}
          />
        ))}
      </div>
      <br/>
      <br/>
    </>
  );
};

export default HomePage;