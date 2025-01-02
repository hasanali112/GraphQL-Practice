## GRAPHQL- Basic fundamental

GraphQL: Apollo Server
Apollo GraphQL is a comprehensive open-source GraphQL platform that helps you build modern web applications and services. It provides a suite of tools and libraries to help you develop, test, deploy, and manage your GraphQL APIs.

## Benefits of using Apollo GraphQL

- Improved developer experience: Apollo GraphQL provides a number of features that make it easier to develop and maintain GraphQL APIs, such as type safety, schema introspection, and code generation.

- Increased performance: Apollo GraphQL is designed to be performant, with features such as caching and batching to help you optimize your API for speed.

- Scalability: Apollo GraphQL can scale to meet the needs of even the most demanding applications. It's used by companies like Netflix, Airbnb, and GitHub to power their production APIs.

- Apollo GraphQL can be used to implement a wide variety of features in Next Level Web Development, such as:
  Real-time data updates: Apollo GraphQL can be used to build real-time data updates in your application, such as live chat, social media feeds, and dashboards.

- Complex data queries: Apollo GraphQL makes it easy to perform complex data queries across multiple data sources. This is ideal for applications that need to access data from a variety of different databases, APIs, and microservices.

- Offline support: Apollo GraphQL can be used to implement offline support in your application, so that users can continue to access data even when they don't have an internet connection.

## How it works

`GraphQL`-এ কাজ করতে হলে দুটি মূল জিনিস নিয়ে কাজ করতে হয়:

১. **টাইপ ডেফিনিশন (Type Definition)**:

এটি `GraphQL` স্কিমার কাঠামো যেখানে ডেটার ধরণ (type), ফিল্ড (field), এবং তাদের সম্পর্ক (relation) নির্ধারণ করা হয়। টাইপ ডেফিনিশন দিয়ে আমরা ডেটার স্ট্রাকচার এবং API এর কী কী ফিচার থাকতে পারে তা ব্যাখ্যা করি। যেমন: Query, Mutation, Subscription ইত্যাদি।

২. **রিজলভার (Resolver)**:

এটি মূলত একটি ফাংশন যা টাইপ ডেফিনিশনে ঘোষিত ফিল্ডগুলোর ডেটা সরবরাহ করে। এটি ব্যাকএন্ড থেকে ডেটা নিয়ে আসে এবং ক্লায়েন্টের অনুরোধ অনুসারে সঠিক ডেটা পাঠায়। রিজলভারই মূলত API এর লজিকাল অংশ যেখানে ডেটাবেজ বা অন্যান্য সোর্সের সাথে ইন্টারঅ্যাকশন করা হয়।

এই দুইটি একসঙ্গে কাজ করে `GraphQL` API তৈরি করে।

## Type definition

**Type Definition** GraphQL-এর একটি অংশ, যা API-এর ডেটার গঠন এবং ধরণ (structure and types) সংজ্ঞায়িত করে। এটি মূলত একটি স্কিমা (schema) তৈরি করে, যেখানে বলা হয় কোন ধরনের ডেটা ব্যবহার করা হবে এবং ক্লায়েন্ট কী কী রকমের ডেটা রিকোয়েস্ট করতে পারবে।

### Type Definition এর উপাদানসমূহ:

1. **Scalars (প্রাথমিক ডেটা টাইপ):**

- `GraphQL` এর কিছু বিল্ট-ইন scalar টাইপ রয়েছে, যেমন:

1. `String`: টেক্সট ডেটা।
2. `Int`: পূর্ণসংখ্যা।
3. `Float`: দশমিক সংখ্যা।
4. `Boolean`: `true` বা `false`।
5. `ID`: ইউনিক আইডেন্টিফায়ার।

6. **Object Types (অবজেক্ট টাইপ):**

- ডেটার কাঠামো নির্ধারণ করতে ব্যবহৃত হয়।
- উদাহরণ:

```ts
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
}
```

### Resolver

**Resolver Function** GraphQL-এর একটি মূল উপাদান যা ডেটার জন্য লজিক পরিচালনা করে। এটি টাইপ ডেফিনিশনে ঘোষিত ফিল্ডগুলোর ডেটা সরবরাহ করার কাজ করে। Resolver ফাংশনে তিনটি প্রধান প্যারামিটার থাকে: `parent`, `args`, এবং `context`। নিচে এই তিনটি প্যারামিটার সম্পর্কে বিশদভাবে আলোচনা করা হলো:

### **1. Parent (অথবা Root):**

- **Parent** আগের লেভেলের রেজলভারের আউটপুট ধরে রাখে। এটি তখনই গুরুত্বপূর্ণ যখন কোনো টাইপের ফিল্ড অন্য একটি অবজেক্ট টাইপের মধ্যে থাকে।

উদাহরণস্বরূপ:

```ts
type Query {
  user(id: ID!): User
}

type User {
  id: ID!
  name: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
}

```

এখানে, `User` এর `posts` ফিল্ড রিজলভ করতে গেলে `parent` হিসেবে `User` অবজেক্ট পাবে।

```ts
const resolvers = {
  Query: {
    user: (parent, args, context) => {
      return users.find((user) => user.id === args.id);
    },
  },
  User: {
    posts: (parent, args, context) => {
      return posts.filter((post) => post.userId === parent.id);
    },
  },
};
```

2. Args (Arguments):

**Args** ক্লায়েন্টের রিকোয়েস্ট থেকে পাঠানো প্যারামিটার বা ইনপুট ডেটা থাকে।

```ts
type Query {
  user(id: ID!): User
}

```

এখানে, `id` হচ্ছে `args`।

### **3. Context:**

- **Context** একটি শেয়ার করা অবজেক্ট যা প্রতিটি রিজলভারে পাওয়া যায়। এটি সাধারণত অথেন্টিকেশন, অথরাইজেশন, অথবা শেয়ার করা ডেটা (যেমন, ডেটাবেস কানেকশন) সংরক্ষণ করতে ব্যবহৃত হয়।
