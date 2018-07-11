const texts = {
  en: {
    timesheet: {
      status: {
        IN_PROGRESS: 'In Progress',
        IN_PROGRESS_SAVED: 'In Progress (Saved)',
        APPROVED: 'Approved',
        WAITING_FOR_APPROVAL: 'Waiting for Approval',
        NEEDS_REVISEMENT: 'Needs Revisement',
      },
    },
    expenses: {
      status: {
        Submitted: 'Submitted',
        Approved: 'Approved',
      },
    },
  },
  sv: {
    timesheet: {
      status: {
        IN_PROGRESS: 'Aktiv',
        IN_PROGRESS_SAVED: 'Aktiv (Sparad)',
        APPROVED: 'Godkänd',
        WAITING_FOR_APPROVAL: 'Väntar på godkännande',
        NEEDS_REVISEMENT: 'Behöver ändras',
      },
    },
    expenses: {
      status: {
        Submitted: 'Inskickad',
        Approved: 'Godkänd',
      },
    },
  },
};

const getPropValueAtPath = (obj: any, path: string): any => {
  const result = obj || {};
  const sections = path.split('.');
  const nextSection = sections[0];
  if (sections.length > 1) {
    return getPropValueAtPath(result[nextSection], sections.slice(1).join('.'));
  }
  return result[nextSection];
};

export class TextManager {
  language: string;

  constructor() {
    this.language = 'en';
  }

  changeLanguage(language: string): void {
    this.language = language;
  }

  display(path: string): string {
    const text = getPropValueAtPath(texts[this.language], path);

    if (typeof text === 'undefined') {
      return `#missing_resource:${path}#`;
    }

    return text;
  }
}

export default new TextManager();
