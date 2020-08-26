import Register from './Register';
import Login from './Login';
import { Category } from '../constants';

export default Category({
    name: "Autenticação",
    endpoints: [
        Register,
        Login
        //all endpoints of Authentication
    ]
})