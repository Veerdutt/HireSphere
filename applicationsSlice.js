import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_STUDENT_APPLICATIONS } from '../../data/mockData';

const initialState = {
  applications: INITIAL_STUDENT_APPLICATIONS,
  appliedJobIds: [1], // Default applied to first job
};

export const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    applyToJob: (state, action) => {
      const job = action.payload;
      if (!state.appliedJobIds.includes(job.id)) {
        state.appliedJobIds.push(job.id);
      }

      const newApp = {
        id: Date.now(),
        company: job.company,
        role: job.role,
        appliedDate: 'Just now',
        status: 'Applied',
        nextStep: 'Application Screening',
        salary: job.salary || 'Competitive',
        logoLetter: job.logoLetter || (job.company ? job.company[0] : 'C'),
        logoBg: job.logoBg || 'bg-blue-50 text-blue-600',
      };
      state.applications.unshift(newApp);
    },
    withdrawApplication: (state, action) => {
      const applicationId = action.payload;
      state.applications = state.applications.filter((app) => app.id !== applicationId);
    },
    updateApplicationStatus: (state, action) => {
      const { id, status, nextStep } = action.payload;
      const app = state.applications.find((a) => a.id === id);
      if (app) {
        if (status) app.status = status;
        if (nextStep) app.nextStep = nextStep;
      }
    },
  },
});

export const { applyToJob, withdrawApplication, updateApplicationStatus } = applicationsSlice.actions;

export const selectApplications = (state) => state.applications.applications;
export const selectAppliedJobIds = (state) => state.applications.appliedJobIds;

export default applicationsSlice.reducer;
