export const SHOW_MODAL = 'SHOW_MODAL';
export const MODAL_PROPS = 'MODAL_PROPS';
export const CREATE_USER = 'CREATE_USER';
export const CREATE_TASK = 'CREATE_TASK';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';


export const showModal = (payload) => {
    return  {
        type: SHOW_MODAL,
        payload: payload
    }
}

export const setModalProperties = (modalProps) => {
    return {
        type: MODAL_PROPS,
        data: modalProps
    }
}

export const createNewUser = (data) => {
    return {
        type: CREATE_USER,
        data: data
    }
}

export const createNewTask = (data) => {
    return {
        type: CREATE_TASK,
        data: data
    }
}

export const editUserData = (data) => {
    return {
        type: EDIT_USER,
        data: data
    }
}

export const deleteUserData = (id) => {
    return {
        type: DELETE_USER,
        id: id
    }
}