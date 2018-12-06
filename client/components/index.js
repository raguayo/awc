/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Main } from './main';
export { default as UserHome } from './user-home';
export { default as CelebList } from './CelebList';
export { default as ManageUsers } from './admin_components/ManageUsers';
export { default as SelectedUser } from './admin_components/SelectedUser';
export { default as ResetPassword } from './ResetPassword';
export { default as OrdersList } from './OrdersList';
export { default as CartList } from './CartList';
export { default as AddCelebrity } from './admin_components/AddCelebrity';
export { default as EditCelebrity } from './admin_components/EditCelebrity';
export { default as Celeb } from './Celeb';
export { default as Celebtivity } from './Celebtivity';
export { default as About } from './About';
export { Login, Signup } from './auth-form';
