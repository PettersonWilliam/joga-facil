const Validate = (schema) =>  (req, res, next) => {
    try {
      Object.keys(schema).forEach(key => {
          let reqKey = ['params', 'query'].includes(key) ? 'filter' : 'data';
          const currentSchema = schema[key];

          const result = currentSchema.cast(currentSchema.validateSync(req[key]));

          req[reqKey] = result;
      });

      next();

    } catch(e) {
      console.log(e, 'estou akiiiiiiiiiiiiiiiiiiiiiiiIIIIIIIIIIIIIIIIIIIIIII');
      return res.status(400).json({
        error: 'ERRO NO YUP'
      });
  }
};

module.exports = Validate;