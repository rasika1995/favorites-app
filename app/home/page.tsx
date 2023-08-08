"use client"
import { useEffect, useState } from "react";
import axios from 'axios';
import Item from "@/components/item";

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
  isFavorite: boolean;
}

const HomePage: React.FC = () => {
  const [items, setItems] = useState<Array<Item>>([]);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseFavorites = await axios.get('/api/favorites');
        const responseItems = await axios.get('/api/items');
      
        if(responseItems.data.items){
          const itemsR = responseItems.data.items.length > 0 && responseItems.data.items.map((item: Item)=> {
            const favoriteItems = responseFavorites?.data?.favoriteItems || [];
            if(favoriteItems.find((favorite: { id: number; }) => favorite.id === item.id)){
              item.isFavorite = true;
              return item
            }
            item.isFavorite = false;
            return item
          })
          setItems(responseItems.data.items);
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
    <div>
      <h1>Items</h1>
      <hr/>
      <div className="item-list">
        {items.map((item: Item) => (
          <Item
            key={item.id}
            item={item}
            onToggleFavorite={() => handleToggleFavorite(item.id, item.isFavorite)}
          />
        ))}
      </div>
      <br />
    </div>
  );
};

export default HomePage;