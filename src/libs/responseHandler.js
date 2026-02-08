export const successResponse = (
  res,
  data,
  status = 200,
  message = "Operacion exitosa",
) => {
  res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res,
  message = "Error en la peticion",
  status = 500,
  error = null,
) => {
  res.status(status).json({
    success: false,
    message,
    error: error?.message || null,
  });
};
