import test from 'node:test';
import assert from 'node:assert/strict';
import { useDashboardStore as store, SAMPLE_REQUEST } from '../src/state/useDashboardStore.js';

const reset = () => store.setState({ online: false, trip: null, completed: [], dismissed: false });
test('offline drivers cannot accept a request', () => {
  reset(); store.getState().acceptRequest(); assert.equal(store.getState().trip, null);
});
test('sample delivery progresses through pickup and earns exactly once', () => {
  reset(); store.getState().toggleOnline(); store.getState().acceptRequest();
  assert.equal(store.getState().trip.status, 'pickup');
  store.getState().toggleOnline(); assert.equal(store.getState().online, true);
  store.getState().advanceTrip(); assert.equal(store.getState().trip.status, 'delivery');
  assert.equal(store.getState().completed.length, 0);
  store.getState().advanceTrip(); store.getState().advanceTrip();
  assert.equal(store.getState().trip, null);
  assert.equal(store.getState().completed.length, 1);
  assert.equal(store.getState().completed[0].amount, SAMPLE_REQUEST.amount);
  store.getState().acceptRequest(); assert.equal(store.getState().trip, null);
  store.getState().toggleOnline(); assert.equal(store.getState().online, false);
});
test('skipped requests cannot be accepted until going online again', () => {
  reset(); store.getState().toggleOnline(); store.getState().dismissRequest();
  store.getState().acceptRequest(); assert.equal(store.getState().trip, null);
  store.getState().toggleOnline(); store.getState().toggleOnline(); store.getState().acceptRequest();
  assert.equal(store.getState().trip.id, SAMPLE_REQUEST.id);
});
