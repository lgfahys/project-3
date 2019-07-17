const _color = {

    // text / foreground
    black_fg: "\x1b[30m",
    red_fg: "\x1b[31m",
    green_fg: "\x1b[32m",
    yellow_fg: "\x1b[33m",
    blue_fg: "\x1b[34m",
    magenta_fg: "\x1b[35m",
    cyan_fg: "\x1b[36m",
    white_fg: "\x1b[37m",

    // background 
    black_bg: "\x1b[40m",
    red_bg: "\x1b[41m",
    green_bg: "\x1b[42m",
    yellow_bg: "\x1b[43m",
    blue_bg: "\x1b[44m",
    magenta_bg: "\x1b[45m",
    cyan_bg: "\x1b[46m",
    white_bg: "\x1b[47m",

    // modifiers
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    default: "\x1b[0m"
};

module.exports = {
    
    logger: function(req, res, next) {
        let message = "\n";

        message += `${_color.default} ${_color.blue_bg} > ${_color.bright}${_color.yellow_fg}`;
        message += `${req.method} ${_color.default} `;
        message += `${_color.bright}${_color.cyan_fg}`;
        message += `${req.originalUrl}`;
        message += `${_color.default}\n`;
        
        console.log(message);

        next();
    }
};