import { isValidEmail } from './email.js';
export const VEHICLES = [
  { id: 'Rider', icon: 'bicycle-outline', title: 'Rider', description: 'Motorbike deliveries', detail: 'Small parcels. Quick trips.' },
  { id: 'Van', icon: 'car-outline', title: 'Van', description: 'Room for more', detail: 'Boxes, packages and everyday cargo.' },
  { id: 'Truck', icon: 'bus-outline', title: 'Truck', description: 'Made for the big moves', detail: 'Heavy loads and larger deliveries.' },
];
export function normalizePhone(value) { return value.replace(/\D/g, '').replace(/^234/, '').replace(/^0/, ''); }
export function validateStep(step, draft) {
  if (!VEHICLES.some(v => v.id === draft.vehicleType)) return 'Choose Rider, Van or Truck to continue.';
  if (step === 0) return draft.method === 'email'
    ? (isValidEmail(draft.email) ? '' : 'Enter a valid email address.')
    : (/^[789]\d{9}$/.test(normalizePhone(draft.phone)) ? '' : 'Enter a valid Nigerian mobile number.');
  if (step === 1) {
    if (draft.name.trim().length < 2) return 'Enter your full name.';
    if (draft.city.trim().length < 2) return 'Enter the city where you want to deliver.';
  }
  if (step === 2) {
    if (draft.make.trim().length < 2) return 'Enter your vehicle make and model.';
    if (!/^[A-Z0-9 -]{4,15}$/i.test(draft.plate.trim()) || !/[a-z]/i.test(draft.plate) || !/\d/.test(draft.plate)) return 'Enter a valid vehicle plate number.';
  }
  return '';
}
