import React, { useEffect, useState } from "react";
import { Button, Col, Collapse, Form, Input, Row, Select, Modal } from "antd";
import "./coll.scss";
import TextArea from "antd/es/input/TextArea";
import celebritiesJson from "../celebrities.json";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  RightOutlined,
} from "@ant-design/icons";

function Coll() {
  const { Panel } = Collapse;
  const [cardstate, setCardState] = useState(null);
  const [checkEdit, setCheckEdit] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [celebrities, setCelebrities] = useState([]);
  //   const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(celebritiesJson);

  useEffect(() => {
    setCelebrities(celebritiesJson);
  }, []);

  const callback = (e) => {
    if (e["0"]) {
      let num = Number(e["0"]);
      setCardState(num - 1);
    } else {
      setCardState(null);
    }
    console.log(cardstate, "coll");
  };

  //   form
  const onFinish = (values) => {
    console.log("Success:", values);
    setEditMode(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onBack = (e) => {
    setEditMode(false);
    console.log("wrong");
  };
  const handleChange = (value) => {
    console.log(value);
  };
  const onEdit = (id) => {
    console.log("edit", id);
    setEditMode(true);
    setCheckEdit(id);
    setCardState(id - 1);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
    let vamsi = celebrities.filter(
      (item) =>
        item.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.last.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(vamsi);
  };
  useEffect(() => {
    setCelebrities(celebritiesJson);
  }, []);
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <div className="page-container d-grid">
            <h4>List View</h4>

            <input
              className="nosubmit"
              type="search"
              style={{ width: "516px" }}
              placeholder="Search User"
              value={searchQuery}
              onChange={handleSearchInput}
            />
          </div>
        </Col>
      </Row>
      {filteredData &&
        filteredData.map((item, i) => {
          return (
            <>
              <div className="page-container d-grid">
                {!editMode ? (
                  <div>
                    {cardstate === i ? (
                      <h4 key={item.id}>Open State</h4>
                    ) : (
                      <h4 key={item.id}>Closed State</h4>
                    )}
                  </div>
                ) : (
                  <div>
                    {editMode && checkEdit - 1 === i ? (
                      <h4 key={item.id}>Edit State</h4>
                    ) : (
                      <h4 key={item.id}>Closed State</h4>
                    )}
                  </div>
                )}
                <div className="cards"> 
                  <Collapse
                  expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 270 : 90} />}
                    key={item.id}
                    bordered={false}
                    expandIconPosition="end"
                    onChange={callback}
                  >
                    <Panel
                      header={
                        <div>
                          <img src={item.picture} alt={item.id} />
                          {checkEdit === item.id ? (
                            <Input value={item.first} />
                          ) : (
                            <label className="input">{item.first}</label>
                          )}
                        </div>
                      }
                      key={item.id}
                    >
                      <Form
                        layout="vertical"
                        name="basic"
                        labelCol={{ span: 8 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                      >
                        <Form.Item>
                          <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12} md={8}>
                              <Form.Item label="Age" name="Age">
                                {(editMode && (checkEdit === item.id)) ? (
                                  <Input defaultValue={item.age} />
                                ) : (
                                  <label style={{ float: "left" }}>
                                    {item.age}
                                  </label>
                                )}
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={8}>
                              <Form.Item
                                label="Gender"
                                name="Gender"
                                rules={[
                                  {
                                    // required: true,
                                    message: "Please Enter your Gender!",
                                  },
                                ]}
                              >
                                {(editMode && (checkEdit === item.id)) ? (
                                  <Select
                                    labelInValue
                                    defaultValue={item.gender}
                                    style={{
                                      width: 120,
                                    }}
                                    onChange={handleChange}
                                    options={[
                                      {
                                        value: "Male",
                                        label: "Male",
                                      },
                                      {
                                        value: "Female",
                                        label: "Female",
                                      },
                                    ]}
                                  />
                                ) : (
                                  <label style={{ float: "left" }}>
                                    {item.gender}
                                  </label>
                                )}
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={8}>
                              <Form.Item label="Country" name="Country">
                                {(editMode && (checkEdit === item.id)) ? (
                                  <Input defaultValue={item.country} />
                                ) : (
                                  <label style={{ float: "left" }}>
                                    {item.country}
                                  </label>
                                )}
                              </Form.Item>
                            </Col>
                          </Row>

                          <Row>
                            <Col xs={24}>
                              <Form.Item label="Description" name="Description">
                                {(editMode && (checkEdit === item.id)) ? (
                                  <TextArea
                                    rows={4}
                                    defaultValue={item.description}
                                  />
                                ) : (
                                  <label style={{ float: "left" }}>
                                    {item.description}
                                  </label>
                                )}
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                          {(editMode && (checkEdit === item.id)) ? (
                            <div className="icons">
                              <CloseCircleOutlined
                                style={{ color: "red", marginTop: "10px" }}
                                onClick={onBack}
                              />
                              <Button
                                htmlType="submit"
                                className="submitButton"
                              >
                                <CheckCircleOutlined
                                  style={{ color: "green" }}
                                />
                              </Button>
                            </div>
                          ) : (
                            <div style={{ float: "right" }}>
                              <svg
                                onClick={showModal}
                                style={{ color: "red" }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-trash3"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                              </svg>
                              <svg
                                onClick={() => onEdit(item.id)}
                                style={{ color: "#476eed", marginLeft: "20px" }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-pencil"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                              </svg>
                            </div>
                          )}
                        </Form.Item>
                      </Form>
                    </Panel>
                  </Collapse>
                  <Modal
                    title="Are you sure you want to delete?"
                    open={isModalOpen}
                    onOk={handleOk}
                    okText="Delete"
                    onCancel={handleCancel}
                  ></Modal>
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
}

export default Coll;
