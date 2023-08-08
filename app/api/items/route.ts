import { items } from '@/data/items';
import { NextResponse } from 'next/server';

/**
 * GET method for retrieving the list of all items.
 * @param req The request object.
 * @param res The response object.
 * @returns A response containing the list of all items.
 */
export const GET = async (req: Request, res: Response) => {
  try {
    return NextResponse.json({message: "OK", items}, {status: 200})
  } catch(err){
    return NextResponse.json({message: "Internal server error", err}, {status: 500})
  }
}
