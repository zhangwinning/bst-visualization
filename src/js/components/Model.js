import { Modal, Input} from 'antd'
import React, { Component } from "react"

class InputModel extends Component {

    constructor() {
        super()
        this.state = {
            value: ""
        }
    }

    handleOk = () => {
        const { value } = this.state
        this.props.onShowModal(false)
        this.props.onInputChange(value)
    }


    handleCancel = () => {
        this.props.onShowModal(false)
    }

    onInputChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }


    render() {

        const { visible } = this.props

        return (
            <div>
                <Modal title = "请输入整数"
                       onOk = {this.handleOk}
                       onCancel = {this.handleCancel}
                       visible={visible}
                >
                <div>
                    <Input onChange = {this.onInputChange} />
                </div>
                </Modal>
            </div>
        )

    }
}

export default InputModel
