import { Login } from '../component/login.jsx';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            popup: {},
            token: localStorage.getItem('token') || '',
        },
        actions: {
            // Create a new list
            addNewList: newList => {
                const store = getStore();

                const options = {
                    method: 'POST',
                    body: JSON.stringify(newList),
                    headers: {
                        Authorization: 'Bearer ' + store.token,
                        'Content-type': 'application/json',
                    },
                };
                return fetch(`${process.env.BACKEND_URL}/api/list`, options)
                    .then(response => response.json())
                    .then(list => {
                        setStore({
                            todoLists: [...store.todoLists, list],
                        });
                        return list;
                    })
                    .catch(error => console.error(error));
            },

            // Update list in db
            updateTodoList: data => {
                const store = getStore();
                const actions = getActions();

                const options = {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        Authorization: 'Bearer ' + store.token,
                        'Content-type': 'application/json',
                    },
                };

                return fetch(`${process.env.BACKEND_URL}/api/list/${data.id}`, options)
                    .then(response => response.json())
                    .then(list => {
                        actions.user.getTodoListsOfUser();
                        return list;
                    })
                    .catch(error => console.error(error));
            },

            // Delete list in db
            deleteTodoList: listId => {
                const store = getStore();

                const options = {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + store.token,
                    },
                };

                return fetch(`${process.env.BACKEND_URL}/api/list/${listId}`, options)
                    .then(response => response.json())
                    .then(message => true)
                    .catch(error => console.error(error));
            },

            // Get all Todos linked to a TodoList
            getTodos: listId => {
                const store = getStore();
                fetch(`${process.env.BACKEND_URL}/api/lists/${listId}/todos`, {
                    headers: {
                        Authorization: 'Bearer ' + store.token,
                    },
                })
                    .then(response => response.json())
                    .then(todos => {
                        let todoListsAux = [...store.todoLists];
                        todoListsAux.map(list => {
                            if (list.id === listId) {
                                list.todos = todos;
                            }
                        });
                        setStore({
                            todoLists: todoListsAux,
                        });
                    })
                    .catch(error => console.error(error));
            },

            // Drag & Drop Reorder Todos
            reorderTodos: ({ listId, sourceIndex, destinationIndex }) => {
                const store = getStore();
                const actions = getActions();

                const options = {
                    method: 'PUT',
                    body: JSON.stringify({
                        sourceIndex: sourceIndex,
                        destinationIndex: destinationIndex,
                    }),
                    headers: {
                        Authorization: 'Bearer ' + store.token,
                        'Content-type': 'application/json',
                    },
                };

                return fetch(`${process.env.BACKEND_URL}/api/list/${listId}/reorder`, options)
                    .then(response => response.json())
                    .then(resp => actions.getTodos(listId))
                    .catch(error => console.error(error));
            },

            // Create a new todo
            addTodo: (newTodo, listId) => {
                const store = getStore();
                const actions = getActions();

                const options = {
                    method: 'POST',
                    body: JSON.stringify(newTodo),
                    headers: {
                        Authorization: 'Bearer ' + store.token,
                        'Content-type': 'application/json',
                    },
                };
                fetch(`${process.env.BACKEND_URL}/api/lists/${listId}/todo`, options)
                    .then(response => response.json())
                    .then(todo => actions.getTodos(listId))
                    .catch(error => console.error(error));
            },

            // Modify a todo
            updateTodo: (updatedTodo, listId) => {
                const store = getStore();
                const actions = getActions();

                const options = {
                    method: 'PUT',
                    body: JSON.stringify(updatedTodo),
                    headers: {
                        Authorization: 'Bearer ' + store.token,
                        'Content-type': 'application/json',
                    },
                };
                fetch(`${process.env.BACKEND_URL}/api/todo/${updatedTodo.id}`, options)
                    .then(response => response.json())
                    .then(todo => actions.getTodos(listId))
                    .catch(error => console.error(error));
            },

            // Delete todo
            deleteTodo: (todoId, listId) => {
                const store = getStore();
                const actions = getActions();

                const options = {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + store.token,
                    },
                };

                fetch(`${process.env.BACKEND_URL}/api/todo/${todoId}`, options)
                    .then(response => response.json())
                    .then(message => actions.getTodos(listId))
                    .catch(error => console.error(error));
            },

            // Remove message from store
            cleanMessage: () => setStore({ message: { message: '', status: '' } }),

            // Popup functions
            popup: {
                // Open Popup
                setPopup: (reactComponent, closable = true, size = '') => {
                    setStore({
                        popup: {
                            component: reactComponent,
                            icClosable: closable,
                            size: size,
                        },
                    });
                    return;
                },
                // Close Popup
                closePopup: () => setStore({ popup: {} }),
            },

            // User functions
            user: {
                // Create User
                createUser: async (name, password) => {
                    const actions = getActions();

                    try {
                        const response = await fetch(process.env.BACKEND_URL + '/api/user', {
                            method: 'POST',
                            body: JSON.stringify({
                                name: name,
                                password: password,
                            }),
                            headers: {
                                'Content-type': 'application/json',
                            },
                        });
                        const data = await response.json();
                        if (!response.ok) {
                            setStore({
                                message: {
                                    message: data.message,
                                    status: 'danger',
                                },
                            });
                            throw Error(response);
                        } else {
                            return data;
                        }
                    } catch (error) {
                        return false;
                    }
                },

                // LOGIN
                generateToken: async (name, password, rememberMe) => {
                    const actions = getActions();

                    try {
                        const response = await fetch(process.env.BACKEND_URL + '/api/token', {
                            method: 'POST',
                            body: JSON.stringify({
                                name: name,
                                password: password,
                            }),
                            headers: {
                                'Content-type': 'application/json',
                            },
                        });
                        const data = await response.json();
                        if (!response.ok) {
                            setStore({
                                message: {
                                    message: data.message,
                                    status: 'danger',
                                },
                            });
                            throw Error(response);
                        } else {
                            setStore({ token: data.token });
                            if (rememberMe) {
                                localStorage.setItem('token', data.token);
                            }
                            actions.user.getProfileData(data.token);
                            return data;
                        }
                    } catch (error) {
                        console.error(error);
                    }
                },

                // Obtener la información del usuario en Dashboard (por ejemplo)
                getProfileData: async token => {
                    const actions = getActions();
                    const store = getStore();

                    const options = {
                        method: 'GET',
                        headers: {
                            Authorization: 'Bearer ' + token,
                        },
                    };
                    try {
                        const response = await fetch(
                            process.env.BACKEND_URL + '/api/user',
                            options
                        );
                        const data = await response.json();
                        if (!response.ok) {
                            setStore({
                                message: {
                                    message: data.message,
                                    status: 'danger',
                                },
                            });
                            throw Error(response);
                        }
                        setStore({
                            user: {
                                ...store.user,
                                id: data.id,
                                name: data.name,
                            },
                        });
                        actions.popup.closePopup();
                        actions.user.getTodoListsOfUser();
                        return data;
                    } catch (error) {
                        console.error(error);
                    }
                },

                // Get all TodoLists linked to the current user
                getTodoListsOfUser: () => {
                    const store = getStore();
                    const actions = getActions();
                    return fetch(`${process.env.BACKEND_URL}/api/user/lists`, {
                        headers: {
                            Authorization: `Bearer ${store.token}`,
                        },
                    })
                        .then(response => {
                            if (!response.ok) {
                                setStore({
                                    todoLists: [],
                                });
                                throw Error(response);
                            }
                            return response.json();
                        })
                        .then(todoLists => {
                            if (Array.isArray(todoLists)) {
                                setStore({
                                    todoLists: todoLists,
                                });
                                todoLists.forEach(list => actions.getTodos(list.id));
                                return todoLists.length;
                            }
                        })
                        .catch(error => console.error(error));
                },

                // Delete user
                deleteUser: async () => {
                    const store = getStore();
                    try {
                        const response = await fetch(process.env.BACKEND_URL + `/api/user`, {
                            method: 'DELETE',
                            headers: {
                                Authorization: 'Bearer ' + store.token,
                            },
                        });
                        const resp = await response.json();
                        if (!response.ok) {
                            setStore({
                                message: {
                                    message: resp.message,
                                    status: 'danger',
                                },
                            });
                            throw Error(response);
                        }
                        return resp;
                    } catch (err) {
                        return false;
                    }
                },

                // Logout
                logout: () => {
                    localStorage.removeItem('token');
                    setStore({
                        token: null,
                        user: {},
                        todoLists: [],
                    });
                    return true;
                },
            },
        },
    };
};

export default getState;
