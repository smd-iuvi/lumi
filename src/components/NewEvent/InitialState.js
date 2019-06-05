export const INITIAL_STATE = {
  uploadingImage: false,
  fileToUpload: null,
  errorOnImageFile: null,
  sending: false,
  error: null,
  step: 1,
  steps: [
    {
      name: {
        value: null,
        isValid: null
      },
      imageUrl: {
        value: null,
        isValid: null
      },
      discipline: {
        value: null,
        isValid: null
      },
      semester: {
        value: null,
        isValid: null
      },
      description: {
        value: null,
        isValid: null
      }
    },
    {
      date: {
        value: null,
        isValid: null
      }
    }
  ]
};
