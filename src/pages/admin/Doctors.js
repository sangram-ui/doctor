import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table, Button, message } from "antd";
import axios from "axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch all doctors
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

//handle account
const handleAccountStatus= async(record , status) =>{
  try {
    const res=await axios.post('/api/v1/admin/changeAccountStatus',
      {doctorId:record._id, userId:record.userId,  status:status},{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    });
    if(res.data.success){
      message.success(res.data.message);
      window.location.reload();
    }
  } catch (error) {
    message.error('Something went wrong')
  }
}

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <Button className="btn btn-success" onClick={() => handleAccountStatus(record,"approved")} >Approve</Button>
          ) : (
            <Button className="btn btn-danger">Reject</Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1>All Doctors</h1>
      <Table
        columns={columns}
        dataSource={doctors.map((doctor) => ({ ...doctor, key: doctor._id }))}
      />
    </Layout>
  );
};

export default Doctors;
