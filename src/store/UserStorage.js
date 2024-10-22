import { makeAutoObservable } from 'mobx';

class UserStorage {
    constructor() {
        this.users = [];
        makeAutoObservable(this, {}, { autoBind: true });
    }
    getUsers(){
        return this.users
    }
    setUsers(arr){
        this.users = arr
    }
    deleteUser(email){
        const indexUser = this.users.findIndex(obj => obj.email === email);
        this.users.splice(indexUser, 1);
    }
}

export default new UserStorage();
