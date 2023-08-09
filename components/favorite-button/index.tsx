import React from 'react';
import styles from '../item-card/item-card.module.scss';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

/**
 * FavoriteButton component displays a heart icon button that represents the favorite state.
 * It changes its appearance based on whether the item is marked as a favorite or not.
 *
 * @param {boolean} isFavorite - Whether the item is marked as favorite.
 * @param {function} onToggleFavorite - Callback function to toggle the favorite state.
 */
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
