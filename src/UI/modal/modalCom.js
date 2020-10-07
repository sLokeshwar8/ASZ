import React, {useState} from 'react';
import {connect} from 'react-redux';
import { Modal } from 'antd';
import { Form, Input, Button, DatePicker } from 'antd';

import * as actionCreator from '../../store/actions';


const ModalCom = (props) => {

    const [loadings, setLoadings] = useState(false);

    const [form] = Form.useForm();

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
        };
        const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const handleSumit = (e) => {
        let modalStatus = !(props.modalSt.isModalOpen);

        if(props.modalSt.modalTitle === 'Task'){
            props.modalHandleSubmitTask(e)
        }
        if(props.modalSt.modalTitle === 'User') {
            props.modalHandleSubmitUser(e)
        }
        if(props.modalSt.modalTitle === 'Update') {
            let editUser = e;
            editUser["key"] = props.modalSt.currentEleId;            
            props.modalHandleUpdateUser(editUser)
        }
        form.resetFields();
        props.showModal(modalStatus)

    }

    const handleCancel = () => {
        let modalStatus = !(props.modalSt.isModalOpen);
        props.showModal(modalStatus)
        form.resetFields();
    }

    let formItem = null;
    if(props.modalSt.modalLabels) {

        let updateDetails = props.users.filter(user => user.key ===  props.modalSt.currentEleId)
        props.modalSt.modalTitle == 'Update' ? (
            formItem = (
                props.modalSt.modalLabels.map((label,index) => (
                    <Form.Item
                        key={index}
                        label={label}
                        name={label}
                        rules={[{ required: true, message: 'This Field is Required!' }]}
                    >
                        <Input defaultValue={updateDetails[0][label.toLowerCase()]}/>
                    </Form.Item>
                ))
            )
        ) : (
            formItem = (
                props.modalSt.modalLabels.map((label,index) => (
                    label == "Date" ? (
                    <Form.Item
                        key={index}
                        label={label}
                        name={label}
                        rules={[{ required: true, message: 'This Field is Required!' }]}
                    >
                         <DatePicker />
                    </Form.Item>) : (
                    <Form.Item
                        key={index}
                        label={label}
                        name={label}
                        rules={[{ required: true, message: 'This Field is Required!' }]}
                    >
                        <Input  />
                    </Form.Item>)
                ))
            )
        )
        
    }

    const enterLoading = async (duration = 2000) => {
        setLoadings(() => true)
        let promise = new Promise((res, rej) => {
            setTimeout( () => res(setLoadings(() => false)), duration)
        })
        await promise
    }

    return (
        <Modal
        title={props.modalSt.modalTitle == 'Update' ? "Update" : "Create New "+ props.modalSt.modalTitle }
        visible={props.modalSt.isModalOpen}
        onCancel={handleCancel}
        footer={[
        ]}
      >
        <Form
        {...layout}
        name="basic"
        onFinish={handleSumit}
        form={form}
        >
        {formItem}
        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loadings} onClick={enterLoading}>
                {props.modalSt.modalTitle == 'Update' ? 'Update' : 'Submit'} 
            </Button>
        </Form.Item>
        </Form>
        
      </Modal>
    )
}

const mapStateToProps = state => {
    return {
        modalSt: state.modalStatus,
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        modalHandleSubmitUser: (data) => dispatch(actionCreator.createNewUser(data)),
        modalHandleSubmitTask: (data) => dispatch(actionCreator.createNewTask(data)),
        modalHandleUpdateUser: (data) => dispatch(actionCreator.editUserData(data)),
        showModal : (payload) =>  dispatch(actionCreator.showModal(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCom)