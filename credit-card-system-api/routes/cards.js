const express = require('express');
const router = express.Router();
const Cards = require('./../modals/cards');

/* GET home page. */
router.get('/', function(req, res, next) {
  Cards.find().then( cards => {
    res.send(cards);
  }).catch( (err) => {
    res.status(500).send({
      message: err.message,
    });
  });
});

router.post('/', function(req, res) {
  Cards.find({ cardNumber: req.body.cardNumber }).then( (card, error) => {
    if (card.length !=0) {
      const JoiError = {
        status: 'failed',
        error: {
          details: [
            {
              message: "Card Already exist",
            }
          ]
        }
      };
    return res.status(422).json(JoiError);

    } else {
      const newCard = new Cards(req.body);
      return newCard.save()
        .then( newlyCreatedCard => res.send(newlyCreatedCard))
        .catch( err => res.status(500).send({ message: err.message }) )
    }

  });

});

module.exports = router;
