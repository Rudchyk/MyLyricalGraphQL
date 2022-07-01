import { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_SONG } from '@client/mutations';
import { FETCH_SONGS } from '@client/queries';

export const SongCreate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [addSong] = useMutation(ADD_SONG, {
    refetchQueries: [{ query: FETCH_SONGS }],
  });
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addSong({ variables: { title } });
    navigate('/', { replace: true });
  };
  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>Create a New Song</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Song Title:</label>
        <input id="title" onChange={handleOnInputChange} value={title} />
      </form>
    </div>
  );
};

export default SongCreate;
