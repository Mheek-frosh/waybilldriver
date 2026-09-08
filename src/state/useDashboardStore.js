import { create } from 'zustand';

export const SAMPLE_REQUEST = {
  id: 'WB-DEMO-01', pickup: 'Admiralty Way, Lekki', dropoff: 'Adeola Odeku, Victoria Island',
  amount: 3500, distance: '6.2 km', duration: '24 min', parcel: 'Sealed package · 2 kg',
};
export const useDashboardStore = create((set, get) => ({
  online: false, trip: null, completed: [], dismissed: false,
  toggleOnline: () => { if (!get().trip) set(state => ({ online: !state.online, dismissed: false })); },
  dismissRequest: () => set({ dismissed: true }),
  acceptRequest: () => {
    const state = get();
    if (state.online && !state.trip && !state.dismissed && !state.completed.length) set({ trip: { ...SAMPLE_REQUEST, status: 'pickup' } });
  },
  advanceTrip: () => {
    const { trip } = get();
    if (!trip) return;
    if (trip.status === 'pickup') set({ trip: { ...trip, status: 'delivery' } });
    else set(state => ({ trip: null, completed: [...state.completed, { ...trip, status: 'completed' }], dismissed: true }));
  },
}));
