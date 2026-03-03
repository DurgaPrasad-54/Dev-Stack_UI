import React, { useState } from 'react';
import axios from 'axios';
import { Upload, message, Button, Typography, List, Alert, Card, Row, Col, Space } from 'antd';
import { UploadOutlined, DownloadOutlined, FileExcelOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import config from '../config';
import './csv.css';

const { Title, Text } = Typography;

const StudentRegistration = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [existingStudents, setExistingStudents] = useState([]);
  const [processingErrors, setProcessingErrors] = useState([]);

  const handleUpload = async () => {
    if (!file) {
      message.error('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      const response = await axios.post(`${config.backendUrl}/csv/register-students`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      message.success('File processed successfully');
      setRegisteredStudents(response.data.registered);
      setExistingStudents(response.data.existingStudents);
      setProcessingErrors(response.data.errors);
    } catch (error) {
      message.error(error.response?.data?.error || 'An error occurred while uploading the file');
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    // Create CSV content with headers only
    const headers = ['name', 'email', 'phoneNumber', 'rollNo', 'branch', 'year', 'currentYear', 'college', 'github', 'linkedin'];
    const csvContent = headers.join(',') + '\n';
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'student_registration_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    message.success('Template downloaded successfully');
  };

  const handleDownloadSample = () => {
    // Create sample data with headers
    const headers = ['name', 'email', 'phoneNumber', 'rollNo', 'branch', 'year', 'currentYear', 'college', 'github', 'linkedin'];
    const sampleData = [
      headers, // Header row
      ['John Doe', 'john.doe@gmail.com', '9876543210', 'AI001', 'Artificial Intelligence (AI)', '2024', 'first year', 'KIET', 'https://github.com/johndoe', 'https://linkedin.com/in/johndoe'],
      ['Jane Smith', 'jane.smith@gmail.com', '9876543211', 'CSM002', 'Artificial Intelligence and Machine Learning (CSM)', '2024', 'first year', 'KIET+', 'https://github.com/janesmith', 'https://linkedin.com/in/janesmith'],
      ['Mike Johnson', 'mike.johnson@gmail.com', '9876543212', 'AID001', 'Artificial Intelligence and Data Science (AID)', '2023', 'first year', 'KIEW', 'https://github.com/mikejohnson', 'https://linkedin.com/in/mikejohnson'],
      ['Sarah Wilson', 'sarah.wilson@gmail.com', '9876543213', 'CSC001', 'Cyber Security (CSC)', '2025', 'first year', 'KIET', 'https://github.com/sarahwilson', 'https://linkedin.com/in/sarahwilson'],
      ['David Brown', 'david.brown@gmail.com', '9876543214', 'CSD001', 'Data Science (CSD)', '2024', 'first year', 'KIET+', 'https://github.com/davidbrown', 'https://linkedin.com/in/davidbrown']
    ];
    
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Create a worksheet from the sample data
    const worksheet = XLSX.utils.aoa_to_sheet(sampleData);
    
    // Set column widths for better readability
    const columnWidths = [
      { wch: 15 }, // name
      { wch: 25 }, // email
      { wch: 15 }, // phoneNumber
      { wch: 10 }, // rollNo
      { wch: 35 }, // branch
      { wch: 8 },  // year
      { wch: 15 }, // currentYear
      { wch: 10 }, // college
      { wch: 30 }, // github
      { wch: 30 }  // linkedin
    ];
    worksheet['!cols'] = columnWidths;
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    
    // Generate and download the XLSX file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'student_registration_sample.xlsx');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    message.success('Sample XLSX file downloaded successfully');
  };

  const props = {
    onRemove: () => {
      setFile(null);
      setRegisteredStudents([]);
      setExistingStudents([]);
      setProcessingErrors([]);
    },
    beforeUpload: (file) => {
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                     file.type === 'application/vnd.ms-excel' ||
                     file.type === 'text/csv';
      if (!isExcel) {
        message.error('You can only upload Excel files (.xlsx or .xls) or CSV files!');
        return false;
      }
      setFile(file);
      return false;
    },
    file,
    showUploadList: false,
  };

  return (
    <div className="main-content-with-header">
      <div className="csv-registration-container">
        <Title level={2} className="csv-registration-title">
          Excel for Bulk Student Registration
        </Title>
        
        <Row gutter={[32, 32]}>
          {/* Upload Student Data Section */}
          <Col xs={24} md={12}>
            <Card className="csv-card">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Title level={4} className="csv-section-title">
                    <UploadOutlined />
                    Upload Student Data
                  </Title>
                  <Text type="secondary">
                    Upload your prepared Excel file (.XLSX or .XLS) or CSV file containing student registration data.
                  </Text>
                </div>
                
                <Upload.Dragger 
                  {...props} 
                  accept=".xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
                  className="csv-upload-dragger"
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined className="csv-upload-icon" />
                  </p>
                  <p className="ant-upload-text csv-upload-text">
                    Click to browse files
                  </p>
                </Upload.Dragger>
                
                <Button
                  type="primary"
                  onClick={handleUpload}
                  disabled={!file}
                  loading={uploading}
                  size="large"
                  block
                  className="csv-upload-btn"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>

                {file && (
                  <Alert
                    message={`Selected file: ${file.name}`}
                    type="info"
                    showIcon
                    icon={<FileExcelOutlined />}
                  />
                )}
              </Space>
            </Card>
          </Col>

          {/* Download Templates Section */}
          <Col xs={24} md={12}>
            <Card className="csv-card">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Title level={4} className="csv-section-title">
                    <DownloadOutlined />
                    Download Templates
                  </Title>
                  <Text type="secondary">
                    Get the official CSV template for student registration or a pre-filled sample.
                  </Text>
                </div>

                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  <Button
                    type="default"
                    icon={<FileExcelOutlined style={{ color: '#1890ff' }} />}
                    onClick={handleDownloadTemplate}
                    size="large"
                    block
                    className="csv-template-btn"
                  >
                    <span>Student Registration Template (.CSV)</span>
                    <DownloadOutlined />
                  </Button>

                  <Button
                    type="default"
                    icon={<FileExcelOutlined style={{ color: '#52c41a' }} />}
                    onClick={handleDownloadSample}
                    size="large"
                    block
                    className="csv-template-btn"
                  >
                    <span>Download Sample Data File (.XLSX)</span>
                    <DownloadOutlined />
                  </Button>
                </Space>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Results Section */}
        {(registeredStudents.length > 0 || existingStudents.length > 0 || processingErrors.length > 0) && (
          <Row className="csv-results-section">
            <Col span={24}>
              <Card title="Processing Results">
                {registeredStudents.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <Title level={4} className="csv-success-title">
                      Successfully Registered Students ({registeredStudents.length}):
                    </Title>
                    <List
                      bordered
                      dataSource={registeredStudents}
                      renderItem={(student) => <List.Item>{student}</List.Item>}
                      className="csv-list"
                    />
                  </div>
                )}
                
                {existingStudents.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <Title level={4} className="csv-warning-title">
                      Already Registered Students ({existingStudents.length}):
                    </Title>
                    <List
                      bordered
                      dataSource={existingStudents}
                      renderItem={(student) => (
                        <List.Item>
                          <Text>{student.name} ({student.email})</Text>
                        </List.Item>
                      )}
                      className="csv-list"
                    />
                  </div>
                )}
                
                {processingErrors.length > 0 && (
                  <div>
                    <Title level={4} className="csv-error-title">
                      Processing Errors ({processingErrors.length}):
                    </Title>
                    <List
                      bordered
                      dataSource={processingErrors}
                      renderItem={(error) => (
                        <List.Item>
                          <Alert
                            message={error.student}
                            description={error.error}
                            type="error"
                            showIcon
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default StudentRegistration;