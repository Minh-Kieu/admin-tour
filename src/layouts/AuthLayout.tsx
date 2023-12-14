import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { profileSelector } from 'reducers/profileSlice';
import { authRoute, privateRoute } from 'routes';

const AuthLayout = () => {
  const navigator = useNavigate();
  const { isLoggedIn } = useSelector(profileSelector);

  useEffect(() => {
    if (isLoggedIn) {
      navigator(privateRoute.tours.path, { replace: true });
    }
  }, [isLoggedIn, navigator]);

  return (
    <div
      className='flex h-[100vh]'
      style={{
        background: `#0a0a0a url(${require('assets/bg/Travel-Bg.png')}) no-repeat center / cover`,
      }}
    >
      <Routes>
        {Object.values(authRoute).map(({ path, component: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
        <Route path='/*' element={<Navigate to={authRoute.login.path} />} />
      </Routes>
    </div>
  );
};

export default AuthLayout;
