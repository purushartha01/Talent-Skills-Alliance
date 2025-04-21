const jwt = require("jsonwebtoken");
const { ACCESS_KEY, REFRESH_KEY, jwt_options_access, jwt_options_refresh, cookieOptionsAccess, cookieOptionsRefresh } = require("../config/serverConfig");
const { userExists } = require("../services/UserService");
const UserModel = require("../model/User");

const authMiddleware = async (req, res, next) => {
    try {

        const { AccessToken } = req?.signedCookies;
        console.log("AccessToken: ", AccessToken);
        if (!AccessToken) {
            res.locals.statusCode = 401;
            throw new jwt.TokenExpiredError;
        }
        const accessData = jwt.verify(AccessToken, ACCESS_KEY);
        // console.log(`AccessData: `, accessData);
        const doesUserExist = await UserModel.findById(accessData.id);
        if (doesUserExist) {
            req.currUserId = doesUserExist.id;
            next();
        }
    } catch (err) {
        try {
            console.log("Error occured in handling access token: ", err);
            if (err instanceof jwt.TokenExpiredError) {
                const { RefreshToken } = req?.signedCookies;
                console.log('RefreshToken: ', RefreshToken);
                if (!RefreshToken) {
                    console.log('Refresh Token not found!');
                    res.locals.statusCode = 401;
                    throw new jwt.TokenExpiredError;
                }
                const refreshData = jwt.verify(RefreshToken, REFRESH_KEY);

                console.log(`RefreshData: ${JSON.stringify(refreshData)}`);
                const doesUserExist = await UserModel.findById(refreshData.id);
                console.log(`doesUserExist: ${doesUserExist}`);
                if (doesUserExist) {
                    req.currUserId = doesUserExist.id;
                    const accessToken = jwt.sign({ id: doesUserExist.id, email: doesUserExist.email }, ACCESS_KEY, jwt_options_access);
                    const refreshToken = jwt.sign({ id: doesUserExist.id, email: doesUserExist.email }, REFRESH_KEY, jwt_options_refresh);

                    res.cookie('AccessToken', accessToken, cookieOptionsAccess);
                    res.cookie('RefreshToken', refreshToken, cookieOptionsRefresh);
                    next();
                } else {
                    next(err);
                }
            }
            else {
                next(err);
            }
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                res.locals.statusCode = 401;
                err.message = "Token expired!";
                next(err);
            }
            console.log(err);
            next(err);
        }
    }
}

module.exports = authMiddleware;