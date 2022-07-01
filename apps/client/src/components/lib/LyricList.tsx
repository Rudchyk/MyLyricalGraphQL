import { useState, FormEvent, ChangeEvent, FC } from 'react';
import { LIKE_LYRIC } from '@client/mutations';
import { useMutation } from '@apollo/client';
import { Lyric } from '@my-lyrical-graph-ql/api-interfaces';
interface LyricListProps {
  lyrics: Lyric[];
}

export const LyricList: FC<LyricListProps> = ({ lyrics }) => {
  const [likeLyric] = useMutation(LIKE_LYRIC);
  const onLike = (id: string) => likeLyric({ variables: { id } });

  return (
    <ul className="collection">
      {lyrics.map(({ id, content, likes }) => (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <i className="material-icons" onClick={() => onLike(id)}>
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LyricList;
