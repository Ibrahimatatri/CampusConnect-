import { createContext, useContext, useMemo, useState } from 'react';
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

  const login = () => setIsLoggedIn(true);
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

  const value = {
    isLoggedIn,
    currentUser,
    events,
    savedEventIds,
    joinedEventIds,
    reminders,
    participantsDirectory: sampleParticipants,
    login,
    logout,
    completeOnboarding,
    saveEvent,
    unsaveEvent,
    joinEvent,
    setReminderForEvent,
    createEvent,
    updateUserSettings,
    savedEvents
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
