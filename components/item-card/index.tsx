import React from 'react';
import FavoriteButton from '../favorite-button';
import styles from './item-card.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  logoImageUrl: string;
  logoTitle: string;
  numberOfLikes: string;
  comments: Array<{
    commenter: string;
    comment: string;
    postedDate: string;
  }>
  isFavorite: boolean;
}

interface ItemProps {
  item: Item
  onToggleFavorite: () => void;
  cardType: 'FAVORITE_CARD' | 'ITEM_CARD';
}

/**
 * ItemCard component displays an item card with title, logo, price, likes, and description.
 * It can be used as a regular item card or as a favorite card.
 *
 * @param {Object} item - The item object containing details.
 * @param {function} onToggleFavorite - Callback function to toggle item favorite state.
 * @param {string} cardType - Type of card ('FAVORITE_CARD' or 'ITEM_CARD').
 */
const ItemCard: React.FC<ItemProps> = ({ item, onToggleFavorite, cardType }) => {
  const cardStyle = {
    backgroundImage: `url(${item.imageUrl})`,
  };

  const formatDescription = (description: string) => {
    const regex = /#(\w+)/g;
    return description.replace(regex, '<span class="' + styles.hashtag + '">$&</span>');
  };
  
  return (
    <div className={styles.item}>
      <div className={styles['item-logo']}>
          <img src={item.logoImageUrl} />
          <p>{item.logoTitle.toLowerCase()}</p>
      </div>
      <div className={styles['item-card']} style={cardStyle}>
        <div className={styles.content}>
          <div className={styles.title}>
            {item.title}
            <br />
            {item.currency} {item.price.toFixed(2)}
          </div>
          {cardType === 'ITEM_CARD' && <FavoriteButton isFavorite={item.isFavorite} onToggleFavorite={onToggleFavorite} />}
        </div>
      </div>
      <div className={styles['likes-container']}>
        <FontAwesomeIcon icon={faHeart} color={'blue'} />
        <p>{(item.isFavorite || cardType === 'FAVORITE_CARD') ? item.numberOfLikes+1: item.numberOfLikes} likes</p>
      </div>
      <p
        className={`${styles.description}`}
        dangerouslySetInnerHTML={{
          __html: formatDescription(item.description),
        }}
      />
      {item.comments.length > 0 && (
        <div className={styles.comments}>
        <p>View {item.comments.length} comments</p>
      </div>
      )}
    </div>
  );
};

export default ItemCard;
