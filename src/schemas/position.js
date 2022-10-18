module.exports = () => {
  const yup = require("yup");

  const schema = {
    store: {
      body: yup
        .object({
          name: yup.string().required(),
          id: yup.number().nullable(),
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
          name: yup.string().nullable(),
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
  };

  return schema;
};
