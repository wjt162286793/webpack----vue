module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-custom-properties'),
        require('postcss-calc'),
        require('postcss-nesting'),
        require('autoprefixer')
    ]
};