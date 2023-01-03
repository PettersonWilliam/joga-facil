const SchemaValidator = (schema) => (req, res, next) => {
  try {
    Object.keys(schema).forEach((key) => {
      	const filterOuData = ["params", "query"].includes(key) ? "filter" : "data";
      	const currentSchema = schema[key]; // pega o schema da gente

      	const result = currentSchema.cast(currentSchema.validateSync(req[key])); // compara com o req[key], pode ser oq req.body, req.params ou req.query

      	req[filterOuData] = result; // cria mais uma chave (filter ou data), e coloca o objeto validado dentro dela
    });

    next(); // passa para o próximo passo
  } catch (error) {
	// se deu um erro, cai no catch

    return res.status(400).json({ // retorno o erro do yup
      code: "ERRO_NO_YUP",
      message: error.message,
    });
  }
};

export default SchemaValidator;
