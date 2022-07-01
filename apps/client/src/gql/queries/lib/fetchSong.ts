import { gql } from '@apollo/client';

export const FETCH_SONG = gql`
  query SongQuery($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default FETCH_SONG;
