import { useState } from 'react';
import { Card, CardHeader, CardContent, Button } from '@micro-frontend/ui';
import { useThemeStore } from '@micro-frontend/store';
import './App.css';

interface Report {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'processing';
}

function App() {
  const { theme, toggleTheme } = useThemeStore();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'pending'>(
    'all'
  );

  const reports: Report[] = [
    {
      id: '1',
      title: 'Monthly Sales Report',
      description: 'Comprehensive analysis of sales performance for the month',
      date: '2024-01-15',
      status: 'completed',
    },
    {
      id: '2',
      title: 'User Engagement Analytics',
      description: 'Detailed metrics on user engagement and activity',
      date: '2024-01-14',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Revenue Forecast Q1',
      description: 'Revenue projections for the first quarter',
      date: '2024-01-13',
      status: 'processing',
    },
    {
      id: '4',
      title: 'Customer Satisfaction Survey',
      description: 'Results from the latest customer satisfaction survey',
      date: '2024-01-12',
      status: 'pending',
    },
  ];

  const filteredReports = reports.filter((report) => {
    if (selectedFilter === 'all') return true;
    return report.status === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'processing':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="app" data-theme={theme}>
      <header className="header">
        <div className="container">
          <h1 className="logo">Reports</h1>
          <Button variant="outline" size="small" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </Button>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="page-header">
            <div>
              <h2>Reports & Analytics</h2>
              <p className="page-description">
                View and manage all your business reports
              </p>
            </div>
            <Button variant="primary">Generate New Report</Button>
          </div>

          <div className="filter-bar">
            <div className="filter-buttons">
              <Button
                variant={selectedFilter === 'all' ? 'primary' : 'outline'}
                size="small"
                onClick={() => setSelectedFilter('all')}
              >
                All
              </Button>
              <Button
                variant={selectedFilter === 'completed' ? 'primary' : 'outline'}
                size="small"
                onClick={() => setSelectedFilter('completed')}
              >
                Completed
              </Button>
              <Button
                variant={selectedFilter === 'pending' ? 'primary' : 'outline'}
                size="small"
                onClick={() => setSelectedFilter('pending')}
              >
                Pending
              </Button>
            </div>
          </div>

          <div className="reports-grid">
            {filteredReports.map((report) => (
              <Card key={report.id} variant="elevated">
                <CardHeader>
                  <div className="report-header">
                    <h3 className="report-title">{report.title}</h3>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(report.status) }}
                    >
                      {report.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="report-description">{report.description}</p>
                  <p className="report-date">
                    Generated on {new Date(report.date).toLocaleDateString()}
                  </p>
                  <div className="report-actions">
                    <Button size="small" variant="outline">
                      View
                    </Button>
                    <Button size="small" variant="outline">
                      Download
                    </Button>
                    <Button size="small" variant="outline">
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="empty-state">
              <p>No reports found matching your filter.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
