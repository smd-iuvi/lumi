import Register from './Register';
import { Category } from '../constants';

export default Category({
    name: "Authentication",
    endpoints: [
        Register,
        //all endpoints of Authentication
    ]
})