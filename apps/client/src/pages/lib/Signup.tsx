import { SIGNUP } from '@client/mutations';
import { Auth } from '@client/templates';

export const Signup = () => <Auth title="Sign Up" mutation={SIGNUP} />;

export default Signup;
