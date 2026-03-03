import React, { useState, useEffect } from 'react';
import {
  Card,
  Spin,
  Empty,
  Typography,
  Tag,
  Timeline,
  Progress,
  Row,
  Col,
  Avatar,
  Space,
  Button,
  Statistic,
  Select,
  Tabs,
  Badge,
  Descriptions,
  message,
} from 'antd';
import {
  TrophyOutlined,
  TeamOutlined,
  CalendarOutlined,
  CodeOutlined,
  GithubOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  UserOutlined,
  BulbOutlined,
  RocketOutlined,
  HistoryOutlined,
  ProjectOutlined,
  DownOutlined,
  ClockCircleOutlined,
  MailOutlined,
  IdcardOutlined,
  BookOutlined,
  StarOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import config from '../../config';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
// eslint-disable-next-line no-unused-vars
const { TabPane } = Tabs;

const HackathonHistory = () => {
  const [loading, setLoading] = useState(true);
  const [hackathonList, setHackathonList] = useState([]);
  const [selectedHackathonId, setSelectedHackathonId] = useState(null);
  const [selectedHackathonData, setSelectedHackathonData] = useState(null);
  const [summary, setSummary] = useState(null);

  const studentId = localStorage.getItem('student');

  useEffect(() => {
    if (studentId) {
      fetchHackathonHistory();
      fetchSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  // Auto-select first hackathon when list loads
  useEffect(() => {
    if (hackathonList.length > 0 && !selectedHackathonId) {
      setSelectedHackathonId(hackathonList[0].hackathon._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hackathonList]);

  // Fetch detailed data when hackathon is selected
  useEffect(() => {
    if (selectedHackathonId && hackathonList.length > 0) {
      const selected = hackathonList.find(h => h.hackathon._id === selectedHackathonId);
      setSelectedHackathonData(selected || null);
    }
  }, [selectedHackathonId, hackathonList]);

  const fetchHackathonHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.backendUrl}/hackathon-history/student/${studentId}/completed`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      if (response.data.success) {
        setHackathonList(response.data.hackathons || []);
      }
    } catch (error) {
      console.error('Error fetching hackathon history:', error);
      message.error('Failed to fetch hackathon history');
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        `${config.backendUrl}/hackathon-history/student/${studentId}/summary`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      if (response.data.success) {
        setSummary(response.data.summary);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return '#52c41a';
      case 'ongoing': return '#1890ff';
      case 'upcoming': return '#faad14';
      default: return '#8c8c8c';
    }
  };

  const handleHackathonChange = (hackathonId) => {
    setSelectedHackathonId(hackathonId);
  };

  // Summary Cards Component
  const SummaryCards = () => (
    <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
      <Col xs={12} sm={6}>
        <Card
          style={{
            borderRadius: '12px',
            background: '#669bbc',
            border: 'none',
          }}
          bodyStyle={{ padding: '16px', textAlign: 'center' }}
        >
          <TrophyOutlined style={{ fontSize: '24px', color: 'white', marginBottom: '8px' }} />
          <Statistic
            value={summary?.totalParticipated || 0}
            valueStyle={{ color: 'white', fontSize: '24px', fontWeight: 700 }}
          />
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px' }}>Participated</Text>
        </Card>
      </Col>
      <Col xs={12} sm={6}>
        <Card
          style={{
            borderRadius: '12px',
            background: '#669bbc',
            border: 'none',
          }}
          bodyStyle={{ padding: '16px', textAlign: 'center' }}
        >
          <CheckCircleOutlined style={{ fontSize: '24px', color: 'white', marginBottom: '8px' }} />
          <Statistic
            value={summary?.completedHackathons || 0}
            valueStyle={{ color: 'white', fontSize: '24px', fontWeight: 700 }}
          />
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px' }}>Completed</Text>
        </Card>
      </Col>
      <Col xs={12} sm={6}>
        <Card
          style={{
            borderRadius: '12px',
            background: '#669bbc',
            border: 'none',
          }}
          bodyStyle={{ padding: '16px', textAlign: 'center' }}
        >
          <ProjectOutlined style={{ fontSize: '24px', color: 'white', marginBottom: '8px' }} />
          <Statistic
            value={summary?.projectsSubmitted || 0}
            valueStyle={{ color: 'white', fontSize: '24px', fontWeight: 700 }}
          />
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px' }}>Submissions</Text>
        </Card>
      </Col>
      <Col xs={12} sm={6}>
        <Card
          style={{
            borderRadius: '12px',
            background: '#669bbc',
            border: 'none',
          }}
          bodyStyle={{ padding: '16px', textAlign: 'center' }}
        >
          <RocketOutlined style={{ fontSize: '24px', color: 'white', marginBottom: '8px' }} />
          <Statistic
            value={summary?.ongoingHackathons || 0}
            valueStyle={{ color: 'white', fontSize: '24px', fontWeight: 700 }}
          />
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px' }}>Ongoing</Text>
        </Card>
      </Col>
    </Row>
  );

  // Hackathon Selector Dropdown
  const HackathonSelector = () => (
    <Card
      style={{
        borderRadius: '16px',
        marginBottom: '24px',
        background: 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}
      bodyStyle={{ padding: '24px' }}
    >
      <Row align="middle" gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            <Text strong style={{ fontSize: '16px', color: '#1a1a1a' }}>
              <HistoryOutlined style={{ marginRight: '8px', color: '#669bbc' }} />
              Select Hackathon
            </Text>
            <Text type="secondary" style={{ fontSize: '13px' }}>
              Choose a hackathon to view detailed history
            </Text>
          </Space>
        </Col>
        <Col xs={24} sm={12}>
          <Select
            value={selectedHackathonId}
            onChange={handleHackathonChange}
            style={{ width: '100%' }}
            size="large"
            placeholder="Select a hackathon"
            suffixIcon={<DownOutlined style={{ color: '#669bbc' }} />}
            dropdownStyle={{ borderRadius: '12px' }}
          >
            {hackathonList.map((item) => (
              <Option key={item.hackathon._id} value={item.hackathon._id}>
                <Space>
                  <TrophyOutlined style={{ color: '#669bbc' }} />
                  <span>{item.hackathon.name}</span>
                  <Tag color={getStatusColor(item.hackathon.status)} style={{ marginLeft: '8px' }}>
                    {item.hackathon.status}
                  </Tag>
                </Space>
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </Card>
  );

  // Team Details Tab
  const TeamDetailsTab = ({ team }) => {
    if (!team) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No team information available"
        />
      );
    }

    return (
      <div>
        {/* Team Header */}
        <Card
          style={{
            borderRadius: '16px',
            marginBottom: '20px',
            background: '#669bbc',
            border: 'none',
          }}
          bodyStyle={{ padding: '24px' }}
        >
          <Row align="middle" gutter={[24, 16]} wrap>
            <Col>
              <Avatar
                size={64}
                icon={<TeamOutlined />}
                style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  border: '3px solid rgba(255,255,255,0.5)' 
                }}
              />
            </Col>
            <Col flex="auto">
              <Title level={3} style={{ color: 'white', margin: 0 }}>
                {team.name || 'Unnamed Team'}
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.9)' }}>
                {team.members?.length || 0} Members
              </Text>
            </Col>
            {team.mentor && (
              <Col xs={24} sm="auto">
                <div style={{
                  background: 'rgba(255,255,255,0.15)',
                  padding: '12px 20px',
                  borderRadius: '12px',
                }}>
                  <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', display: 'block' }}>
                    Mentor Assigned
                  </Text>
                  <Text strong style={{ color: 'white', fontSize: '16px' }}>
                    {team.mentor.name}
                  </Text>
                </div>
              </Col>
            )}
          </Row>
        </Card>

        {/* Team Members */}
        <Title level={5} style={{ marginBottom: '16px' }}>
          <UserOutlined style={{ marginRight: '8px', color: '#669bbc' }} />
          Team Members
        </Title>
        <Row gutter={[16, 16]}>
          {team.members?.map((member, index) => (
            <Col xs={24} sm={12} lg={8} key={member._id || index}>
              <Card
                hoverable
                style={{
                  borderRadius: '12px',
                  border: member.isTeamLead ? '2px solid #ffd700' : '1px solid #f0f0f0',
                  background: member.isTeamLead 
                    ? 'linear-gradient(135deg, #fff9e6 0%, #fffef0 100%)' 
                    : 'white',
                }}
                bodyStyle={{ padding: '20px' }}
              >
                <Space align="start" size={16}>
                  <Avatar
                    size={56}
                    icon={<UserOutlined />}
                    style={{
                      background: '#669bbc',
                      border: member.isTeamLead ? '3px solid #ffd700' : 'none',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <Space wrap>
                      <Text strong style={{ fontSize: '16px' }}>{member.name}</Text>
                      {member.isTeamLead && (
                        <Tag color="gold" icon={<StarOutlined />}>Lead</Tag>
                      )}
                    </Space>
                    <div style={{ marginTop: '8px' }}>
                      <Space direction="vertical" size={2}>
                        <Text type="secondary" style={{ fontSize: '13px' }}>
                          <IdcardOutlined style={{ marginRight: '6px' }} />
                          {member.rollNo || 'N/A'}
                        </Text>
                        <Text type="secondary" style={{ fontSize: '13px' }}>
                          <BookOutlined style={{ marginRight: '6px' }} />
                          {member.branch || 'N/A'}
                        </Text>
                        {member.email && (
                          <Text type="secondary" style={{ fontSize: '13px' }}>
                            <MailOutlined style={{ marginRight: '6px' }} />
                            {member.email}
                          </Text>
                        )}
                      </Space>
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  // Problem Statement Tab
  const ProblemStatementTab = ({ problemStatement }) => {
    if (!problemStatement) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No problem statement assigned"
        />
      );
    }

    return (
      <Card
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        {/* Problem Statement Header */}
        <div style={{
          background: '#669bbc',
          padding: '24px',
          margin: '-24px -24px 24px -24px',
        }}>
          <Tag color="white" style={{ color: '#669bbc', marginBottom: '12px', fontWeight: 600 }}>
            {problemStatement.domain}
          </Tag>
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            <BulbOutlined style={{ marginRight: '12px' }} />
            {problemStatement.title}
          </Title>
        </div>

        {/* Description */}
        <div style={{ padding: '8px 0' }}>
          <Title level={5} style={{ marginBottom: '12px' }}>
            <FileTextOutlined style={{ marginRight: '8px', color: '#669bbc' }} />
            Description
          </Title>
          <Paragraph style={{ 
            fontSize: '15px', 
            lineHeight: '1.8', 
            color: '#444',
            background: '#f9f9f9',
            padding: '16px',
            borderRadius: '8px',
            borderLeft: '4px solid #669bbc'
          }}>
            {problemStatement.description}
          </Paragraph>
        </div>
      </Card>
    );
  };

  // Schedule Tab
  const ScheduleTab = ({ schedule }) => {
    if (!schedule || schedule.length === 0) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No schedule available"
        />
      );
    }

    return (
      <div>
        {schedule.map((dayItem, dayIndex) => (
          <Card
            key={dayIndex}
            style={{
              borderRadius: '16px',
              marginBottom: '20px',
              overflow: 'hidden',
              border: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            {/* Day Header */}
            <div style={{
              background: '#669bbc',
              padding: '16px 24px',
              margin: '-24px -24px 20px -24px',
            }}>
              <Title level={4} style={{ color: 'white', margin: 0 }}>
                <CalendarOutlined style={{ marginRight: '10px' }} />
                {dayItem.day}
              </Title>
            </div>

            {/* Sessions Timeline */}
            <Timeline mode="left">
              {dayItem.sessions?.map((session, sessionIndex) => (
                <Timeline.Item
                  key={sessionIndex}
                  color="#667eea"
                  dot={
                    <ClockCircleOutlined 
                      style={{ 
                        fontSize: '16px', 
                        color: '#669bbc',
                        background: 'white',
                        borderRadius: '50%',
                      }} 
                    />
                  }
                >
                  <Card
                    size="small"
                    style={{
                      borderRadius: '10px',
                      background: '#f8f9ff',
                      border: '1px solid #e8ecff',
                    }}
                  >
                    <Row justify="space-between" align="middle" gutter={[8, 8]}>
                      <Col flex="auto">
                        <Text strong style={{ fontSize: '15px', color: '#333' }}>
                          {session.session}
                        </Text>
                      </Col>
                      <Col>
                        <Tag color="blue" icon={<ClockCircleOutlined />}>
                          {session.time}
                        </Tag>
                      </Col>
                    </Row>
                  </Card>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        ))}
      </div>
    );
  };

  // Progress Tab
  const ProgressTab = ({ progress }) => {
    if (!progress) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No progress data available"
        />
      );
    }

    return (
      <Card
        style={{
          borderRadius: '16px',
          border: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        {/* Progress Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Progress
            type="dashboard"
            percent={progress.percentage || 0}
            size={180}
            strokeWidth={10}
            strokeColor="#669bbc"
            format={(percent) => (
              <div>
                <div style={{ fontSize: '32px', fontWeight: 700, color: '#333' }}>
                  {percent}%
                </div>
                <div style={{ fontSize: '14px', color: '#888' }}>Complete</div>
              </div>
            )}
          />
        </div>

        {/* Status */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Tag 
            color={
              progress.status === 'Completed' ? 'success' : 
              progress.status === 'In Progress' ? 'processing' : 'default'
            }
            style={{ 
              fontSize: '16px', 
              padding: '8px 24px',
              borderRadius: '20px',
            }}
          >
            {progress.status || 'Not Started'}
          </Tag>
        </div>

        {/* Latest Update */}
        {progress.description && (
          <Card
            style={{
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
              border: 'none',
            }}
          >
            <Title level={5} style={{ marginBottom: '12px' }}>
              <RocketOutlined style={{ marginRight: '8px', color: '#669bbc' }} />
              Latest Update
            </Title>
            <Paragraph style={{ fontSize: '15px', marginBottom: '8px' }}>
              {progress.description}
            </Paragraph>
            {progress.lastUpdated && (
              <Text type="secondary" style={{ fontSize: '13px' }}>
                <ClockCircleOutlined style={{ marginRight: '6px' }} />
                Updated: {formatDate(progress.lastUpdated)}
              </Text>
            )}
          </Card>
        )}
      </Card>
    );
  };

  // Submission Tab
  const SubmissionTab = ({ submission }) => {
    if (!submission) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No project submission found"
        />
      );
    }

    return (
      <Card
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        {/* Project Header */}
        <div style={{
          background: '#669bbc',
          padding: '24px',
          margin: '-24px -24px 24px -24px',
        }}>
          <Badge.Ribbon 
            text={submission.status || 'Submitted'} 
            color={submission.status === 'approved' ? '#52c41a' : '#1890ff'}
          >
            <Title level={3} style={{ color: 'white', margin: 0, paddingRight: '80px' }}>
              <CodeOutlined style={{ marginRight: '12px' }} />
              {submission.projectTitle || 'Untitled Project'}
            </Title>
          </Badge.Ribbon>
          {submission.submittedAt && (
            <Text style={{ color: 'rgba(255,255,255,0.9)', marginTop: '8px', display: 'block' }}>
              <CalendarOutlined style={{ marginRight: '6px' }} />
              Submitted on {formatDate(submission.submittedAt)}
            </Text>
          )}
        </div>

        {/* Project Description */}
        <div style={{ marginBottom: '24px' }}>
          <Title level={5} style={{ marginBottom: '12px' }}>
            <FileTextOutlined style={{ marginRight: '8px', color: '#669bbc' }} />
            Project Description
          </Title>
          <Paragraph style={{ 
            fontSize: '15px', 
            lineHeight: '1.8', 
            color: '#444',
            background: '#f9f9f9',
            padding: '16px',
            borderRadius: '8px',
          }}>
            {submission.projectDescription || 'No description provided'}
          </Paragraph>
        </div>

        {/* Tech Stack */}
        {submission.techStack && submission.techStack.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <Title level={5} style={{ marginBottom: '12px' }}>
              <CodeOutlined style={{ marginRight: '8px', color: '#669bbc' }} />
              Tech Stack
            </Title>
            <Space wrap size={[8, 8]}>
              {submission.techStack.map((tech, index) => (
                <Tag 
                  key={index} 
                  color="geekblue" 
                  style={{ 
                    padding: '6px 16px', 
                    fontSize: '14px',
                    borderRadius: '20px',
                  }}
                >
                  {tech}
                </Tag>
              ))}
            </Space>
          </div>
        )}

        {/* GitHub Link */}
        {submission.githubRepo && (
          <Button
            type="primary"
            icon={<GithubOutlined />}
            size="large"
            href={submission.githubRepo}
            target="_blank"
            style={{
              background: '#669bbc',
              border: 'none',
              borderRadius: '8px',
              height: '48px',
              paddingLeft: '24px',
              paddingRight: '24px',
            }}
          >
            View on GitHub
          </Button>
        )}
      </Card>
    );
  };

  // Hackathon Overview Component
  const HackathonOverview = ({ hackathon }) => {
    if (!hackathon) return null;

    return (
      <Card
        style={{
          borderRadius: '16px',
          marginBottom: '24px',
          overflow: 'hidden',
          border: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{
          background: '#669bbc',
          padding: '32px',
          margin: '-24px -24px 24px -24px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative circles */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '30%',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }} />

          <Row align="middle" gutter={[24, 16]} wrap>
            <Col>
              <Avatar
                size={80}
                icon={<TrophyOutlined />}
                style={{
                  background: '#669bbc',
                  border: '4px solid rgba(255,255,255,0.2)',
                }}
              />
            </Col>
            <Col flex="auto">
              <Title level={2} style={{ color: 'white', margin: 0 }}>
                {hackathon.name}
              </Title>
              <Space style={{ marginTop: '12px' }} wrap>
                <Tag color={getStatusColor(hackathon.status)} style={{ fontSize: '13px', padding: '4px 12px' }}>
                  {hackathon.status?.toUpperCase()}
                </Tag>
                {hackathon.year && (
                  <Tag color="default" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }}>
                    {hackathon.year}
                  </Tag>
                )}
              </Space>
            </Col>
          </Row>
        </div>

        {/* Hackathon Details */}
        <Descriptions column={{ xs: 1, sm: 2, md: 3 }} size="middle">
          <Descriptions.Item 
            label={<><CalendarOutlined style={{ marginRight: '6px' }} />Start Date</>}
          >
            {formatDate(hackathon.startDate)}
          </Descriptions.Item>
          <Descriptions.Item 
            label={<><CalendarOutlined style={{ marginRight: '6px' }} />End Date</>}
          >
            {formatDate(hackathon.endDate)}
          </Descriptions.Item>
          {hackathon.college && (
            <Descriptions.Item 
              label={<><BookOutlined style={{ marginRight: '6px' }} />College</>}
            >
              {hackathon.college}
            </Descriptions.Item>
          )}
        </Descriptions>

        {hackathon.description && (
          <div style={{ marginTop: '16px' }}>
            <Text type="secondary" style={{ fontSize: '14px', lineHeight: '1.6' }}>
              {hackathon.description}
            </Text>
          </div>
        )}
      </Card>
    );
  };

  // Main Render
  return (
    <div style={{
      padding: '24px',
      paddingTop: '100px',
      maxWidth: '1400px',
      margin: '0 auto',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
    }}>
      {/* Page Header */}
      <div style={{
        background: '#669bbc',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '24px',
        boxShadow: '0 10px 40px rgba(102, 155, 188, 0.3)',
        textAlign: 'center',
      }}>
        <Title level={2} style={{
          color: 'white',
          margin: 0,
          fontSize: '28px',
          fontWeight: 700,
        }}>
          <HistoryOutlined style={{ marginRight: '12px' }} />
          My Hackathon Journey
        </Title>
        <Text style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '15px',
          display: 'block',
          marginTop: '8px',
        }}>
          Explore your hackathon participations, team details, and achievements
        </Text>
      </div>

      {/* Summary Statistics */}
      {summary && <SummaryCards />}

      {/* Loading State */}
      <Spin spinning={loading} size="large">
        {hackathonList.length === 0 && !loading ? (
          <Card style={{
            borderRadius: '16px',
            textAlign: 'center',
            padding: '60px 24px',
          }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div>
                  <Title level={4} style={{ color: '#8c8c8c' }}>No Completed Hackathons Yet</Title>
                  <Text type="secondary">
                    Your hackathon history will appear here once you've participated in and completed hackathons.
                  </Text>
                </div>
              }
            />
          </Card>
        ) : (
          <>
            {/* Hackathon Selector */}
            <HackathonSelector />

            {/* Selected Hackathon Content */}
            {selectedHackathonData && (
              <>
                {/* Hackathon Overview */}
                <HackathonOverview hackathon={selectedHackathonData.hackathon} />

                {/* Tabs for different sections */}
                <Card
                  style={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  }}
                  bodyStyle={{ padding: '0' }}
                >
                  <Tabs
                    defaultActiveKey="team"
                    tabBarStyle={{
                      padding: '16px 24px 0 24px',
                      marginBottom: 0,
                      background: '#fafafa',
                      borderRadius: '16px 16px 0 0',
                    }}
                    size="large"
                    items={[
                      {
                        key: 'team',
                        label: (
                          <span>
                            <TeamOutlined />
                            Team
                          </span>
                        ),
                        children: (
                          <div style={{ padding: '24px' }}>
                            <TeamDetailsTab team={selectedHackathonData.team} />
                          </div>
                        ),
                      },
                      {
                        key: 'problem',
                        label: (
                          <span>
                            <BulbOutlined />
                            Problem
                          </span>
                        ),
                        children: (
                          <div style={{ padding: '24px' }}>
                            <ProblemStatementTab problemStatement={selectedHackathonData.problemStatement} />
                          </div>
                        ),
                      },
                      {
                        key: 'schedule',
                        label: (
                          <span>
                            <ScheduleOutlined />
                            Schedule
                          </span>
                        ),
                        children: (
                          <div style={{ padding: '24px' }}>
                            <ScheduleTab schedule={selectedHackathonData.schedule} />
                          </div>
                        ),
                      },
                      {
                        key: 'progress',
                        label: (
                          <span>
                            <RocketOutlined />
                            Progress
                          </span>
                        ),
                        children: (
                          <div style={{ padding: '24px' }}>
                            <ProgressTab progress={selectedHackathonData.teamProgress} />
                          </div>
                        ),
                      },
                      {
                        key: 'submission',
                        label: (
                          <span>
                            <CodeOutlined />
                            Submission
                          </span>
                        ),
                        children: (
                          <div style={{ padding: '24px' }}>
                            <SubmissionTab submission={selectedHackathonData.submission} />
                          </div>
                        ),
                      },
                    ]}
                  />
                </Card>
              </>
            )}
          </>
        )}
      </Spin>
    </div>
  );
};

export default HackathonHistory;
