const express = require('express');
const userController = require('./../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleWare');

const userRouter = express.Router();

userRouter.use(authMiddleware)

userRouter.route('/profile')
    .get(userController.getUserProfile)
    .put(userController.updateUserProfile)


userRouter.route('/remove/:userID')
    .delete(userController.removeUser);

userRouter.route('/proposals')
    .get(userController.getAllProposals);

userRouter.route('/proposals/user').get(userController.getUserProposals);

userRouter.route('/proposals/:id').get(userController.getProposalById);

userRouter.route('/proposal/save').post(userController.saveProposal);

userRouter.route('/proposal/unsave').post(userController.unsaveProposal);

userRouter.route('/proposal/apply').post(userController.applyProposal);




userRouter.route('/proposal/new').post(userController.createProposal);

userRouter.route('/proposal/applicant-status').put(userController.changeProposalStatus);

userRouter.route('/proposal/:id')
    .get(userController.getProposalById)
    .delete(userController.deleteProposal);


userRouter.route('/auth/imagekit').get(userController.getImageKitAuth);


//TODO: add view profile controller handler
userRouter.route('/view/:id').get(userController.getUserById);

module.exports = userRouter;