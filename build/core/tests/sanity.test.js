"use strict";
var User = /** @class */ (function () {
    function User(name, age) {
        this.id = generateAnId();
        this.name = name;
        this.age = age;
    }
    return User;
}());
var UserStore = /** @class */ (function () {
    function UserStore() {
        this.usersList = {};
    }
    UserStore.prototype.addUser = function (user) {
        this.usersList[user.id] = user;
    };
    UserStore.prototype.removeUser = function (user) {
        delete this.usersList[user.id];
    };
    UserStore.prototype.getUsers = function () {
        return this.usersList;
    };
    return UserStore;
}());
function generateAnId() {
    var randomized = Math.ceil(Math.random() * Math.pow(10, 10));
    var digito = Math.ceil(Math.log(randomized));
    while (digito > 10) {
        digito = Math.ceil(Math.log(digito));
    }
    var id = randomized + '-' + digito;
    return id;
}
describe('Test behavior of users Object list', function () {
    var user = new User('andre', 38);
    var user2 = new User('daniela', 41);
    var userStore = new UserStore();
    userStore.addUser(user);
    userStore.addUser(user2);
    var users = [
        [Object.values(userStore.getUsers())[0], { name: 'andre' }],
        [Object.values(userStore.getUsers())[1], { name: 'daniela' }]
    ];
    test.each(users)('user object %j has a key with values like %j', function (fixture, result) {
        expect(fixture).toMatchObject(result);
    });
    test('if users object list is empty ', function () {
        userStore.removeUser(user);
        expect(userStore.getUsers()).toMatchObject({});
    });
});
