export const successResponse = (data, message = "Operacion exitosa") => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (
  message = "Error en la peticion",
  error = null,
) => {
  return {
    success: false,
    message,
    error: error?.message || error || null,
  };
};
