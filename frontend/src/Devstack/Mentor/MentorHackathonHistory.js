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
  List,
  Collapse,
  message,
  Table,
  Rate,
  Tooltip,
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
  SolutionOutlined,
  FundProjectionScreenOutlined,
  BarChartOutlined,
  FileSearchOutlined,
  CommentOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import config from '../../config';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const MentorHackathonHistory = () => {
  const [loading, setLoading] = useState(true);
  const [hackathonList, setHackathonList] = useState([]);
  const [selectedHackathonId, setSelectedHackathonId] = useState(null);
  const [selectedHackathonData, setSelectedHackathonData] = useState(null);
  const [summary, setSummary] = useState(null);

  const mentorId = localStorage.getItem('mentor');

  useEffect(() => {
    if (mentorId) {
      fetchHackathonHistory();
      fetchSummary();
    }
  }, [mentorId]);

  // Auto-select first hackathon when list loads
  useEffect(() => {
    if (hackathonList.length > 0 && !selectedHackathonId) {
      setSelectedHackathonId(hackathonList[0].hackathon._id);
    }
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
        `${config.backendUrl}/mentor-hackathon-history/mentor/${mentorId}/completed`,
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
        `${config.backendUrl}/mentor-hackathon-history/mentor/${mentorId}/summary`,
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
      <Col xs={12} sm={8} md={4}>
        <Card
          style={{
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
          }}
          bodyStyle={{ padding: '16px', textAlign: 'center' }}
        >
          <TrophyOutlined style={{ fontSize: '24px', color: 'white', marginBottom: '8px' }} />
          <Statistic
            value={summary?.totalParticipated || 0}
            valueStyle={{ color: 'white', fontSize: '22px', fontWeight: 700 }}
          />
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '11px' }}>Participated</Text>
        </Card>
      </Col>
      <Col xs={12} sm={8} md={4}>
        <Card
          style={{
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            border: 'none',
          }}
          bodyStyle={{ padding: '16px', textAlign: 'center' }}
        >
          <CheckCircleOutlined style={{ fontSize: '24px', color: 'white', marginBottom: '8px' }} />
          <Statistic
            value={summary?.completedHackathons || 0}
            valueStyle={{ color: 'white', fontSize: '22px', fontWeight: 700 }}
          />
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '11px' }}>Completed</Text>
        </Card>
      </Col>
      <Col xs={12} sm={8} md={4}>
        <Card
          style={{
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            border: 'none',
          }}
          bodyStyle={{ padding: '16px', textAlign: 'center' }}
        >
          <TeamOutlined style={{ fontSize: '24px', color: 'white', marginBottom: '8px' }} />
          <Statistic
            value={summary?.totalTeamsMentored || 0}
            valueStyle={{ color: 'white', fontSize: '22px', fontWeight: 700 }}
          />
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '11px' }}>Teams Mentored</Text>
        </Card>
      </Col>
      <Col xs={12} sm={8} md={4}>
        <Card
          style={{
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            border: 'none',
          }}
          bodyStyle={{ padding: '16px', textAlign: 'center' }}
        >
          <ProjectOutlined style={{ fontSize: '24px', color: 'white', marginBottom: '8px' }} />
          <Statistic
            value={summary?.totalSubmissions || 0}
            valueStyle={{ color: 'white', fontSize: '22px', fontWeight: 700 }}
          />
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '11px' }}>Submissions</Text>
        </Card>
      </Col>
      <Col xs={12} sm={8} md={4}>
        <Card
          style={{
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            border: 'none',
          }}
          bodyStyle={{ padding: '16px', textAlign: 'center' }}
        >
          <RocketOutlined style={{ fontSize: '24px', color: 'white', marginBottom: '8px' }} />
          <Statistic
            value={summary?.ongoingHackathons || 0}
            valueStyle={{ color: 'white', fontSize: '22px', fontWeight: 700 }}
          />
          <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '11px' }}>Ongoing</Text>
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
              <HistoryOutlined style={{ marginRight: '8px', color: '#667eea' }} />
              Select Hackathon
            </Text>
            <Text type="secondary" style={{ fontSize: '13px' }}>
              Choose a hackathon to view your mentoring history
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
            suffixIcon={<DownOutlined style={{ color: '#667eea' }} />}
            dropdownStyle={{ borderRadius: '12px' }}
          >
            {hackathonList.map((item) => (
              <Option key={item.hackathon._id} value={item.hackathon._id}>
                <Space>
                  <TrophyOutlined style={{ color: '#667eea' }} />
                  <span>{item.hackathon.name}</span>
                  <Tag color="blue">{item.teamsCount} teams</Tag>
                </Space>
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </Card>
  );

  // Team Card Component
  const TeamCard = ({ team, index }) => (
    <Card
      style={{
        borderRadius: '16px',
        marginBottom: '16px',
        border: 'none',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Team Header */}
      <div style={{
        background: `linear-gradient(135deg, ${
          index % 4 === 0 ? '#667eea, #764ba2' :
          index % 4 === 1 ? '#11998e, #38ef7d' :
          index % 4 === 2 ? '#f093fb, #f5576c' :
          '#4facfe, #00f2fe'
        })`,
        padding: '20px 24px',
        margin: '-24px -24px 20px -24px',
      }}>
        <Row align="middle" justify="space-between" wrap gutter={[16, 16]}>
          <Col>
            <Space>
              <Avatar
                size={48}
                icon={<TeamOutlined />}
                style={{ background: 'rgba(255,255,255,0.2)' }}
              />
              <div>
                <Title level={4} style={{ color: 'white', margin: 0 }}>
                  {team.name || 'Unnamed Team'}
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px' }}>
                  {team.members?.length || 0} Members
                </Text>
              </div>
            </Space>
          </Col>
          <Col>
            <Space>
              {team.progress && (
                <Tag color="white" style={{ color: '#333', fontWeight: 600 }}>
                  {team.progress.percentage || 0}% Progress
                </Tag>
              )}
              {team.submission && (
                <Tag color="green">Submitted</Tag>
              )}
            </Space>
          </Col>
        </Row>
      </div>

      <Collapse ghost expandIconPosition="end">
        {/* Team Members */}
        <Panel 
          header={
            <Text strong>
              <UserOutlined style={{ marginRight: '8px', color: '#667eea' }} />
              Team Members ({team.members?.length || 0})
            </Text>
          } 
          key="members"
        >
          <Row gutter={[12, 12]}>
            {team.members?.map((member, idx) => (
              <Col xs={24} sm={12} key={member._id || idx}>
                <Card
                  size="small"
                  style={{
                    borderRadius: '10px',
                    border: member.isTeamLead ? '2px solid #ffd700' : '1px solid #f0f0f0',
                    background: member.isTeamLead ? '#fffef0' : 'white',
                  }}
                >
                  <Space>
                    <Avatar
                      size={36}
                      icon={<UserOutlined />}
                      style={{
                        background: member.isTeamLead
                          ? 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)'
                          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      }}
                    />
                    <div>
                      <Space size={4}>
                        <Text strong style={{ fontSize: '14px' }}>{member.name}</Text>
                        {member.isTeamLead && <Tag color="gold" style={{ fontSize: '10px' }}>Lead</Tag>}
                      </Space>
                      <div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {member.rollNo} • {member.branch}
                        </Text>
                      </div>
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Panel>

        {/* Problem Statement */}
        {team.problemStatement && (
          <Panel
            header={
              <Text strong>
                <BulbOutlined style={{ marginRight: '8px', color: '#faad14' }} />
                Problem Statement
              </Text>
            }
            key="problem"
          >
            <Card
              size="small"
              style={{ borderRadius: '10px', background: '#f9f9f9' }}
            >
              <Tag color="purple" style={{ marginBottom: '8px' }}>{team.problemStatement.domain}</Tag>
              <Title level={5} style={{ marginBottom: '4px' }}>{team.problemStatement.title}</Title>
              <Paragraph type="secondary" style={{ marginBottom: 0, fontSize: '13px' }}>
                {team.problemStatement.description}
              </Paragraph>
            </Card>
          </Panel>
        )}

        {/* Progress */}
        {team.progress && (
          <Panel
            header={
              <Text strong>
                <RocketOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
                Team Progress
              </Text>
            }
            key="progress"
          >
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <Progress
                type="circle"
                percent={team.progress.percentage || 0}
                size={120}
                strokeColor={{
                  '0%': '#667eea',
                  '100%': '#764ba2',
                }}
              />
              <div style={{ marginTop: '16px' }}>
                <Tag color={
                  team.progress.status === 'Completed' ? 'success' :
                  team.progress.status === 'In Progress' ? 'processing' : 'default'
                }>
                  {team.progress.status || 'Not Started'}
                </Tag>
              </div>
              {team.progress.description && (
                <Paragraph type="secondary" style={{ marginTop: '12px', fontSize: '13px' }}>
                  {team.progress.description}
                </Paragraph>
              )}
            </div>
          </Panel>
        )}

        {/* Submission */}
        {team.submission && (
          <Panel
            header={
              <Text strong>
                <CodeOutlined style={{ marginRight: '8px', color: '#722ed1' }} />
                Project Submission
              </Text>
            }
            key="submission"
          >
            <Card
              size="small"
              style={{ borderRadius: '10px', background: '#f0fff0' }}
            >
              <Title level={5} style={{ marginBottom: '8px' }}>
                {team.submission.projectTitle || 'Untitled Project'}
              </Title>
              <Paragraph style={{ marginBottom: '12px', fontSize: '13px' }}>
                {team.submission.projectDescription}
              </Paragraph>
              {team.submission.techStack?.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <Space wrap size={[4, 4]}>
                    {team.submission.techStack.map((tech, i) => (
                      <Tag key={i} color="geekblue">{tech}</Tag>
                    ))}
                  </Space>
                </div>
              )}
              {team.submission.githubRepo && (
                <Button
                  type="primary"
                  icon={<GithubOutlined />}
                  size="small"
                  href={team.submission.githubRepo}
                  target="_blank"
                  style={{ background: '#24292e', border: 'none' }}
                >
                  GitHub
                </Button>
              )}
            </Card>
          </Panel>
        )}
      </Collapse>
    </Card>
  );

  // Teams Tab
  const TeamsTab = ({ teams }) => {
    if (!teams || teams.length === 0) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No teams mentored in this hackathon"
        />
      );
    }

    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          <Text strong style={{ fontSize: '16px' }}>
            <TeamOutlined style={{ marginRight: '8px', color: '#667eea' }} />
            Teams You Mentored ({teams.length})
          </Text>
        </div>
        {teams.map((team, index) => (
          <TeamCard key={team._id || index} team={team} index={index} />
        ))}
      </div>
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
            <div style={{
              background: `linear-gradient(135deg, ${
                dayIndex % 3 === 0 ? '#667eea, #764ba2' :
                dayIndex % 3 === 1 ? '#11998e, #38ef7d' :
                '#f093fb, #f5576c'
              })`,
              padding: '16px 24px',
              margin: '-24px -24px 20px -24px',
            }}>
              <Title level={4} style={{ color: 'white', margin: 0 }}>
                <CalendarOutlined style={{ marginRight: '10px' }} />
                {dayItem.day}
              </Title>
            </div>

            <Timeline mode="left">
              {dayItem.sessions?.map((session, sessionIndex) => (
                <Timeline.Item
                  key={sessionIndex}
                  color="#667eea"
                  dot={<ClockCircleOutlined style={{ fontSize: '16px', color: '#667eea' }} />}
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
                        <Text strong style={{ fontSize: '14px' }}>{session.session}</Text>
                      </Col>
                      <Col>
                        <Tag color="blue" icon={<ClockCircleOutlined />}>{session.time}</Tag>
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

  // Problem Statements Tab
  const ProblemStatementsTab = ({ problemStatements }) => {
    if (!problemStatements || problemStatements.length === 0) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No problem statements available"
        />
      );
    }

    // Group by domain
    const groupedByDomain = problemStatements.reduce((acc, ps) => {
      if (!acc[ps.domain]) acc[ps.domain] = [];
      acc[ps.domain].push(ps);
      return acc;
    }, {});

    return (
      <div>
        {Object.entries(groupedByDomain).map(([domain, problems], idx) => (
          <Card
            key={domain}
            style={{
              borderRadius: '16px',
              marginBottom: '16px',
              overflow: 'hidden',
              border: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{
              background: `linear-gradient(135deg, ${
                idx % 4 === 0 ? '#667eea, #764ba2' :
                idx % 4 === 1 ? '#11998e, #38ef7d' :
                idx % 4 === 2 ? '#f093fb, #f5576c' :
                '#4facfe, #00f2fe'
              })`,
              padding: '16px 24px',
              margin: '-24px -24px 20px -24px',
            }}>
              <Title level={4} style={{ color: 'white', margin: 0 }}>
                <BulbOutlined style={{ marginRight: '10px' }} />
                {domain}
              </Title>
              <Text style={{ color: 'rgba(255,255,255,0.9)' }}>
                {problems.length} Problem{problems.length > 1 ? 's' : ''}
              </Text>
            </div>

            <List
              itemLayout="vertical"
              dataSource={problems}
              renderItem={(item, index) => (
                <List.Item style={{ padding: '12px 0', borderBottom: index < problems.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <Title level={5} style={{ marginBottom: '4px' }}>{item.title}</Title>
                  <Paragraph type="secondary" style={{ marginBottom: 0, fontSize: '13px' }}>
                    {item.description}
                  </Paragraph>
                </List.Item>
              )}
            />
          </Card>
        ))}
      </div>
    );
  };

  // All Teams Progress Tab
  const AllTeamsProgressTab = ({ allTeamsProgress }) => {
    if (!allTeamsProgress || allTeamsProgress.length === 0) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No teams progress data available"
        />
      );
    }

    // Sort by progress percentage (descending)
    const sortedTeams = [...allTeamsProgress].sort((a, b) => 
      (b.progress?.percentage || 0) - (a.progress?.percentage || 0)
    );

    const columns = [
      {
        title: 'Rank',
        key: 'rank',
        width: 60,
        render: (_, __, index) => (
          <Avatar
            size={28}
            style={{
              background: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#e8e8e8',
              color: index < 3 ? '#333' : '#666',
              fontWeight: 600,
            }}
          >
            {index + 1}
          </Avatar>
        ),
      },
      {
        title: 'Team',
        dataIndex: 'name',
        key: 'name',
        render: (name, record) => (
          <Space direction="vertical" size={0}>
            <Space>
              <Text strong>{name}</Text>
              {record.isMentoredByMe && (
                <Tag color="blue" style={{ fontSize: '10px' }}>My Team</Tag>
              )}
            </Space>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Lead: {record.teamLead || 'N/A'} • {record.memberCount} members
            </Text>
          </Space>
        ),
      },
      {
        title: 'Mentor',
        dataIndex: 'mentorName',
        key: 'mentorName',
        render: (mentor) => <Text>{mentor}</Text>,
      },
      {
        title: 'Progress',
        key: 'progress',
        width: 200,
        render: (_, record) => (
          <div>
            <Progress
              percent={record.progress?.percentage || 0}
              size="small"
              strokeColor={{
                '0%': '#667eea',
                '100%': '#764ba2',
              }}
            />
            <Tag 
              color={
                record.progress?.status === 'Completed' ? 'success' :
                record.progress?.status === 'In Progress' ? 'processing' : 'default'
              }
              style={{ marginTop: '4px', fontSize: '11px' }}
            >
              {record.progress?.status || 'Not Started'}
            </Tag>
          </div>
        ),
      },
    ];

    // Calculate summary stats
    const completedCount = sortedTeams.filter(t => t.progress?.status === 'Completed').length;
    const inProgressCount = sortedTeams.filter(t => t.progress?.status === 'In Progress').length;
    const notStartedCount = sortedTeams.filter(t => t.progress?.status === 'Not Started' || !t.progress?.status).length;
    const avgProgress = sortedTeams.length > 0 
      ? Math.round(sortedTeams.reduce((sum, t) => sum + (t.progress?.percentage || 0), 0) / sortedTeams.length)
      : 0;

    return (
      <div>
        {/* Summary Stats */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={12} sm={6}>
            <Card style={{ borderRadius: '12px', textAlign: 'center', background: '#f0f5ff' }}>
              <Statistic 
                title={<Text type="secondary" style={{ fontSize: '12px' }}>Total Teams</Text>}
                value={sortedTeams.length} 
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card style={{ borderRadius: '12px', textAlign: 'center', background: '#f6ffed' }}>
              <Statistic 
                title={<Text type="secondary" style={{ fontSize: '12px' }}>Completed</Text>}
                value={completedCount} 
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card style={{ borderRadius: '12px', textAlign: 'center', background: '#e6f7ff' }}>
              <Statistic 
                title={<Text type="secondary" style={{ fontSize: '12px' }}>In Progress</Text>}
                value={inProgressCount} 
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card style={{ borderRadius: '12px', textAlign: 'center', background: '#fff7e6' }}>
              <Statistic 
                title={<Text type="secondary" style={{ fontSize: '12px' }}>Avg Progress</Text>}
                value={avgProgress} 
                suffix="%" 
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Teams Table */}
        <Card style={{ borderRadius: '12px' }}>
          <Table
            dataSource={sortedTeams}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
            rowClassName={(record) => record.isMentoredByMe ? 'my-team-row' : ''}
          />
        </Card>

        <style>{`
          .my-team-row {
            background-color: #f0f5ff !important;
          }
          .my-team-row:hover td {
            background-color: #e6f0ff !important;
          }
        `}</style>
      </div>
    );
  };

  // All Submissions Tab
  const AllSubmissionsTab = ({ allSubmissions }) => {
    if (!allSubmissions || allSubmissions.length === 0) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No submissions available"
        />
      );
    }

    // Sort by score (descending)
    const sortedSubmissions = [...allSubmissions].sort((a, b) => (b.score || 0) - (a.score || 0));

    const columns = [
      {
        title: 'Rank',
        key: 'rank',
        width: 60,
        render: (_, __, index) => (
          <Avatar
            size={28}
            style={{
              background: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#e8e8e8',
              color: index < 3 ? '#333' : '#666',
              fontWeight: 600,
            }}
          >
            {index + 1}
          </Avatar>
        ),
      },
      {
        title: 'Team',
        key: 'team',
        render: (_, record) => (
          <Space direction="vertical" size={0}>
            <Space>
              <Text strong>{record.teamName}</Text>
              {record.isMentoredByMe && (
                <Tag color="blue" style={{ fontSize: '10px' }}>My Team</Tag>
              )}
            </Space>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Lead: {record.teamLead || 'N/A'}
            </Text>
          </Space>
        ),
      },
      {
        title: 'Problem',
        dataIndex: 'problemTitle',
        key: 'problemTitle',
        ellipsis: true,
        render: (title) => (
          <Tooltip title={title}>
            <Text>{title}</Text>
          </Tooltip>
        ),
      },
      {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
        width: 100,
        render: (score) => (
          <Tag 
            color={score >= 80 ? 'green' : score >= 60 ? 'blue' : score >= 40 ? 'orange' : 'default'}
            style={{ fontSize: '14px', padding: '4px 12px' }}
          >
            {score || 0}/100
          </Tag>
        ),
      },
      {
        title: 'Links',
        key: 'links',
        width: 120,
        render: (_, record) => (
          <Space>
            {record.githubRepo && (
              <Tooltip title="GitHub Repo">
                <Button 
                  type="text" 
                  icon={<GithubOutlined />} 
                  href={record.githubRepo}
                  target="_blank"
                  size="small"
                />
              </Tooltip>
            )}
            {record.liveDemoLink && (
              <Tooltip title="Live Demo">
                <Button 
                  type="text" 
                  icon={<LinkOutlined />} 
                  href={record.liveDemoLink}
                  target="_blank"
                  size="small"
                />
              </Tooltip>
            )}
          </Space>
        ),
      },
      {
        title: 'Submitted',
        dataIndex: 'submittedAt',
        key: 'submittedAt',
        render: (date) => formatDate(date),
      },
    ];

    // Calculate summary stats
    const avgScore = sortedSubmissions.length > 0 
      ? Math.round(sortedSubmissions.reduce((sum, s) => sum + (s.score || 0), 0) / sortedSubmissions.length)
      : 0;
    const topScore = sortedSubmissions.length > 0 ? (sortedSubmissions[0]?.score || 0) : 0;
    const myTeamSubmissions = sortedSubmissions.filter(s => s.isMentoredByMe);

    return (
      <div>
        {/* Summary Stats */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={12} sm={6}>
            <Card style={{ borderRadius: '12px', textAlign: 'center', background: '#f0f5ff' }}>
              <Statistic 
                title={<Text type="secondary" style={{ fontSize: '12px' }}>Total Submissions</Text>}
                value={sortedSubmissions.length} 
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card style={{ borderRadius: '12px', textAlign: 'center', background: '#f6ffed' }}>
              <Statistic 
                title={<Text type="secondary" style={{ fontSize: '12px' }}>Top Score</Text>}
                value={topScore} 
                suffix="/100"
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card style={{ borderRadius: '12px', textAlign: 'center', background: '#fff7e6' }}>
              <Statistic 
                title={<Text type="secondary" style={{ fontSize: '12px' }}>Average Score</Text>}
                value={avgScore} 
                suffix="/100"
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card style={{ borderRadius: '12px', textAlign: 'center', background: '#f9f0ff' }}>
              <Statistic 
                title={<Text type="secondary" style={{ fontSize: '12px' }}>My Teams</Text>}
                value={myTeamSubmissions.length} 
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Submissions Table */}
        <Card style={{ borderRadius: '12px' }}>
          <Table
            dataSource={sortedSubmissions}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
            rowClassName={(record) => record.isMentoredByMe ? 'my-team-row' : ''}
            expandable={{
              expandedRowRender: (record) => (
                <div style={{ padding: '16px', background: '#fafafa', borderRadius: '8px' }}>
                  <Title level={5} style={{ marginBottom: '8px' }}>Project Description</Title>
                  <Paragraph style={{ marginBottom: 0 }}>{record.projectDescription}</Paragraph>
                </div>
              ),
            }}
          />
        </Card>
      </div>
    );
  };

  // Evaluation/Feedback Tab
  const EvaluationTab = ({ evaluation }) => {
    if (!evaluation || evaluation.totalFeedbacks === 0) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No feedback received for this hackathon"
        />
      );
    }

    return (
      <div>
        {/* Overall Rating Card */}
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
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '32px',
            margin: '-24px -24px 24px -24px',
            textAlign: 'center',
          }}>
            <Title level={2} style={{ color: 'white', margin: 0 }}>
              {evaluation.averageRating}
            </Title>
            <Rate 
              disabled 
              allowHalf 
              value={parseFloat(evaluation.averageRating)} 
              style={{ color: '#ffd700', fontSize: '24px' }}
            />
            <Text style={{ color: 'rgba(255,255,255,0.9)', display: 'block', marginTop: '8px' }}>
              Based on {evaluation.totalFeedbacks} feedback{evaluation.totalFeedbacks > 1 ? 's' : ''}
            </Text>
          </div>

          <Row gutter={[16, 16]}>
            <Col xs={12}>
              <Card style={{ borderRadius: '10px', background: '#f6ffed', textAlign: 'center' }}>
                <Statistic
                  title="Total Feedbacks"
                  value={evaluation.totalFeedbacks}
                  prefix={<CommentOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={12}>
              <Card style={{ borderRadius: '10px', background: '#fff7e6', textAlign: 'center' }}>
                <Statistic
                  title="Average Rating"
                  value={evaluation.averageRating}
                  suffix="/ 5"
                  prefix={<StarOutlined />}
                  valueStyle={{ color: '#fa8c16' }}
                />
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Individual Feedbacks */}
        <Title level={5} style={{ marginBottom: '16px' }}>
          <CommentOutlined style={{ marginRight: '8px', color: '#667eea' }} />
          Student Feedbacks
        </Title>

        <List
          itemLayout="vertical"
          dataSource={evaluation.feedbacks}
          renderItem={(item, index) => (
            <Card
              key={index}
              style={{
                borderRadius: '12px',
                marginBottom: '16px',
                border: '1px solid #f0f0f0',
              }}
            >
              <Row align="middle" gutter={16}>
                <Col>
                  <Avatar
                    size={48}
                    icon={<UserOutlined />}
                    style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                  />
                </Col>
                <Col flex="auto">
                  <Space direction="vertical" size={0}>
                    <Text strong>{item.studentName}</Text>
                    {item.studentRollNo && (
                      <Text type="secondary" style={{ fontSize: '12px' }}>{item.studentRollNo}</Text>
                    )}
                  </Space>
                </Col>
                <Col>
                  <Rate disabled value={item.rating} style={{ fontSize: '16px' }} />
                </Col>
              </Row>
              {item.feedback && (
                <div style={{ 
                  marginTop: '16px', 
                  padding: '12px', 
                  background: '#f9f9f9', 
                  borderRadius: '8px',
                  borderLeft: '4px solid #667eea'
                }}>
                  <Paragraph style={{ marginBottom: 0, fontStyle: 'italic' }}>
                    "{item.feedback}"
                  </Paragraph>
                </div>
              )}
              <Text type="secondary" style={{ fontSize: '12px', marginTop: '8px', display: 'block' }}>
                <ClockCircleOutlined style={{ marginRight: '4px' }} />
                {formatDate(item.date)}
              </Text>
            </Card>
          )}
        />
      </div>
    );
  };

  // Hackathon Overview Component
  const HackathonOverview = ({ hackathon, teamsCount }) => {
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
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          padding: '32px',
          margin: '-24px -24px 24px -24px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(102, 126, 234, 0.2)',
          }} />

          <Row align="middle" gutter={[24, 16]} wrap>
            <Col>
              <Avatar
                size={80}
                icon={<TrophyOutlined />}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                  <Tag style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }}>
                    {hackathon.year}
                  </Tag>
                )}
                <Tag color="blue" icon={<TeamOutlined />}>
                  {teamsCount} Teams Mentored
                </Tag>
              </Space>
            </Col>
          </Row>
        </div>

        <Descriptions column={{ xs: 1, sm: 2, md: 3 }} size="middle">
          <Descriptions.Item label={<><CalendarOutlined style={{ marginRight: '6px' }} />Start Date</>}>
            {formatDate(hackathon.startDate)}
          </Descriptions.Item>
          <Descriptions.Item label={<><CalendarOutlined style={{ marginRight: '6px' }} />End Date</>}>
            {formatDate(hackathon.endDate)}
          </Descriptions.Item>
          {hackathon.college && (
            <Descriptions.Item label={<><BookOutlined style={{ marginRight: '6px' }} />College</>}>
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
      maxWidth: '1400px',
      margin: '0 auto',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
    }}>
      {/* Page Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '24px',
        boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
        textAlign: 'center',
      }}>
        <Title level={2} style={{
          color: 'white',
          margin: 0,
          fontSize: '28px',
          fontWeight: 700,
        }}>
          <SolutionOutlined style={{ marginRight: '12px' }} />
          My Mentoring Journey
        </Title>
        <Text style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '15px',
          display: 'block',
          marginTop: '8px',
        }}>
          View your hackathon mentoring history, teams, and achievements
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
                    Your hackathon mentoring history will appear here once you've completed hackathons as a mentor.
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
                <HackathonOverview 
                  hackathon={selectedHackathonData.hackathon} 
                  teamsCount={selectedHackathonData.teamsCount}
                />

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
                    defaultActiveKey="teams"
                    tabBarStyle={{
                      padding: '16px 24px 0 24px',
                      marginBottom: 0,
                      background: '#fafafa',
                      borderRadius: '16px 16px 0 0',
                    }}
                    size="large"
                    items={[
                      {
                        key: 'teams',
                        label: (
                          <span>
                            <TeamOutlined />
                            My Teams
                          </span>
                        ),
                        children: (
                          <div style={{ padding: '24px' }}>
                            <TeamsTab teams={selectedHackathonData.teams} />
                          </div>
                        ),
                      },
                      {
                        key: 'allProgress',
                        label: (
                          <span>
                            <BarChartOutlined />
                            All Teams Progress
                          </span>
                        ),
                        children: (
                          <div style={{ padding: '24px' }}>
                            <AllTeamsProgressTab allTeamsProgress={selectedHackathonData.allTeamsProgress} />
                          </div>
                        ),
                      },
                      {
                        key: 'allSubmissions',
                        label: (
                          <span>
                            <FileSearchOutlined />
                            All Submissions
                          </span>
                        ),
                        children: (
                          <div style={{ padding: '24px' }}>
                            <AllSubmissionsTab allSubmissions={selectedHackathonData.allSubmissions} />
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
                        key: 'problems',
                        label: (
                          <span>
                            <BulbOutlined />
                            Problems
                          </span>
                        ),
                        children: (
                          <div style={{ padding: '24px' }}>
                            <ProblemStatementsTab problemStatements={selectedHackathonData.problemStatements} />
                          </div>
                        ),
                      },
                      {
                        key: 'evaluation',
                        label: (
                          <span>
                            <CommentOutlined />
                            Evaluation
                          </span>
                        ),
                        children: (
                          <div style={{ padding: '24px' }}>
                            <EvaluationTab evaluation={selectedHackathonData.evaluation} />
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

export default MentorHackathonHistory;
