import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_ADMIN_DRIVES, INITIAL_JOBS } from '../../data/mockData';

const initialState = {
  drives: INITIAL_ADMIN_DRIVES,
  jobs: INITIAL_JOBS,
};

export const drivesSlice = createSlice({
  name: 'drives',
  initialState,
  reducers: {
    createRecruiterDrive: (state, action) => {
      const newDrive = {
        id: Date.now(),
        ...action.payload,
        status: 'Pending',
        registered: 0,
      };
      state.drives.unshift(newDrive);
    },
    adminAddDrive: (state, action) => {
      const drivePayload = action.payload;
      const newDrive = {
        id: Date.now(),
        ...drivePayload,
        status: drivePayload.status || 'Approved',
        registered: drivePayload.registered || 0,
      };
      state.drives.unshift(newDrive);

      // Automatically add to student jobs if approved so students can see and apply
      if (newDrive.status === 'Approved') {
        const newJob = {
          id: newDrive.id,
          role: newDrive.role,
          company: newDrive.company,
          location: newDrive.location || 'On-Campus',
          salary: newDrive.ctc || newDrive.salary || 'Competitive',
          deadline: newDrive.date || newDrive.deadline || 'Aug 30, 2026',
          category: newDrive.category || 'Software',
          tags: newDrive.tags || ['On-Campus', 'Direct Drive'],
          type: newDrive.type || 'Full-time',
          logoLetter: newDrive.logoLetter || (newDrive.company ? newDrive.company[0].toUpperCase() : 'C'),
          logoBg: newDrive.logoBg || 'bg-purple-50 text-purple-600',
          eligibility: newDrive.eligibility || 'All Eligible Students',
          description: newDrive.description || `Campus placement drive scheduled by ${newDrive.company} for the ${newDrive.role} position. Package: ${newDrive.ctc || 'Competitive'}.`,
        };
        state.jobs.unshift(newJob);
      }
    },
    updateDriveStatus: (state, action) => {
      const { id, status } = action.payload;
      const drive = state.drives.find((d) => d.id === id);
      if (drive) {
        drive.status = status;

        if (status === 'Approved') {
          // If approved by TPO Admin, make it visible to students
          const alreadyInJobs = state.jobs.some((j) => j.id === id);
          if (!alreadyInJobs) {
            const newJob = {
              id: drive.id,
              role: drive.role,
              company: drive.company,
              location: drive.location || 'On-Campus',
              salary: drive.ctc || drive.salary || 'Competitive',
              deadline: drive.date || drive.deadline || 'Rolling Basis',
              category: drive.category || 'Software',
              tags: drive.tags || ['Campus Drive', 'Approved'],
              type: drive.type || 'Full-time',
              logoLetter: drive.logoLetter || (drive.company ? drive.company[0].toUpperCase() : 'C'),
              logoBg: drive.logoBg || 'bg-emerald-50 text-emerald-600',
              eligibility: drive.eligibility || 'All Eligible Students',
              description: drive.description || `Campus placement drive by ${drive.company} for ${drive.role}.`,
            };
            state.jobs.unshift(newJob);
          }
        } else if (status === 'Pending' || status === 'Rejected') {
          // If revoked or put on hold, remove from student view
          state.jobs = state.jobs.filter((j) => j.id !== id);
        }
      }
    },
  },
});

export const { createRecruiterDrive, adminAddDrive, updateDriveStatus } = drivesSlice.actions;

export const selectDrives = (state) => state.drives.drives;
export const selectJobs = (state) => state.drives.jobs;

export default drivesSlice.reducer;
