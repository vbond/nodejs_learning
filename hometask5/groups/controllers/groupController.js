import uuid from 'uuid-random';

const groupsMap = new Map();

//read
const _read = (req, res) => {
	const id = req.params.id;
	
	const group = groupsMap.get(id);
	if (!group) {
		return res.status(500).send("group not found, id = " + id);
	}
	res.send(JSON.stringify(group));
};

//read all
const _readAll = (req, res) => {
	if (!groupsMap.size) {
		return res.status(500).send("groups not found");
	}
	res.send(JSON.stringify([...groupsMap.values()]));
};

//create
const _create = (req, res) => {
	const id = uuid();

	const group = {
			id:id, 
			name:req.body.name, 
			permissions:req.body.permissions
	};
	groupsMap.set(id, group);
	res.send("group created, id = " + id);
};

//delete
const _delete = (req, res) => {
	const id = req.params.id;
	
	if (!groupsMap.delete(id)) {
		return res.status(500).send("group not found, id = " + id);
	}

	res.send("group removed, id = " + id);
};

//update
const _update = (req, res) => {
	const id = req.params.id;

	const group = groupsMap.get(id);
	if (!group) {
		return res.status(500).send("group not found, id = " + id);
	}

	group.name = req.body.name;
	group.permissions = req.body.permissions;

	res.send("group updated, id = " + id);
};

export { _update, _delete, _create, _read, _readAll, groupsMap};
