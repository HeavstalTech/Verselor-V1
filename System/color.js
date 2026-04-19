import chalk from 'chalk';

const color = (text, colorName) => {
    return !colorName ? chalk.green(text) : (chalk[colorName] ? chalk[colorName](text) : chalk.green(text));
};

const bgcolor = (text, bgcolorName) => {
    return !bgcolorName ? chalk.green(text) : (chalk[bgcolorName] ? chalk[bgcolorName](text) : chalk.green(text));
};

const Lognyong = (text, colorName) => {
    return !colorName 
        ? chalk.yellow('[ ! ] ') + chalk.green(text) 
        : chalk.yellow('=> ') + (chalk[colorName] ? chalk[colorName](text) : chalk.green(text));
};

export {
    color,
    bgcolor,
    Lognyong
};