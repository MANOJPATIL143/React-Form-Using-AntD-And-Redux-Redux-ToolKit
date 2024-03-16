import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, DatePicker, Space, message, Checkbox } from 'antd';
import { saveFormData } from './redux/formSlice';
import backgroundImage from './assets/img1.jpg';


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
    console.log('Form values submitted:', JSON.stringify(values)); // Log form values to console
    message.success('Form submitted successfully!');
    form.resetFields(); // Clear form fields after submission
    setAgree(false); // Reset the checkbox state to unchecked
  };

  // Handle form reset
  const handleReset = () => {
    form.resetFields(); // Clear form fields
    setAgree(false); // Reset the checkbox state to unchecked
  };

  // Function to initialize the form with one address input
  const initializeForm = () => {
    form.setFieldsValue({ address: [{ address: '' }] }); // Set initial value for the address field
  };

  useEffect(() => {
    initializeForm(); // Call the initializeForm function when the component mounts
  }, []); // Empty dependency array ensures it runs only once after mounting

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

      <Form form={form} onFinish={handleSubmit} layout="vertical" style={{ maxWidth: '400px', width: '100%' }}>
        <Form.Item
          label={<span style={{ color: 'white', fontWeight: 'bold', width: '100px', display: 'inline-block' }}>Name</span>}
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
          style={{ width: '100%', marginBottom: 16 }} 
        >
          <Input style={{ width: '100%', color: 'black' }} placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: 'white', fontWeight: 'bold', width: '100px', display: 'inline-block' }}>Phone Number</span>}
          name="phoneNumber"
          rules={[
            { required: true, message: 'Please input your phone number!' },
            { pattern: /^[0-9]+$/, message: 'Please enter a valid phone number!' }
          ]}
          style={{ width: '100%', marginBottom: 16 }} 
        >
          <Input style={{ width: '100%', color: 'black' }} placeholder="Enter your phone number" />
        </Form.Item>
        <Form.Item
          label={<span style={{ color: 'white', fontWeight: 'bold', width: '100px', display: 'inline-block' }}>Date of Birth</span>}
          name="dob"
          rules={[
            { required: true, message: 'Please select your date of birth!' },
            { validator: validateDOB }
          ]}
          style={{ width: '100%', marginBottom: 16 }} 
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.List name="address">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 16 }} align="baseline">
                  {/* Label for address input field */}
                  <Form.Item
                    label={<span style={{ color: 'white', fontWeight: 'bold', width: '100px', display: 'inline-block' }}>Address</span>}
                    {...restField}
                    name={[name, 'address']}
                    fieldKey={[fieldKey, 'address']}
                    rules={[
                      { required: false, message: 'Please input your address!' }
                    ]}
                    style={{ width: 'calc(100% - -218px)', position: 'relative', marginBottom: 24 }}
                  >
                    <Input placeholder={`Address ${index + 1}`} style={{ width: '100%', color: 'black', }} />
                    {index > 0 && ( // Show remove button only from the second address box
                      <Button type="dashed" onClick={() => remove(name)} style={{ position: 'absolute', right: 0, top: 0, padding: '3px 10px', fontSize: '12px' }}>-</Button>
                    )}
                  </Form.Item>
                </Space>
              ))}
              
              <Form.Item style={{ width: '100%', marginBottom: 15 }}>
                <Button type="dashed" onClick={() => add()} style={{ width: '100%' }}>+ Add Address</Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item style={{ marginBottom: 16 }}>
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
