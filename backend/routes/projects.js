const express= require('express');

const projectController= require('./../controllers/projectController');

const authMiddleware= require('../middlewares/authMiddleWare');

const projectRouter= express.Router();

projectRouter.use(authMiddleware)

projectRouter.route('/user/all')
    .get(projectController.getAllProjects)

projectRouter.route('/complete').post(projectController.completeProjectCreation);

projectRouter.route('/review/new').post(projectController.addReviewForMember);

projectRouter.route('/change-status').put(projectController.changeProjectStatus);

projectRouter.route('/remove-member').post(projectController.removeMemberFromProject);


module.exports= projectRouter; //exporting the router object