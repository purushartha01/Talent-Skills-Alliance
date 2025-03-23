const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    console.log(`Encountered error: ${err}`);
    console.log(err.stack);
    const statusCode = res.locals.statusCode ?? 500;
    res.status(statusCode).json({ status: 'failed', error: err.message });
}

module.exports={
    errorHandler
}