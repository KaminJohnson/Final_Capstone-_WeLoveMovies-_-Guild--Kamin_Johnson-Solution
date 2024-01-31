const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(request, response) {
  // TODO: Add your code here
  const { movieId } = request.params;
  if(movieId) {
    response.json({ data: await service.list(movieId) });
  } else {
    response.json({ data: await service.listAll()});
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
};
