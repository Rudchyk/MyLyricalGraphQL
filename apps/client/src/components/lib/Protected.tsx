import { useEffect, FC } from 'react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '@client/queries';
import { ClientRoutesEnum, CurrentUserAPIResponse } from '@client/constants';
import { useNavigate } from 'react-router-dom';

interface ProtectedProps {
  children: JSX.Element;
}

export const Protected: FC<ProtectedProps> = ({ children }) => {
  const { loading, data } = useQuery<CurrentUserAPIResponse>(CURRENT_USER);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !data?.user) {
      navigate(`/${ClientRoutesEnum.LOGIN}`, { replace: true });
    }
  }, [data]);

  return children;
};

export default Protected;
