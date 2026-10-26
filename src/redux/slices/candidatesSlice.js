import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_RECRUITER_CANDIDATES } from '../../data/mockData';

const initialState = {
  candidates: INITIAL_RECRUITER_CANDIDATES,
};

export const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    addCandidate: (state, action) => {
      state.candidates.unshift(action.payload);
    },
    updateCandidateStatus: (state, action) => {
      const { id, status } = action.payload;
      const candidate = state.candidates.find((c) => c.id === id);
      if (candidate) {
        candidate.status = status;
      }
    },
  },
});

export const { addCandidate, updateCandidateStatus } = candidatesSlice.actions;

export const selectCandidates = (state) => state.candidates.candidates;

export default candidatesSlice.reducer;
