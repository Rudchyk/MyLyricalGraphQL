import { useQuery, useMutation } from '@apollo/client';
import { Song } from '@my-lyrical-graph-ql/api-interfaces';
import { Link } from 'react-router-dom';
import { FETCH_SONGS } from '@client/queries';
import { DELETE_SONG } from '@client/mutations';

interface FetchSongsAPIResponse {
  songs: Song[];
}

export const SongList = () => {
  const { loading, error, data } = useQuery<FetchSongsAPIResponse>(FETCH_SONGS);
  const [deleteSong] = useMutation(DELETE_SONG, {
    refetchQueries: [{ query: FETCH_SONGS }],
  });
  const onSongDelete = (id: string) => deleteSong({ variables: { id } });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>SongList Submission error! ${error.message}</div>;
  }

  if (!data) {
    return null;
  }

  const { songs } = data;

  return (
    <div>
      <ul className="collection">
        {songs.map(({ id, title }) => (
          <li key={id} className="collection-item">
            <Link to={`/songs/${id}`}>{title}</Link>
            <i className="material-icons" onClick={() => onSongDelete(id)}>
              delete
            </i>
          </li>
        ))}
      </ul>
      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

export default SongList;
