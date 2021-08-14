const router = require('Express').Router();
const log = require('../services/logging.js');

//Redirect user and log visit
router.get('/visit', (req, res) => {
    log.visit(req.query.url, req.user);
    res.redirect(req.query.url);
});

//log visit
router.post('/visit', async (req, res) => {
    try {
        await log.visit(req.body.url, req.user);
        res.send('done');
    } catch (e){
        if(e.message) res.send(e.message);
    }
});

module.exports = router;