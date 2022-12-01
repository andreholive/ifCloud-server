class User{
    id:string;
    age: number;
    name: string;
    constructor(name:string, age:number){
        this.id = generateAnId()
        this.name =  name;
        this.age = age;
    }
}

class UserStore{
    usersList: {[id:string]:User};
    constructor(){
        this.usersList = {};
    }

    addUser(user:User){
        this.usersList[user.id] = user;
    }

    removeUser(user:User){
        delete this.usersList[user.id]
    }

    getUsers(){
        return this.usersList;
    }
}

function generateAnId():string{
    var randomized = Math.ceil(Math.random() * Math.pow(10,10));
    var digito = Math.ceil(Math.log(randomized));
    while(digito > 10){
      digito = Math.ceil(Math.log(digito));
    }
    var id = randomized + '-' + digito;
    return id;
}
describe('Test behavior of users Object list', () => {
    const user = new User('andre', 38);
    const user2 = new User('daniela', 41);
    const userStore = new UserStore();
    userStore.addUser(user);
    userStore.addUser(user2);

    let users = [
        [Object.values(userStore.getUsers())[0], {name:'andre'}],
        [Object.values(userStore.getUsers())[1], {name:'daniela'}]
    ]
    test.each(users)('user object %j has a key with values like %j', (fixture, result) => {
        expect(fixture).toMatchObject(result);
    });
    
    test('if users object list is empty ', () => {
        userStore.removeUser(user);
        expect(userStore.getUsers()).toMatchObject({});
    });

})
