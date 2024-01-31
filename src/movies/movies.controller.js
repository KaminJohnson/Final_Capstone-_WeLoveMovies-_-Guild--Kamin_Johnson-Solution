const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const { movieId } = request.params;
  const foundMovie = await service.read(movieId);
  if(foundMovie) {
    response.locals.movie = foundMovie;
    return next();
  }
  next({
    status:404,
    message: `Movie connot be found.`
  });
}

async function read(request, response) {
  // TODO: Add your code here
  response.json({ data: response.locals.movie });
}

async function list(request, response) {
  // TODO: Add your code here.
  const { is_showing } = request.query;
  response.json({ data: await service.list(is_showing) });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  movieExists
};
