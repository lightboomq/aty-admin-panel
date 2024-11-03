import { makeAutoObservable } from 'mobx';

class UserStorage {
    constructor() {
        this.users = [];
        this.activeExamUsers = [];
        this.examPassedUsers = [];
        this.examNoTPassedUsers = [];

        makeAutoObservable(this, {}, { autoBind: true });
    }
    getAllUsers(){
        return this.users
    }
    setUsers(arr){
        this.users = arr
    }
    deleteUser(email){
        const indexUser = this.users.findIndex(obj => obj.email === email);
        this.users.splice(indexUser, 1);
    }

    getActiveExamUsers(){
        return this.activeExamUsers
    }
    setActiveExamUsers(arr){
        this.activeExamUsers = arr
    }
    
    setExamUser(obj){
        this.activeExamUsers.push(obj)
    }
    setCanselExamUser(email){
        const indexUser = this.activeExamUsers.findIndex(obj => obj.email === email);
        this.activeExamUsers.splice(indexUser, 1);
    }
    
    getExamPassedUsers(){
        return this.examPassedUsers;
    }
    getExamNotPassedUsers(){
        return this.examNoTPassedUsers;
    }
    setExamPassedUsers(arr){
        this.examPassedUsers = arr;
    }
    setExamNoTPassedUsers(arr){
        this.examNoTPassedUsers = arr;
    }
}

export default new UserStorage();
