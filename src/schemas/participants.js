module.exports = () => {
  const yup = require("yup");

  const schema = {
    store: {
      body: yup
        .object({
          name: yup.string().required(),
          born: yup.date().nullable(),
          number: yup.number().min(1).nullable(),
          position_id: yup.number().nullable(),
        })
        .noUnknown(),
    },
    update: {
      body: yup
        .object({
          name: yup.string().nullable(),
          born: yup.date().nullable(),
          number: yup.number().nullable(),
          position_id: yup.number().nullable(),
        })
        .noUnknown(),
      params: yup.object({
        id: yup.number().required(),
      }),
    },
    delete: {
      params: yup
        .object({
          id: yup.number().required(),
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
  };

  return schema;
};
