import { db } from "../../db.js";

export const resolvers = {
  Query: {
    products: () => db.products,
    product: (parent: any, args: { productId: string }, context: any) => {
      return db.products.find((item) => item.id === args.productId);
    },
    categories: () => db.categories,
    category: (parent: any, args: { categoryId: string }, context: any) => {
      return db.categories.find((item) => item.id === args.categoryId);
    },
  },
  Product: {
    category: (parent, args, context) => {
      return db.categories.find((item) => item.id === parent.categoryId);
    },
  },
  Category: {
    products: (parent, args, context) => {
      return db.products.filter((item) => item.categoryId === parent.id);
    },
  },
};
