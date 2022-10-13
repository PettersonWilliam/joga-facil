const Validate = schema => (req, res, next) => {
    try {
      Object.keys(schema).forEach(key => {
          let reqKey = ['params', 'query'].includes(key) ? 'filter' : 'data';
          const currentSchema = schema[key];

          const result = currentSchema.cast(currentSchema.validateSync(req[key]));

          req[reqKey] = result;
      });

      next();

    } catch(error) {
      return res.status(400).json({
        code: 'ERRO_NO_YUP',
        message: error.message
      });
  }
};

module.exports = Validate;