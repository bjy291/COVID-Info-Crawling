const router = require('express').Router();
const main = require('../routing/main');
router.get('/',main.main); //메인페이지
router.get('/state', main.state);
router.get('/grap', main.grap);
router.get('/in_state', main.in_state);
router.get('/world', main.world);
router.get('/mask', main.mask);
router.post('/mask', main.maskpost);
router.get('/seoul', main.seoul);
router.get('/gunggi', main.gunggi);
router.get('/deagu', main.deagu);
router.get('/location', main.location);
router.post('/location', main.locationpost);
module.exports = router;