const router = require('express').Router();
let Disaster = require('../models/disaster.model');

router.route('/').get((req,res) => {
    Disaster.find() /*.limit(5) */
        .then(disasters => res.json(disasters))
        .catch(err => res.status(400).json('Error: ' + err));
}

);

//to the db
router.route('/add').post((req,res) => {
    const disasterName = req.body.disasterName;
    const location = req.body.location ;
    const description = req.body.description;
    const dateDiscovered = Date.parse(req.body.dateDiscovered)
    const responseStatus = req.body.responseStatus;

    const newDisaster = new Disaster({
        disasterName,
        location,
        description,
        dateDiscovered,
        responseStatus,

    });
    newDisaster.save()
        .then(() => res.json('Yes! We have added a new disaster!'))
        .catch(err => res.status(400).json('Damn! There\'s been an error: ' + err));

    // Dennis's code
    // const disaster = new Disaster({
    //     disasterName:req.body.disasterName,
    //     location:req.body.location,
    //     description:req.body.description,
    //     responseStatus:req.body.responseStatus
    // });
    // try{
    //     const savedDisaster=await disaster.save();
    //     res.json(savedDisaster);
    // }catch(err){
    //     res.json({message:err});
    // }
});

// get a specific disaster

router.route('/:id').get((req, res) => {
    Disaster.findById(req.params.id)
        .then(disaster => res.json(disaster))
        .catch(err => res.status(400).json('Error: ' + err));

});

// delete disaster

router.route('/:id').get((req, res) => {
    Disaster.findByIdAndDelete(req.params.id)
        .then(disaster => res.json('We\'ve deleted that disaster'))
        .catch(err => res.status(400).json('Error: ' + err));

});

// Update disaster

router.route('update/:id').post((req, res) => {
    Disaster.findById(req.params.id)
        .then(disaster => {
            disaster.disasterName = req.body.disasterName;
            disaster.location = req.body.location;
            disaster.description = req.body.description;
            disaster.dateDiscovered = req.body.dateDiscovered;
            disaster.responseStatus = req.body.responseStatus;
            
            disaster.save()
                .then(() => res.json('We\'ve updated the disaster'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;