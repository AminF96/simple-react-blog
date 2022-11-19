const { faker } = require("@faker-js/faker");

module.exports = function () {
  const authors = [
    {
      id: faker.random.uuid(),
      firstName: "Alex",
      lastName: "Robinson",
      img: "/author1.jpg",
      about:faker.lorem.sentence("25"),
    },
    {
      id: faker.random.uuid(),
      firstName: "Maria",
      lastName: "Walker",
      img: "/author2.jpg",
      about:faker.lorem.sentence("25"),
    },
    {
      id: faker.random.uuid(),
      firstName: "David",
      lastName: "Williams",
      img: "/author3.jpg",
      about:faker.lorem.sentence("25"),
    },
    {
      id: faker.random.uuid(),
      firstName: "Isabel",
      lastName: "Scott",
      img: "/author4.jpg",
      about:faker.lorem.sentence("25"),
    },
    {
      id: faker.random.uuid(),
      firstName: "Liam",
      lastName: "Harris",
      img: "/author5.jpg",
      about:faker.lorem.sentence("25"),
    },
  ];

  const data = { authors, posts: [], comments: [] };

  for (let i = 0; i < 10; i++) {
    data.posts.push({
      id: faker.random.uuid(),
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(faker.datatype.number(100)),
      date: faker.date.past().getTime(),
      reactions: {
        like: 0,
        dislike: 0,
      },
      author: faker.random.arrayElement(data.authors).id,
      img: faker.image.image(),
    });
  }

  for (let i = 0; i < 30; i++) {
    data.comments.push({
      id: faker.random.uuid(),
      date: faker.date.past().getTime(),
      body: faker.lorem.paragraphs(faker.datatype.number(10)),
      post: faker.random.arrayElement(data.posts).id,
    });
  }

  return data;
};
