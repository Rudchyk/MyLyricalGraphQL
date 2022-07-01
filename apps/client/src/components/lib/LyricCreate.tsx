import { useState, FormEvent, ChangeEvent, FC } from 'react';
import { ADD_LYRIC_TO_SONG } from '@client/mutations';
import { useMutation } from '@apollo/client';

interface LyricCreateProps {
  songId: string;
}

export const LyricCreate: FC<LyricCreateProps> = ({ songId }) => {
  const [addLyricToSong] = useMutation(ADD_LYRIC_TO_SONG);
  const [content, setContent] = useState('');
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addLyricToSong({
      variables: {
        content,
        songId,
      },
    });
    setContent('');
  };
  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Add a Lyric</label>
      <input value={content} onChange={handleOnInputChange} />
    </form>
  );
};

export default LyricCreate;
