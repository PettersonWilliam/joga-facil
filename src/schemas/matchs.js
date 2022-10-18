module.exports = () => {
  const yup = require("yup");

  const schema = {
    store: {
      body: yup
        .object({
          date: yup.date().required(),
          status: yup.string().required(),
          started_at: yup.date().required(),
          end_at: yup.string().required(),
          team_amount: yup.number().required(),
        })
        .noUnknown(),
    },
    show: {
      params: yup
        .object({
          id: yup.number().required(),
        })
        .noUnknown(),
    },
    update: {
      body: yup
        .object({
          date: yup.date().required(),
          status: yup.string().required(),
          started_at: yup.date().required(),
          end_at: yup.string().required(),
          team_amount: yup.number().required(),
        })
        .noUnknown(),
      params: yup
        .object({
          id: yup.number().required(),
        })
        .noUnknown(),
    },
    delete: {
      params: yup
        .object({
          id: yup.number().required(),
        })
        .noUnknown(),
    },
  };

  return schema;
};
