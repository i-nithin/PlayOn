import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Men",
    image: "https://i.ibb.co/7KB11fD/man1.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Women",
    image: "https://i.ibb.co/ft4SJ23/women1.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Kids",
    image: "https://i.ibb.co/2kQ7k04/kid1.jpg",
  },
];
