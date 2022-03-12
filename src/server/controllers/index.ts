import frontend from './frontend';
import users from './api/users';

export default {
    frontend,
    users: {
        signup: users.signup,
        login: users.login,
        logout: users.logout,
        authorize: users.authorize
    }
};
