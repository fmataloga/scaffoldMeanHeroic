.service('usersModel', function () {
	var model = new optimumModel();
	model.url = '/api/users';
	return model;
})