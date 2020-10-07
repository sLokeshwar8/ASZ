import React from 'react';
import { Button } from 'antd';
import { Table, Space } from 'antd';
import {connect} from 'react-redux';

import ModalCom from '../UI/modal/modalCom';
import * as actionCreator from '../store/actions';

const Users = (props) => {

const createUserHandler = () => {
  let modalStatus = !(props.modalSt);
  let modalProps = {labels: ["Name", "Email"], title: "User"};
  props.showModal(modalStatus)
  props.modalProperties(modalProps)
}

const onEditHandler = (record) => {
  let modalStatus = !(props.modalSt);
  let modalProps = {labels: ["Name", "Email"], title: "Update", id: record.key};
  props.showModal(modalStatus)
  props.modalProperties(modalProps)
}

const onDeleteHandler = (record) => {
  props.deleteAction(record.key)
}

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: record => (
        <Space size="middle">
          <span onClick={() => onEditHandler(record)}>Edit</span>
          <span>|</span>
          <span onClick={() => onDeleteHandler(record)}>Delete</span>
        </Space>
      ),
    },
  ];
  

  return (
      <div>
          <Button style={{marginBottom: 15}} onClick={createUserHandler}>Create User</Button>
          <Table columns={columns} dataSource={props.usersData} />
          <ModalCom />
      </div>
  )
}

const mapStateToProps = state => {
  return  {
      modalSt: state.isModalOpen,
      usersData: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return  {
    showModal : (payload) =>  dispatch(actionCreator.showModal(payload)),
    modalProperties : (modalProps) =>  dispatch(actionCreator.setModalProperties(modalProps)),
    deleteAction: (id) => dispatch(actionCreator.deleteUserData(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users)