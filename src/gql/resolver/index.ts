import { db } from "../../db.js";

export const resolvers = {
  Query: {
    products: () => db.products,
    product: (parent: any, args: { productId: string }, context: any) => {
      const result = db.products.find((item) => item.id === args.productId);
      return result;
    },
    categories: () => db.categories,
    category: (parent: any, args: { categoryId: string }, context: any) => {
      const result = db.categories.find((item) => item.id === args.categoryId);
      return result;
    },
  },
  Product: {
    category: (parent, args, context) => {
      const result = db.categories.find(
        (item) => item.id === parent.categoryId
      );
      return result;
    },
  },
};
