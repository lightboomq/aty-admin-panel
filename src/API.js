import UserStorage from './store/UserStorage.js';
import Errors from './store/Errors.js';

const token = localStorage.getItem('token');

export const userRequests = {
    async getAllUsers() {
        //Компонент user
        try {
            const res = await fetch('http://localhost:3333/api/userEditor/getAllUsers', {
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
            const res = await fetch('http://localhost:3333/api/userEditor/getUsersWithAppointExam', {
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

            const res = await fetch('http://localhost:3333/api/userEditor/appoint', {
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

        await fetch('http://localhost:3333/api/userEditor/appoint', {
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
            const res = await fetch('http://localhost:3333/api/userEditor/getUsersWithResultExam', {
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

    async getResultTestUser(email, setIsLoading, setIsOpen, setQuestions) {
        try {
            setIsLoading(true);
            const res = await fetch('http://localhost:3333/api/userEditor/getExamResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email: email,
                }),
            });
            const data = await res.json();
           
            setIsLoading(false);
            if (res.ok) {
                setQuestions(data);
                setIsOpen(true);
                return;
            }

            throw new Error(res.message);
        } catch (err) {
            catchError(err.message);
        }
    },
};

export const ticketRequests = {
    async getAllTickets(setAllTickets) {
        //Компонет EditTickets
        try {
            const res = await fetch('http://localhost:3333/api/ticketEditor/tickets', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();

            if (res.ok) return setAllTickets(data);
            throw new Error(res.message);
        } catch (err) {
            catchError(err);
        }
    },

    async getTicket(
        i,
        ticketId,
        { setSelectedTicket, setIdSelectedTicket, setIndexTicket, setIsLoading, setIsTagSelect, setSelectedOption, setLengthTicket },
    ) {
        try {
            //Компонет EditTickets
            setIndexTicket(i);
            setIsLoading(true);
            setIsTagSelect(false);
            setSelectedOption('');
            const res = await fetch('http://localhost:3333/api/ticketEditor/getQuestions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ticketId: ticketId,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setIsLoading(false);
                setSelectedTicket(data);
                setIdSelectedTicket(ticketId);
                setIsTagSelect(true);
                setLengthTicket(data.length + 1);
                return;
            }

            throw new Error(res.message);
        } catch (err) {
            catchError(err);
        }
    },

    async addQuestion(e, idSelectedTicket, lengthTicket, setLengthTicket, setImgSrc, setIsNotification, setIsLoading) {
        //Компонент AddQuestion
        try {
            e.preventDefault();

            const form = new FormData(e.target);
            form.append('ticketId', idSelectedTicket);

            setIsLoading(true)
            const res = await fetch('http://localhost:3333/api/ticketEditor/createQuestion', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: form,
            });
            setIsLoading(false)

            if (res.ok) {
                setIsNotification(true)
                setLengthTicket(lengthTicket + 1);
                e.target.reset();
                setImgSrc('');
                Errors.setMessage('');

                const timerId = setTimeout(() => {
                    setIsNotification(false)
                    clearTimeout(timerId);
                }, 1500);
                return;
            }

            const err = await res.json();
            throw new Error(err.message);
        } catch (err) {
            Errors.setMessage(err.message);
        }
    },

    async createEmptyTicket(setIsLoading, setAllTickets) {
        //Компонент CreateEmptyTicket
        try {
            setIsLoading(true);
            const res = await fetch('http://localhost:3333/api/ticketEditor/createTicket', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (res.ok) {
                setAllTickets(prev => [...prev, data.ticketId]);
                setIsLoading(false);
                return;
            }
            throw new Error(res.message);
        } catch (err) {
            catchError(err.message);
        }
    },

    async deleteQuestion(
       idSelectedTicket,
       numberQuestion, 
       setNumberQuestion,  
       selectedQuestion, 
       setIsNotification, 
       refOption, 
       setSelectedTicket,
       selectedTicket, 
       setSelectedQuestion, 
       setIsLoadingDelete,
       setLengthTicket
    ) {
        try {
            //Компонент EditQuestion

            const action = confirm('Удалить выбраный вопрос? Все данные безвозратно будут удалены');
            if (!action) return;
            
            setIsLoadingDelete(true)
            const res = await fetch('http://localhost:3333/api/ticketEditor/deleteQuestion', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ticketId: idSelectedTicket,
                    questionId: selectedQuestion.questionId,
                }),
            });
            setIsLoadingDelete(false)

            if (res.ok) {
                refOption.current.textContent = `Изменить вопрос: ${numberQuestion}`;
                const cloneTicket = [...selectedTicket];
                cloneTicket.splice(numberQuestion, 1);
                const cloneQuestion = { ...selectedTicket[numberQuestion - 1] };

                setSelectedQuestion(cloneQuestion);
                setNumberQuestion(numberQuestion - 1);
                setSelectedTicket(cloneTicket);
                setLengthTicket(prev => prev - 1);
                setIsNotification(true)
                const timerId = setTimeout(()=>{
                    setIsNotification(false)
                    clearTimeout(timerId)
                },1500)
                return;
            }

            throw new Error(res.message);
        } catch (err) {
            Errors.setMessage(err.message);
        }
    },

    async deleteTicket(idSelectedTicket, allTickets, setAllTickets, indexTicket, setIsTagSelect, setSelectedOption, setIsLoading) {
        //Компонент DeleteTicket
        try {
            const action = confirm('Удалить выбраный билет? Все данные безвозратно будут удалены');

            if (!action) return;
            setIsLoading(true);
            const res = await fetch('http://localhost:3333/api/ticketEditor/deleteTicket', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ticketId: idSelectedTicket,
                }),
            });

            setIsLoading(false);
            if (res.ok) {     
                const copy = [...allTickets];
                copy.splice(indexTicket, 1);
                setAllTickets(copy);
                setIsTagSelect(false);
                setSelectedOption('');

                return;
            }
            throw new Error(res.message);
        } catch (err) {
            catchError(err);
        }
    },

    async saveQuestion(e, idSelectedTicket, selectedQuestion, setIsNotification , isImg,  setIsImg, setIsLoadingSave) {
        //Компонент EditQuestion
        try {
            e.preventDefault();
            const formData = new FormData(e.target);
            if (isImg) formData.delete('img');

            formData.append('ticketId', idSelectedTicket);
            formData.append('questionId', selectedQuestion.questionId);
            setIsLoadingSave(true)
            const res = await fetch('http://localhost:3333/api/ticketEditor/editQuestion', {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            setIsLoadingSave(false)

            if (res.ok) {
                Errors.setMessage('');
                setIsImg(false);
                setIsNotification(true) 

                const timerId = setTimeout(()=>{
                    setIsNotification(false)
                    clearTimeout(timerId)
                },1500)
                return;
            }

            const err = await res.json();
            throw new Error(err.message);
        } catch (err) {
            Errors.setMessage(err.message);
        }
    },
};
