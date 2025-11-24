import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import LeaveManager from './components/LeaveManager';
import Assistant from './components/Assistant';
import { Employee, LeaveRequest, ViewState } from './types';
import { dataService } from './services/dataService';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    // Parallel fetching
    const [empData, leaveData] = await Promise.all([
      dataService.getEmployees(),
      dataService.getLeaves()
    ]);
    setEmployees(empData);
    setLeaves(leaveData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
        </div>
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard employees={employees} leaves={leaves} />;
      case 'employees':
        return <EmployeeList employees={employees} refreshData={loadData} />;
      case 'leaves':
        return <LeaveManager leaves={leaves} employees={employees} refreshData={loadData} />;
      case 'assistant':
        return <Assistant employees={employees} leaves={leaves} />;
      default:
        return <Dashboard employees={employees} leaves={leaves} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
}

export default App;