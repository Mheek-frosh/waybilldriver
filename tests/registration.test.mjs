import test from 'node:test';
import assert from 'node:assert/strict';
import { validateStep, normalizePhone } from '../src/utils/registration.js';
const draft = { vehicleType: 'Rider', method: 'phone', phone: '08012345678', email: 'driver@example.com', name: 'Ada Driver', city: 'Lagos', make: 'Honda ACE 125', plate: 'ABC 123 XY' };
test('every vehicle can complete the registration steps', () => {
  for (const vehicleType of ['Rider', 'Van', 'Truck']) for (const method of ['email', 'phone']) for (const step of [0, 1, 2]) assert.equal(validateStep(step, { ...draft, vehicleType, method }), '');
});
test('normalizes local and international Nigerian numbers', () => {
  for (const number of ['0801 234 5678', '+2348012345678', '8012345678']) assert.equal(normalizePhone(number), '8012345678');
});
test('blocks missing selection and invalid contacts', () => {
  for (const patch of [{ vehicleType: '' }, { phone: '1234567890' }, { phone: '0801234' }, { method: 'email', email: 'bad@' }]) assert.ok(validateStep(0, { ...draft, ...patch }));
});
test('blocks missing profile and vehicle details', () => {
  assert.ok(validateStep(1, { ...draft, name: ' ' }));
  assert.ok(validateStep(1, { ...draft, city: '' }));
  assert.ok(validateStep(2, { ...draft, make: '' }));
  assert.ok(validateStep(2, { ...draft, plate: '!!!!' }));
});
