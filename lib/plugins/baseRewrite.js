module.exports = {
    beforeSend: function(req, res, next) {
    	if(!req.prerender.documentHTML) {
    		return next();
    	}

        var matches = req.prerender.documentHTML.toString().match(/<base(.*?)>/gi);
        for (var i = 0; matches && i < matches.length; i++) {
            req.prerender.documentHTML = req.prerender.documentHTML.toString().replace(matches[i], '<base href="'+process.env.PRERENDER_BASE+'"/>');
        }

        next();
    }
};
