import { favorites, items } from '@/data/items';
import { NextResponse } from 'next/server';

/**
 * GET method for retrieving favorite items.
 * @param req The request object.
 * @param res The response object.
 * @returns A response containing the list of favorite items.
 */
export const GET = async (req: Request, res: Response) => {
  try {
    const favoriteItems = items.filter(item => favorites.includes(item.id));
    return NextResponse.json({message: "OK", favoriteItems}, {status: 200})
  } catch(err){
    return NextResponse.json({message: "Internal server error", err}, {status: 500})
  }
}


/**
 * POST method for adding an item to favorites.
 * @param req The request object.
 * @param res The response object.
 * @returns A response containing the updated list of favorite items.
 */
export const POST = async (req: Request, res: Response) => {
  try {
    const { itemId } = await req.json();
    const itemExists = items.some(item => item.id === itemId);
    if (!itemExists) {
      return NextResponse.json({message: "Item not found"}, {status: 404});
    }
    if (!favorites.includes(itemId)) {
      favorites.push(itemId);
    }
    const favoriteItems = items.filter(item => favorites.includes(item.id));
    return NextResponse.json({message: "OK", favoriteItems}, {status: 200})
  } catch(err){
    return NextResponse.json({message: "Internal server error", err}, {status: 500})
  }
}


