### Links

- [Docs Mongoose](https://mongoosejs.com/)
- [React Router](https://reactrouter.com/docs/en/v6/getting-started/overview)
- [Docs Apollo React Client](https://www.apollographql.com/docs/react/)

### GraphQL Playground

- [API GraphQL Playground](http://localhost:4200/api/graphql)

```
mutation {
  addSong(title: "Test") {
    id,
    title
  }
}
---
mutation {
  addLyricToSong(content: "Test" songId: "62bd9423d7417e56ec3b4cac") {
    id,
    title
  }
}
---
mutation {
  likeLyric(id: "62bd9cd97a2817efd9043dc9") {
    id,
    content,
    likes
  }
}
---
mutation {
  deleteSong(id: "62bd95a41a95266a72d88555") {
    id,
    title
  }
}
---
{
  song(id: "62bd9423d7417e56ec3b4cac") {
    id,
    title,
    lyrics
  }
}
---
{
  lyric(id: "62bd9cd97a2817efd9043dc9") {
    id,
		content,
    likes
  }
}
---
{
  songs {
    id,
    title,
    lyrics {
      id,
      content,
      likes
    }
  }
}
---
{
  user {
    id,
    email
  }
}
---
mutation {
  signup(email: "sergii.rudchyk@gmail.com" password: "11111") {
    id,
    email,
  }
}
=> Error: Email in use
---
mutation {
  signup(email: "sergii.rudchyk1@gmail.com" password: "11111") {
    id,
    email,
  }
}
---
mutation {
  logout{
    id,
    email
  }
}
---
mutation {
  login(email: "sergii.rudchyk1@gmail.com" password: "11111") {
    id,
    email
  }
}
---
mutation {
  login(email: "sergii.rudchyk122sd@gmail.com" password: "11111") {
    id,
    email
  }
}
=> Invalid credentials
```

```
mkdir -p apps/api/src/services/lib && touch apps/api/src/services/index.ts
```
