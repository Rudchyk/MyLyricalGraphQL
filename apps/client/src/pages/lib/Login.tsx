import { LOGIN } from '@client/mutations';
import { Auth } from '@client/templates';

export const Login = () => <Auth title="Login" mutation={LOGIN} />;

export default Login;
