import { useAppDispatch,useAppSelector } from "../hook/useAppDispatch";
import { login,logout } from "./authThunks";

const AuthView = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(login({ logname: 'splashmela', password: 'demo1234' }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default AuthView;