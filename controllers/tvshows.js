const mongoose = require("mongoose");
const TvShow = mongoose.model("TvShow");

class TvShowController {
    GetAll(req, res) {
        TvShow.find()
            .then(shows => res.json(shows))
            .catch(err => res.json(err));
    }
    GetOne(req, res) {
        TvShow.find({_id: req.params._id})
            .then(show => res.json(show))
            .catch(err => res.json(err));
    }
    Create(req, res) {
        let tvshow = new TvShow(req.body);
        tvshow.save()
            .then(() => res.json({status: "ok"}))
            .catch(err => res.json(err));
    }
    Update(req, res) {
        TvShow.findOneAndUpdate({_id: req.params._id}, req.body)
            .then(() => res.json({status: "ok"}))
            .catch(err => res.json(err));
    }
    Delete(req, res) {
        TvShow.remove({_id: req.params._id})
            .then(() => res.json({status: "ok"}))
            .catch(err => res.json(err));
    }
}

module.exports = new TvShowController();