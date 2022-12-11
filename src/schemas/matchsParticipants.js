module.exports = () => {
  const yup = require("yup");

  const schema = {
    store: {
      body: yup
        .object({
          match_id: yup.number().required(),
          participant_id: yup.number().required(),
          is_confirmed: yup.boolean().required(),
          gols: yup.number().required(),
          rate: yup.number().required()
        })
        .noUnknown()
    },
    show: {
      params: yup
        .object({
          id: yup.number().required()
        })
        .noUnknown()
    },
    update: {
      body: yup
        .object({
          match_id: yup.number().required(),
          participant_id: yup.number().required(),
          is_confirmed: yup.boolean().required(),
          gols: yup.number().nullable(),
          rate: yup.number().nullable()
        })
        .noUnknown(),
      params: yup
        .object({
          id: yup.number().required()
        })
        .noUnknown()
    },
    updateIsConfirmed: {
      body: yup
        .object({
          is_confirmed: yup.boolean().required(),
        })
        .noUnknown(),
      params: yup
        .object({
          id: yup.number().required()
        })
        .noUnknown()
    },
    delete: {
      params: yup
        .object({
          id: yup.number().required()
        })
        .noUnknown()
    }
  };

  return schema;
};
