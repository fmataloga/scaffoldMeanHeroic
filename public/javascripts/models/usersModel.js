.service('usersModel', function ($optimumModel) {
	var model = new $optimumModel();
	model.url = '/api/users';
	return model;
})