module.exports = {

    logger: function(req, res, next) {
        let message = "\n";
        const c = {
            blue_bg: "\x1b[44m",
            yellow_fg: "\x1b[33m",
            cyan_fg: "\x1b[36m",
            bright: "\x1b[1m",
            default: "\x1b[0m"
        };

        message += `${c.default} ${c.blue_bg} > ${c.bright}${c.yellow_fg}`;
        message += `${req.method} ${c.default} `;
        message += `${c.bright}${c.cyan_fg}`;
        message += `${req.originalUrl}`;
        message += `${c.default}\n`;
        
        console.log(message);

        next();
    }
};