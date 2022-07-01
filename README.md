### GraphQL Playground

[Playground](http://localhost:4200/api/graphql)

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
```
