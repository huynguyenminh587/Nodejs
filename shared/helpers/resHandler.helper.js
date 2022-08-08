module.exports = {

    sendResponse(res, data, status) {
        res.status(status || 200).send(data);
    },

    sendError(res, error) {
        let err = error;
        if (error && error.errors) {
            err = error.errors[0].message;
        } else if (error.message) {
            err = error.message;
        }
        if (error.message.indexOf('CARD') > -1) {
            error.message = error.message.substring(4, error.message.length)
            res.status(400).send({ step_code: 2, message: error.message });
        }
        res.status(400).send({
            message: err
        });
    }
}
