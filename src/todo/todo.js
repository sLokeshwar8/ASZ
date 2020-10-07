import React from 'react';
import { Button } from 'antd';
import { Table } from 'antd';
import {connect} from 'react-redux';

import ModalCom from '../UI/modal/modalCom';
import * as actionCreator from '../store/actions';

const Todos = (props) => {

    const createUserHandler = () => {
        let modalStatus = !(props.modalSt);
        let modalProps = {labels: ["Name", "Date"], title: "Task"};
        props.showModal(modalStatus)
        props.modalProperties(modalProps)
    }

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <span>{text}</span>,
        },
        {
          title: 'Date of Creation',
          key: 'action',
          render: text => <span>{text.createDone}</span>,
        },
        {
          title: 'Finishing Date',
          key: 'action',
          render: text => <span>{text.finishDate}</span>,
        },
      ];

    return (
        <div>
            <Button style={{marginBottom: 15}} onClick={createUserHandler}>Create Task</Button>
            <Table columns={columns} dataSource={props.tasks} />
            <ModalCom/>
        </div>
    )
}

const mapStateToProps = state => {
    return  {
        modalSt: state.isModalOpen,
        tasks: state.tasks
    }
  }
  
const mapDispatchToProps = dispatch => {
    return  {
        showModal : (payload) =>  dispatch(actionCreator.showModal(payload)),
        modalProperties : (modalProps) =>  dispatch(actionCreator.setModalProperties(modalProps))
    }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Todos)
