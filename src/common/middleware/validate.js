export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(result.error.issues);
  }
  console.log("data validated by the schema")
  req.body = result.data;
  console.log(req.body)
  next();
};