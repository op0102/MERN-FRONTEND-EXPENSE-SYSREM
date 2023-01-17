import React, { useState, useEffect } from 'react';
import { Form, Input, message, Modal, Select, Table, DatePicker } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Layout from '../components/Layout/Layout';
import axios from "axios";
import Spinner from '../components/Layout/Spinner';
import moment from "moment";
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;


const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([])
  const [frequency, setFrequency] = useState("7");
  const [selectDate, setSelectDate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState("table");
  const [ediTable, setEdiTable] = useState(null);
  const [bool, setBool] = useState(false);

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>
    },
    {
      title: "Amount",
      dataIndex: "amount"
    },
    {
      title: "Type",
      dataIndex: "type"
    },
    {
      title: "Category",
      dataIndex: "category"
    },
    {
      title: "Reference",
      dataIndex: "reference"
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined style={{ color: 'green' }} onClick={() => {
            console.log(record);
            setEdiTable(record)
            setShowModal(true)

          }} onCancel={() => {
            setShowModal(false)
            setEdiTable(null)
          }
          } />
          <DeleteOutlined theme="filled" style={{ color: 'red' }}
            className="mx-3"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      )

    }
  ]


  //useEffect hook getAllTransaction
  useEffect(() => {
    // get all transaction
    const getAllTransaction = async () => {
      try {
        const { user } = JSON.parse(localStorage.getItem("user"));
        setLoading(true)
        const res = await axios.post("https://expense-management-system-mern-stack.onrender.com/api/v1/transactions/get-transaction", { userid: user._id, frequency, selectDate, type })
        setLoading(false)
        setAllTransaction(res.data)
        console.log(res.data);
        setShowModal(false)
        setEdiTable(null)
      } catch (error) {
        setLoading(false)
        console.log(error);
        message.error("Issue with Transaction  !!")

      }
    };
    getAllTransaction();
  }, [frequency, selectDate, type, bool])

  // delete handler
  const handleDelete = async (record) => {
    try {
      const { user } = JSON.parse(localStorage.getItem("user"));
      setLoading(true)
      await axios.post("https://expense-management-system-mern-stack.onrender.com/api/v1/transactions/delete-transaction", { userid: user._id, transactionId: record._id })
      setLoading(false)
      message.success("Transaction Deleted !!")
      setBool(!bool)


    } catch (error) {
      setLoading(false)
      console.log(error);
      message.error("unable to delete !!")
    }
  }

  //form handling
  const handleSubmit = async (value) => {
    try {
      const { user } = JSON.parse(localStorage.getItem("user"));
      setLoading(true)
      if (ediTable) {
        console.log(ediTable._id);
        await axios.post("https://expense-management-system-mern-stack.onrender.com/api/v1/transactions/edit-transaction", {
          payload: {
            ...value,
            userid: user._id,
          },
          transactionId: ediTable._id
        }

        )
        setLoading(false)
        message.success("Transaction Updated Successfully !!")
        setShowModal(false);
        setBool(!bool)


      } else {
        await axios.post("https://expense-management-system-mern-stack.onrender.com/api/v1/transactions/add-transaction", { ...value, userid: user._id })
        setLoading(false)
        message.success("Transaction Added Successfully !!")
        setShowModal(false)
        setBool(!bool)


      }


    } catch (error) {
      setLoading(false)
      message.error(" Failed Transaction  !!")

    }


  }

  return (
    <Layout>

      {loading && <Spinner />}
      <div className='filters'>
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value='7'>LAST 1 Week </Select.Option>
            <Select.Option value='30'>LAST 1 Month </Select.Option>
            <Select.Option value='365'>LAST 1 Year </Select.Option>
            <Select.Option value='custom'>Custom</Select.Option>
          </Select>
          {frequency === "custom" && <RangePicker value={selectDate} onChange={(values) => setSelectDate(values)} />}
        </div>

        <div>
          <h6> Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value='all'>ALL  </Select.Option>
            <Select.Option value='income'>Income  </Select.Option>
            <Select.Option value='expense'>Expense  </Select.Option>

          </Select>
      
        </div>

        <div className="switch-icon">
          <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? "active-icon" : "inactive-icon"}`} onClick={() => setViewData("table")} />
          <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? "active-icon" : "inactive-icon"}`} onClick={() => setViewData("analytics")} />
        </div>

        <div>
          <button className='addnew btn btn-success' onClick={() => setShowModal(true)}>Add New</button>
        </div>
      </div>

      <div className='content'><h4>
        {viewData === 'table' ? <Table columns={columns} dataSource={allTransaction} rowClassName="lightgray-row" className='red-header' />
          : <Analytics allTransaction={allTransaction} />}</h4>

      </div>

      <Modal title={ediTable ? "Edit-Transaction" : "Add-Transaction"} open={showModal} onCancel={() => {
        setShowModal(false);
        setEdiTable(null);
      }}
        footer={false}>



        <Form layout="vertical" onFinish={handleSubmit} initialValues={ediTable}>
          <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Please input your amount!' }]}>
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type" rules={[{ required: true, message: 'Please select your tranx!' }]} >
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select your category!' }]}>
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
              <Select.Option value="travel">Travel</Select.Option>
              <Select.Option value="grocery">Grocery</Select.Option>
              <Select.Option value="personal-stuf">Personal-Stuf</Select.Option>
              <Select.Option value="room-rent">Room-rent</Select.Option>
              <Select.Option value="online-order">Online-order</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date" >
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary" >

              SAVE
            </button>
          </div>
        </Form>
      </Modal>


    </Layout>
  )
}

export default HomePage



































