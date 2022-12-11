module.exports = () => {
  const yup = require("yup");

  const schema = {
    store: {
      body: yup
        .object({
          date: yup.date().required(),
          started_at: yup.date().required(),
          end_at: yup.date().required(),
          team_amount: yup.number().required(),
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
          date: yup.date().nullable(),
          started_at: yup.date().nullable(),
          end_at: yup.date().nullable(),
          team_amount: yup.number().nullable()
        })
        .noUnknown(),
      params: yup
        .object({
          id: yup.number().required()
        })
        .noUnknown()
    },
    updateStatus: {
      body: yup
        .object({
          status: yup.string().required()
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
