import { useState, useEffect } from 'react';
import * as profileModel from '../models/profileModel';
import { useAuth } from './AuthContext';

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      setProfile(profileModel.get(user.id));
    }
  }, [user]);

  function save(data) {
    if (!user) return;
    profileModel.save(user.id, data);
    setProfile({ ...data, updatedAt: new Date().toISOString() });
  }

  function remove() {
    if (!user) return;
    profileModel.remove(user.id);
    setProfile(null);
  }

  return { profile, save, remove };
}
