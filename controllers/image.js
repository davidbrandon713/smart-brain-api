const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai. 
const app = new Clarifai.App({
 apiKey: 'b89c7f7a983348bc954ba86237e65638' 
});

const apiModel = {
  id: 'face-detection',
  name: 'face-detection',
  version: '6dc7e46bc9124c5c8824be4822abe105',
  type: 'visual-detector',
}


const handleApiCall = (req, res) => {
  app.models
    // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
    // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
    // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
    // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
    // is to use a different version of their model that works like the ones found here: https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
    // so you would change from:
    // .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    // to:
    // .predict('53e1df302c079b3db8a0a36033ed2d15', req.body.input)  <== this model is face-clustering, not face-detection.
    //
    //
    // **************************
    // Clarifai.FACE_DETECT_MODEL           -- Current model, broken
    //
    //
    // ***********************************************************************
    // ***  FROM https://clarifai.com/clarifai/main/models/face-detection  ***
    // ***       ?utm_source=clarifai&utm_medium=referral&tab=versions     ***
    //
    // -- '6dc7e46bc9124c5c8824be4822abe105'   -- 2021-03-04
    // -- '45fb9a671625463fa646c3523a3087d5'   -- 2021-03-04
    // -- 'fe995da8cb73490f8556416ecf25cea3'   -- 2021-01-26
    // -- 'b8fa05a04e0649a1a9d3186b246a59b3'   -- 2020-11-25
    // -- '5e026c5fae004ed4a83263ebaabec49e'   -- 2020-10-14
    //
    //
    // ***************************************************************************************
    // ***  FROM https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js  ***
    //
    // -- '53e1df302c079b3db8a0a36033ed2d15'   -- Face Clustering
    // -- 'e9576d86d2004ed1a38ba0cf39ecb4b1'   -- NSFW detection
    //
    .predict(apiModel, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    // If you are using knex.js version 1.0.0 or higher this now returns an array of objects. Therefore, the code goes from:
    // entries[0] --> this used to return the entries
    // TO
    // entries[0].entries --> this now returns the entries
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}