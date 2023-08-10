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