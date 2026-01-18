export const successResponse = (res, data, status = 200) => {
  res.status(status).json({
    ok: true,
    data
  });
};

export const errorResponse = (res, message, status = 500) => {
  res.status(status).json({
    ok: false,
    error: message
  });
};