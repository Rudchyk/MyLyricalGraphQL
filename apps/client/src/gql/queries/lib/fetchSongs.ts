import { gql } from '@apollo/client';

export const FETCH_SONGS = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default FETCH_SONGS;
