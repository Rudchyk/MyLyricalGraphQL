import { Link, useParams } from 'react-router-dom';
import { FETCH_SONG } from '@client/queries';
import { useQuery } from '@apollo/client';
import { Song, Lyric } from '@my-lyrical-graph-ql/api-interfaces';
import { LyricList, LyricCreate } from '@client/components';

interface SongPreview extends Omit<Song, 'lyrics'> {
  lyrics: Lyric[];
}

interface FetchSongAPIResponse {
  song: SongPreview;
}

export const SongDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<FetchSongAPIResponse>(FETCH_SONG, {
    variables: { id },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>SongDetail Submission error! ${error.message}</div>;
  }

  if (!data || !id) {
    return null;
  }

  const { song } = data;

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>{song.title}</h3>
      <LyricList lyrics={song.lyrics} />
      <LyricCreate songId={id} />
    </div>
  );
};

export default SongDetail;
