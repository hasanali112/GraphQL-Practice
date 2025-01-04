import { db } from "../../db.js";
export const resolvers = {
    Query: {
        products: () => db.products,
        product: (parent, args, context) => {
            const result = db.products.find((item) => item.id === args.productId);
            return result;
        },
        categories: () => db.categories,
        category: (parent, args, context) => {
            const result = db.categories.find((item) => item.id === args.categoryId);
            return result;
        },
    },
    Product: {
        category: (parent, args, context) => {
            const result = db.categories.find((item) => item.id === parent.categoryId);
            return result;
        },
    },
};
