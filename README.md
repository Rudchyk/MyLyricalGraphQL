```
mutation {
  addSong(title: "Test") {
    id,
    title
  }
}
mutation {
  addLyricToSong(content: "Test" songId: "62bd9423d7417e56ec3b4cac") {
    id,
    title
  }
}

{
  song(id: "62bd9423d7417e56ec3b4cac") {
    id,
    title,
    lyrics
  }
}

{
  songs {
    id,
    title,
    lyrics {
      id
    }
  }
}
```
