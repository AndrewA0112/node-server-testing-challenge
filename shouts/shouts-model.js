const db = require('../data/db-config.js');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
};

function insert(shout) {
    return db('shouts').insert(shout, 'id')
}

async function update(id, changes) {
    return null;
}

function remove(id) {
    const removedShout = findById(id)
    return db('shouts').where({ id: id }).delete().then(res => {
        return removedShout
    });
}

function getAll() {
    return db('shouts');
}

function findById(id) {
    return db('shouts')
        .where({ id: id })
        .first()
        .then(shout => {
            return shout
        })
}
