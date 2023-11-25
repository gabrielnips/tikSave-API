const router = require('express').Router();
const { tiktokDL } = require('../models/dwTik');

const extractDomain = (inputUrl) => {
    const parsedUrl = new URL(inputUrl);
    return parsedUrl.hostname;
};

router.get('/dw', async (req, res) => {
    try {
        const userProvidedUrl = req.query.url;

        if (!userProvidedUrl) {
            return res.status(400).json({ success: false, error: 'URL not founded' });
        }

        const domain = extractDomain(userProvidedUrl);

        if (domain === 'www.tiktok.com' || domain === 'vm.tiktok.com') {
            const results = await tiktokDL(userProvidedUrl);
            return res.json({ success: true, data: results });
        } else {
            return res.status(400).json({ success: false, error: 'URL not allowed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal error' });
    }
});

module.exports = router;
