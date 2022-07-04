import { DocumentNode, useMutation, useQuery } from '@apollo/client';
import { useState, useEffect, FC } from 'react';
import { AuthForm, AuthFormData } from '@client/components';
import { CURRENT_USER } from '@client/queries';
import { ClientRoutesEnum, CurrentUserAPIResponse } from '@client/constants';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  title: string;
  mutation: DocumentNode;
}

export const Auth: FC<AuthFormProps> = ({ title, mutation }) => {
  const navigate = useNavigate();
  const { data } = useQuery<CurrentUserAPIResponse>(CURRENT_USER);
  const [mutationAction] = useMutation(mutation, {
    refetchQueries: [{ query: CURRENT_USER }],
  });
  const [errors, setErrors] = useState<string[]>([]);
  const onSubmit = async ({ email, password }: AuthFormData) => {
    try {
      await mutationAction({ variables: { email, password } });
    } catch (error: any) {
      console.log(title, 'error', error);

      const errors = error.graphQLErrors.map((error: any) => error.message);
      setErrors(errors);
    }
  };

  useEffect(() => {
    if (data?.user) {
      navigate(`/${ClientRoutesEnum.SONGS}`, { replace: true });
    }
  }, [data]);

  return (
    <div>
      <h3>{title}</h3>
      <AuthForm errors={errors} onSubmit={onSubmit} />
    </div>
  );
};

export default Auth;
