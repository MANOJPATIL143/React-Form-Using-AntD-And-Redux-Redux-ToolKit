import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, DatePicker, Space, message, Checkbox } from 'antd';
import { saveFormData } from './redux/formSlice';
import backgroundImage from './assets/img1.jpg';

const { RangePicker } = DatePicker;

const App = () => {
  const [form] = Form.useForm();
  const [agree, setAgree] = useState(false); // State to track whether the checkbox is checked or not
  const dispatch = useDispatch();

  // Custom validation function for Date of Birth
  const validateDOB = (rule, value) => {
    if (value && value.isValid()) {
      const age = new Date().getFullYear() - value.year();
      if (age < 18) {
        return Promise.reject('You must be at least 18 years old.');
      }
    }
    return Promise.resolve();
  };

  // Handle form submission
  const handleSubmit = values => {
    
    dispatch(saveFormData(values)); // Dispatch action to save form data to Redux store
    console.log('Received values:', values);
    message.success('Form submitted successfully!');
    form.resetFields(); // Clear form fields after submission
    setAgree(false); // Reset the checkbox state to unchecked
  };

  // Handle form reset
  const handleReset = () => {
    form.resetFields(); // Clear form fields
    setAgree(false); // Reset the checkbox state to unchecked
  };

  return (
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <h1 style={{ color: 'white', backgroundColor: 'black', borderRadius: '50%', padding: '20px' }}>Simple Form</h1>

      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label={<span style={{ color: 'white', fontWeight: 'bold' }}>Name</span>}
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
          style={{ width: '100%' }} 
        >
          <Input style={{ width: '100%', color: 'black' }} placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: 'white', fontWeight: 'bold' }}>Phone Number</span>}
          name="phoneNumber"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            { pattern: /^[0-9]+$/, message: 'Please enter a valid phone number!' }
          ]}
          style={{ width: '100%' }} 
        >
          <Input style={{ width: '100%', color: 'black' }} placeholder="Enter your phone number" />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: 'white', fontWeight: 'bold' }}>Date of Birth</span>}
          name="dob"
          rules={[
            { required: true, message: 'Please select your date of birth!' },
            { validator: validateDOB }
          ]}
          style={{ width: '100%' }} 
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.List name="address">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'address']}
                    fieldKey={[fieldKey, 'address']}
                    rules={[
                      { required: true, message: 'Please input your address!' },
                      // Only first address field is required
                      { required: index === 0, message: 'Please input your address!' }
                    ]}
                    style={{ width: '100%' }} // Set width to 100% for double width
                  >
                    <Input placeholder="Address" style={{ width: '100%', color: 'black' }} />
                  </Form.Item>
                  {index === 0 ? null : (
                    <Button type="dashed" onClick={() => remove(name)} style={{ width: '40px' }}>-</Button>
                  )}
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} style={{ width: '100%' }}>+ Add Address</Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Checkbox checked={agree} onChange={e => setAgree(e.target.checked)}>
            I have read the agreement
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!agree}>Submit</Button>
          <span style={{ marginLeft: '10px' }} />
          <Button type="default" htmlType="button" onClick={handleReset}>Reset</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
