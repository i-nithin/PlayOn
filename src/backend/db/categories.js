import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Men",
    image: "https://i.ibb.co/JqSWqx1/d3ccc8f1-954f-472b-a49f-9e10d1eb8e51.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Women",
    image: "https://i.ibb.co/JqSWqx1/d3ccc8f1-954f-472b-a49f-9e10d1eb8e51.jpg",
  },
  {
    _id: uuid(),
    categoryName: "Kids",
    image: "https://i.ibb.co/7VWDZXf/3195ddba-ee6c-4ced-993c-4828c72ee83f.jpg",
  },
];
