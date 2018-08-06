interface Translations {
  common: {
    labels: {
      GENERATE: string;
      SAVE: string;
      CANCEL: string;
      CONFIRM: string;
      FROM: string;
      TO: string;
    };
  };
  timesheet: {
    labels: {
      MANAGE_TIMESHEETS: string;
      TIMESHEETS_PAST_DUE_DATE: string;
      TIMESHEETS_READY_FOR_REVIEW: string;
      TIMESHEETS_WAITING_FOR_APPROVAL: string;
      NO_TIMESHEETS: string;
      GENERATE_NEW_TIMESHEETS: string;
      TIMESHEETS_FOR_USER: string;
      GENERATED_TIMESHEETS: string;
      GENERATE_TIMESHEETS_USING_TEMPLATE: string;
    };
    messages: {
      NEED_GROUP_TO_GENERATE: string;
    };
    status: {
      IN_PROGRESS: string;
      IN_PROGRESS_SAVED: string;
      APPROVED: string;
      WAITING_FOR_APPROVAL: string;
      NEEDS_REVISEMENT: string;
    };
  };
  help: {
    labels: {
      SUPPORT_AND_HELP: string;
      MANAGE_HELP_PAGES: string;
    };
  };
  expenses: {
    status: {
      Submitted: string;
      Approved: string;
    };
  };
  projects: {
    labels: {
      PROJECT: string;
      PROJECTS: string;
      NEW_PROJECT: string;
    };
  };
  users: {
    labels: {
      USERS: string;
      NEW_USER: string;
      USER_INFO: string;
      USER_GROUPS: string;
      USER_PROFILE: string;
    };
  };
  groups: {
    labels: {
      GROUPS: string;
      NEW_GROUP: string;
      CHOOSE_A_GROUP: string;
    };
  };
  timesheetTemplates: {
    labels: {
      TIMESHEET_TEMPLATES: string;
      NEW_TIMESHEET_TEMPLATE: string;
    };
  };
}

interface Texts {
  en: Translations;
  sv: Translations;
}

const texts: Texts = {
  en: {
    common: {
      labels: {
        GENERATE: 'Generate',
        SAVE: 'Save',
        CANCEL: 'Cancel',
        CONFIRM: 'Confirm',
        FROM: 'From',
        TO: 'To',
      },
    },
    timesheet: {
      labels: {
        MANAGE_TIMESHEETS: 'Manage Timesheets',
        TIMESHEETS_PAST_DUE_DATE: 'Timesheets Past Due Date',
        TIMESHEETS_READY_FOR_REVIEW: 'Timesheets Ready for Review',
        TIMESHEETS_WAITING_FOR_APPROVAL: 'Timesheets waiting for approval',
        NO_TIMESHEETS: 'No timesheets',
        TIMESHEETS_FOR_USER: 'Timesheets for user',
        GENERATE_NEW_TIMESHEETS: 'Generate new timesheets',
        GENERATED_TIMESHEETS: 'Generated Timesheets',
        GENERATE_TIMESHEETS_USING_TEMPLATE:
          'Generate timesheets using the template',
      },
      messages: {
        NEED_GROUP_TO_GENERATE: `In order to generate timesheets, the user needs to be attached to a
        group which has a timesheet template assigned to it.`,
      },
      status: {
        IN_PROGRESS: 'In Progress',
        IN_PROGRESS_SAVED: 'In Progress (Saved)',
        APPROVED: 'Approved',
        WAITING_FOR_APPROVAL: 'Waiting for Approval',
        NEEDS_REVISEMENT: 'Needs Revisement',
      },
    },
    help: {
      labels: {
        SUPPORT_AND_HELP: 'Support & Help',
        MANAGE_HELP_PAGES: 'Manage help pages',
      },
    },
    expenses: {
      status: {
        Submitted: 'Submitted',
        Approved: 'Approved',
      },
    },
    projects: {
      labels: {
        PROJECT: 'Project',
        PROJECTS: 'Projects',
        NEW_PROJECT: 'New Project',
      },
    },
    users: {
      labels: {
        USERS: 'Users',
        NEW_USER: 'Add User',
        USER_GROUPS: 'User Groups',
        USER_INFO: 'User Info',
        USER_PROFILE: 'User Profile',
      },
    },
    groups: {
      labels: {
        GROUPS: 'Groups',
        NEW_GROUP: 'New Group',
        CHOOSE_A_GROUP: 'Choose a group...',
      },
    },
    timesheetTemplates: {
      labels: {
        TIMESHEET_TEMPLATES: 'Timesheet Templates',
        NEW_TIMESHEET_TEMPLATE: 'Create new template',
      },
    },
  },
  sv: {
    common: {
      labels: {
        GENERATE: 'Generera',
        SAVE: 'Spara',
        CANCEL: 'Avbryt',
        CONFIRM: 'Godkänn',
        FROM: 'Från',
        TO: 'Till',
      },
    },
    timesheet: {
      labels: {
        MANAGE_TIMESHEETS: 'Hantera tidrapporter',
        TIMESHEETS_PAST_DUE_DATE: 'Försenade tidrapporter',
        TIMESHEETS_READY_FOR_REVIEW: 'Tidrapporter Redo for Godkännande',
        TIMESHEETS_WAITING_FOR_APPROVAL:
          'Tidrapporter som väntar på godkännande',
        NO_TIMESHEETS: 'Inga tidrapporter',
        TIMESHEETS_FOR_USER: 'Tidrapporter för användare',
        GENERATE_NEW_TIMESHEETS: 'Generera nya tidrapporter',
        GENERATE_TIMESHEETS_USING_TEMPLATE:
          'Skapa tidrapporter genom att använda mallen',
        GENERATED_TIMESHEETS: 'Genererade tidrapporter',
      },
      messages: {
        NEED_GROUP_TO_GENERATE: `För att generera tidrapporter måste användaren vara i en grupp som har en vald tidrapporteringsmall.`,
      },
      status: {
        IN_PROGRESS: 'Aktiv',
        IN_PROGRESS_SAVED: 'Aktiv (Sparad)',
        APPROVED: 'Godkänd',
        WAITING_FOR_APPROVAL: 'Väntar på godkännande',
        NEEDS_REVISEMENT: 'Behöver ändras',
      },
    },
    help: {
      labels: {
        SUPPORT_AND_HELP: 'Support & Hjälp',
        MANAGE_HELP_PAGES: 'Hantera support sidor',
      },
    },
    expenses: {
      status: {
        Submitted: 'Inskickad',
        Approved: 'Godkänd',
      },
    },
    projects: {
      labels: {
        PROJECT: 'Projekt',
        PROJECTS: 'Projekt',
        NEW_PROJECT: 'Nytt Projekt',
      },
    },
    users: {
      labels: {
        USERS: 'Användare',
        NEW_USER: 'Skapa Användare',
        USER_GROUPS: 'Användargrupp',
        USER_INFO: 'Användarinformation',
        USER_PROFILE: 'Användarprofil',
      },
    },
    groups: {
      labels: {
        GROUPS: 'Grupper',
        NEW_GROUP: 'Skapa Grupp',
        CHOOSE_A_GROUP: 'Välj grupp...',
      },
    },
    timesheetTemplates: {
      labels: {
        TIMESHEET_TEMPLATES: 'Tidrapportsmallar',
        NEW_TIMESHEET_TEMPLATE: 'Skapa ny mall',
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
