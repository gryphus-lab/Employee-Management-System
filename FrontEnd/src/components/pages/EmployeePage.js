// src/pages/EmployeePage.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import PageHeader from '../layout/PageHeader';
import EmployeeList from '../employee/EmployeeList';

const UsersIcon = (props) => <FontAwesomeIcon icon={faUsers} className="text-primary" {...props} />;

export default function EmployeePage() {
  return (
    <>
      <PageHeader
        icon={UsersIcon}
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
