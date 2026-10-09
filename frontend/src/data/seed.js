import { read, KEYS } from '../models/storage';
import * as userModel from '../models/userModel';
import * as sessionModel from '../models/sessionModel';
import * as profileModel from '../models/profileModel';

const DEMO_PROFILE = {
  age: 45,
  gender: 'MALE',
  weightKg: 82,
  bloodType: 'O+',
  pregnant: null,
  conditions: ['DIABETES', 'HYPERTENSION'],
  diabetesType: 'TYPE2',
  otherConditions: '',
  allergies: ['البنسلين', 'المكسرات'],
  medications: [
    { name: 'وارفارين', dose: '5 ملغ', frequency: 'مرة يومياً', isAnticoagulant: true },
    { name: 'ميتفورمين', dose: '500 ملغ', frequency: 'مرتين يومياً', isAnticoagulant: false },
  ],
  emergencyContact: { name: 'سارة', phone: '0798765432' },
};

export function seedIfEmpty() {
  const users = read(KEYS.USERS, []);
  if (users.length > 0) return;

  const user = userModel.create({
    fullName: 'أحمد محمد',
    phone: '0790000000',
    password: '123456',
  });

  profileModel.save(user.id, DEMO_PROFILE);
}
