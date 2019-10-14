const TvShows = require('../controllers/tvshows');

module.exports = function(app) {
    app.get("/tvshow", TvShows.GetAll);
    app.get("/tvshow/:_id", TvShows.GetOne);
    app.post("/tvshow", TvShows.Create);
    app.put("/tvshow/:_id", TvShows.Update);
    app.delete("/tvshow/:_id", TvShows.Delete);
}