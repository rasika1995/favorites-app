import React from 'react';
import styles from '../item-card/item-card.module.scss';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <button onClick={onToggleFavorite} className={styles['heart-button']}>
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
};

export default FavoriteButton;
