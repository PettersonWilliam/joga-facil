module.exports = () => {
  const yup = require("yup");

  const schema = {
    store: {
      body: yup
        .object({
          name: yup.string().required(),
          password: yup.string().min(6).required(),
          email: yup.string().email().required(),
        })
        .noUnknown(),
    },
    show: {
      params: yup
        .object({
          id: yup.number().required().min(1),
        })
        .noUnknown(),
    },
    login: {
      body: yup
        .object({
          password: yup.string().min(6).required(),
          email: yup.string().email().required(),
        })
        .noUnknown(),
    },
    update: {
      body: yup
        .object({
          name: yup.string().nullable(),
          password: yup.string().min(6).nullable(),
          email: yup.string().email().nullable(),
        })
        .noUnknown(),
      params: yup.object({
        id: yup.number().required().min(1),
      }),
    },
    delete: {
      params: yup
        .object({
          id: yup.number().required().min(1),
        })
        .noUnknown(),
    },
  };

  return schema;
};
