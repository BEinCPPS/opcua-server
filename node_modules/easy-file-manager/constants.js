global.constants = Object.freeze({
	DOMAIN_NAME: 'bountyapi.herokuapp.com',
    SECRET_KEY: 'SolPov32!',

    PROJECT_STATUS_NEW: 0,
    PROJECT_STATUS_AWARDED:1,
    PROJECT_STATUS_ONGOING:2,
    PROJECT_STATUS_COMPLETED:3,
    PROJECT_STATUS_FAIL:4,
    
    BASE_DIR:process.env.PWD,

});