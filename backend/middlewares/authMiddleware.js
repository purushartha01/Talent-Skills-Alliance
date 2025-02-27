const authMiddleware = (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports=authMiddleware;