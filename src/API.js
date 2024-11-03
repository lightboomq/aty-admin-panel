import UserStorage from './store/UserStorage.js';

const catchError = err => {
    console.log(err);
};

const token = localStorage.getItem('token');

export const userRequests = {
    async getAllUsers() {
        //Компонент user
        try {
            const res = await fetch('http://147.45.159.11/api/userEditor/getAllUsers', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            for (let i = 0; i < data.length; i++) data[i].indexUser = i;

            if (res.ok) {
                return UserStorage.setUsers(data);
            }

            throw new Error(data.message);
        } catch (err) {
            catchError(err);
        }
    },

    async getUsersWithActiveExam() {
        //Компонент ActiveExam
        try {
            const res = await fetch('http://147.45.159.11/api/userEditor/getUsersWithAppointExam', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (res.ok) {
                return UserStorage.setActiveExamUsers(data);
            }

            throw new Error(data.message);
        } catch (err) {
            catchError(err);
        }
    },

    async setExamUser(email, userName) {
        try {
            const action = confirm(`Назначить экзамен ${userName}?`);
            if (!action) return;

            const res = await fetch('http://147.45.159.11/api/userEditor/appoint', {
                //Назначить экзамен для пользователя
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    isAppoint: true,
                    email: email,
                }),
            });
            if (res.ok) return true;
        } catch (err) {
            catchError(err);
        }
    },

    async setCanselExamUser(email, userName) {
        //Компонент ActiveExam
        const action = confirm(`Отменить экзамен ${userName}?`);
        if (!action) return;

        await fetch('http://147.45.159.11/api/userEditor/appoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                isAppoint: false,
                email: email,
            }),
        });
        UserStorage.setCanselExamUser(email);
    },

    async getUsersWithResultExam(flag) {
        try {
            const res = await fetch('http://147.45.159.11/api/userEditor/getUsersWithResultExam', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isPassExam: flag }),
            });
            const userJson = await res.json();
            
            if (res.ok) {
                if (flag) {
                    return UserStorage.setExamPassedUsers(userJson);
                }

                return UserStorage.setExamNoTPassedUsers(userJson);
            }

            throw new Error(res.message);
        } catch (err) {
            catchError(err);
        }
    },

    async getResultTestUser() {},
};
