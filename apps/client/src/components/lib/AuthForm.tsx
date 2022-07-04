import { useState, FormEvent, FC } from 'react';

export interface AuthFormData {
  email: string;
  password: string;
}

interface AuthFormProps {
  onSubmit(data: AuthFormData): void;
  errors: string[];
}

export const AuthForm: FC<AuthFormProps> = ({ onSubmit, errors }) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(formData);
  };

  return (
    <div className="row">
      <form onSubmit={handleOnSubmit} className="col s6">
        <div className="input-field">
          <input
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="input-field">
          <input
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className="errors">
          {errors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default AuthForm;
