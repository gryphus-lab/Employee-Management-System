// src/pages/EmployeePage.js
import React from 'react';
import { PlusCircle } from 'react-bootstrap-icons';
import PageHeader from '../components/layout/PageHeader';
import EmployeeList from '../components/employee/EmployeeList';

export default function EmployeePage() {
  return (
    <>
      <PageHeader
        icon={PlusCircle}
        title="Employees"
        subtitle="View, edit or delete your team members below."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Employees' }              // no `to` on last crumb => current page
        ]}
        actions={[
          { label: 'Add Employee', to: '/employees/add', variant: 'primary' }
        ]}
      />

      {/* the actual table + search */}
      <EmployeeList />
    </>
  );
}
