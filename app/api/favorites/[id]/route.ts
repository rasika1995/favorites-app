import { NextResponse } from "next/server";
import { favorites, items } from "@/data/items";

/**
 * DELETE method for removing an item from favorites.
 * @param req The request object.
 * @param res The response object.
 * @returns A response containing the updated list of favorite items.
 */
export const DELETE = async (req: Request, res: Response) => {
    try {
      const itemId = parseInt(req.url.split("favorites/")[1]); 
      const index: number = favorites.indexOf(itemId);
      if (index === -1) {
        return NextResponse.json({message: "Item not found"}, {status: 404});
      }
      favorites.splice(index, 1);
      const favoriteItems = items.filter(item => favorites.includes(item.id));
      return NextResponse.json({message: "OK", favoriteItems}, {status: 200})
    } catch(err){
      return NextResponse.json({message: "Internal server error", err}, {status: 500})
    }
}