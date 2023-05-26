module.exports = (app) => {
    app.use('/cep', require('./routes/cep.js'));
}