import React from 'react';
import FavoriteButton from '../favorite-button';
import styles from './item-card.module.scss';

export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  logoImageUrl: string;
  logoTitle: string;
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
            AED {item.price.toFixed(2)}
          </div>
          {cardType === 'ITEM_CARD' && <FavoriteButton isFavorite={item.isFavorite} onToggleFavorite={onToggleFavorite} />}
        </div>
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
