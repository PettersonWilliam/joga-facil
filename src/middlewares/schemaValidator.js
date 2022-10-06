const Validate = (schema) => async (req, res, next) => {
    try {
      Object.keys(schema).forEach(key => {
          let reqKey = ['params', 'query'].includes(key) ? 'filter' : 'data';
          const currentSchema = schema[key];

          const result = currentSchema.cast(currentSchema.validateSync(req[key]));

          req[reqKey] = result;
      });

      next();
    } catch(e) {
      return res.status(400).json({
        errors: e.errors.map(err => err),
      });
  }
};

module.exports = Validate;