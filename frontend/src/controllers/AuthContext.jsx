import { createContext, useContext, useState, useEffect } from 'react';
import * as userModel from '../models/userModel';
import * as sessionModel from '../models/sessionModel';
import * as profileModel from '../models/profileModel';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = sessionModel.get();
    if (session?.userId) {
      const found = userModel.findById(session.userId);
      if (found) setUser(found);
      else sessionModel.clear();
    }
    setLoading(false);
  }, []);

  function login(phone, password) {
    const found = userModel.findByPhone(phone);
    if (!found || found.password !== password) return false;
    sessionModel.set(found.id);
    setUser(found);
    return true;
  }

  function signup({ fullName, phone, password }) {
    const existing = userModel.findByPhone(phone);
    if (existing) return null;
    const newUser = userModel.create({ fullName, phone, password });
    sessionModel.set(newUser.id);
    setUser(newUser);
    return newUser;
  }

  function logout() {
    sessionModel.clear();
    setUser(null);
  }

  function deleteAccount() {
    if (!user) return;
    profileModel.remove(user.id);
    sessionModel.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
