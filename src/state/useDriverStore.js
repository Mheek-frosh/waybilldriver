import { create } from 'zustand';
export const useDriverStore = create(set => ({
  draft: { vehicleType: '', method: 'phone', phone: '', email: '', name: '', city: '', make: '', plate: '' },
  update: values => set(state => ({ draft: { ...state.draft, ...values } })),
}));
