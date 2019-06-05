export const INITIAL_STATE = {
  step: 1,
  uploadingImage: false,
  fileToUpload: null,
  errorOnImageFile: null,
  sending: false,
  error: null,
  steps: [
    {
      title: {
        value: null,
        isValid: null
      },
      imageUrl: {
        value: null,
        isValid: null
      },
      link: {
        value: null,
        isValid: null
      },
      description: {
        value: null,
        isValid: null
      },
      genre: {
        value: null,
        isValid: null
      },
      parentalRating: {
        value: 'Livre',
        isValid: true
      },
      content: {
        value: null,
        isValid: null
      },
      tags: {
        value: [],
        isValid: true
      }
    },
    {
      cast: {
        value: [],
        isValid: true
      },
      members: {
        value: [],
        isValid: true
      }
    },
    {
      isIndependent: {
        value: null,
        isValid: null
      }
    },
    {
      discipline: {
        value: null,
        isValid: null
      },
      semester: {
        value: null,
        isValid: null
      },
      professor: {
        value: null,
        isValid: null
      },
      about: {
        value: null,
        isValid: null
      },
      events: {
        value: null,
        isValid: null
      },
      shouldVerifyEvents: {
        value: false,
        isValid: true
      }
    }
  ]
};
