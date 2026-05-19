// Honest accreditation status — no fake ISO/TÜRKAK logos.
// LaboraFood is in the DAK (Kosovo Accreditation Directorate) process.

export const accreditationSteps = [
  { id: "qms",         status: "done",     icon: "CheckCircle2" },
  { id: "docs",        status: "done",     icon: "CheckCircle2" },
  { id: "application", status: "inProgress", icon: "Loader" },
  { id: "onsite",      status: "pending",  icon: "Circle" },
  { id: "decision",    status: "pending",  icon: "Circle" },
];

export const regulatoryFrameworks = [
  {
    id: "auv",
    icon: "Shield",
    code: "AUV",
  },
  {
    id: "eu178",
    icon: "Scale",
    code: "EU 178/2002",
  },
  {
    id: "skeniso",
    icon: "BookOpen",
    code: "SK EN ISO",
  },
];
