import * as actionType from './actions';
const intialize = {
    modalStatus : {
        isModalOpen: false,
        modalTitle: "Task",
        modalLabels: ["Name"],
        currentEleId: null
    },
    users:  [],
    tasks: []
}   

const reducer = (state = intialize, action) =>{
    switch(action.type) {
        case actionType.SHOW_MODAL : 
            let modal_status = {isModalOpen : action.payload};
            return {
                ...state,
                modalStatus: {
                    ...state.modalStatus,
                    ...modal_status
                },
            }
        case actionType.MODAL_PROPS : 
            let modal_props = {modalTitle : action.data.title, modalLabels: action.data.labels, currentEleId: action.data.id};
            return {
                ...state,
                modalStatus: {
                    ...state.modalStatus,
                    ...modal_props
                },
            }
        case actionType.CREATE_USER : 
            let newUser = {key: new Date(), name: action.data.Name, email: action.data.Email};
            let users = [...state.users];
            users.push(newUser)
            return {
                ...state,
                users: users,
                isModalOpen: false,
            }
        case actionType.EDIT_USER : 
            let editUsers = [...state.users];
            let newUpdatedUser = editUsers.map(e_user => {
                if(e_user.key == action.data.key){
                    return Object.assign({},e_user,{name: action.data.Name, email:action.data.Email})
                }
                return e_user
            })
            return {
                ...state,
                users: newUpdatedUser,
                isModalOpen: false,
            }
        case actionType.DELETE_USER : 
            let deleteUsers = [...state.users];
            console.log(action)
            let filteredUsers = deleteUsers.filter(d_user => d_user.key !==  action.id)
            return {
                ...state,
                users: filteredUsers,
                isModalOpen: false,
            }
        case actionType.CREATE_TASK : 
            let date = (new Date()).getTime();
            let redableDate = (new Date(date)).toDateString();
            let dateMoment = action.data.Date._d;
            let finishDate = (new Date(dateMoment)).toDateString();
            let newTask = {key: date, name: action.data.Name, createDone: redableDate, finishDate: finishDate};
            let task = [...state.tasks];
            task.push(newTask)
            return {
                ...state,
                tasks: task,
                isModalOpen: false,
            }
        default :
            return {
                ...state
            }
    }
}


export default reducer