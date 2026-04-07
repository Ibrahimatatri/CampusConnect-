import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import MapNavigation from './pages/MapNavigation';
import Participants from './pages/Participants';
import CreateEvent from './pages/CreateEvent';
import SavedEvents from './pages/SavedEvents';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import JoinedEvents from './pages/JoinedEvents';
import Toast from './components/Toast';
import { useApp } from './context/AppContext';

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useApp();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const location = useLocation();
  const { toastMessage, dismissToast } = useApp();
  const hideNav = ['/', '/login', '/onboarding'].includes(location.pathname);

  return (
    <div className="app-shell">
      <Toast message={toastMessage} onDismiss={dismissToast} />
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event/:id"
          element={
            <ProtectedRoute>
              <EventDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/map/:id"
          element={
            <ProtectedRoute>
              <MapNavigation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/participants/:id"
          element={
            <ProtectedRoute>
              <Participants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <SavedEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/joined"
          element={
            <ProtectedRoute>
              <JoinedEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
