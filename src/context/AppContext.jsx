import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { initialEvents } from '../data/events';
import { currentUserSeed, sampleParticipants } from '../data/users';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(currentUserSeed);
  const [events, setEvents] = useState(initialEvents);
  const [savedEventIds, setSavedEventIds] = useState([]);
  const [joinedEventIds, setJoinedEventIds] = useState([]);
  const [reminders, setReminders] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((message) => {
    setToastMessage(message);
  }, []);

  const dismissToast = useCallback(() => setToastMessage(null), []);

  const login = (email) => {
    setIsLoggedIn(true);
    const localPart = (email || '').trim().split('@')[0] || '';
    const derived = localPart
      ? localPart.replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      : '';
    setCurrentUser((prev) => ({
      ...prev,
      name: derived || prev.name || 'Student'
    }));
  };

  const logout = () => setIsLoggedIn(false);

  const completeOnboarding = (preferences) => {
    setCurrentUser((prev) => ({ ...prev, ...preferences }));
  };

  const saveEvent = (id) => {
    setSavedEventIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const unsaveEvent = (id) => {
    setSavedEventIds((prev) => prev.filter((eventId) => eventId !== id));
  };

  const joinEvent = (id) => {
    setJoinedEventIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id
          ? {
              ...event,
              attendeeCount: event.attendeeCount + (joinedEventIds.includes(id) ? 0 : 1),
              participants: event.participants.some((p) => p.id === currentUser.id)
                ? event.participants
                : [{ id: currentUser.id, name: currentUser.name, tags: currentUser.interests, friend: false }, ...event.participants]
            }
          : event
      )
    );
  };

  const setReminderForEvent = (id, time) => {
    setReminders((prev) => ({ ...prev, [id]: time }));
  };

  const createEvent = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const updateUserSettings = (updates) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
  };

  const savedEvents = useMemo(
    () => events.filter((event) => savedEventIds.includes(event.id)),
    [events, savedEventIds]
  );

  const joinedEvents = useMemo(
    () => events.filter((event) => joinedEventIds.includes(event.id)),
    [events, joinedEventIds]
  );

  const value = {
    isLoggedIn,
    currentUser,
    events,
    savedEventIds,
    joinedEventIds,
    reminders,
    toastMessage,
    participantsDirectory: sampleParticipants,
    login,
    logout,
    showToast,
    dismissToast,
    completeOnboarding,
    saveEvent,
    unsaveEvent,
    joinEvent,
    setReminderForEvent,
    createEvent,
    updateUserSettings,
    savedEvents,
    joinedEvents
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
