import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageHeader from '../layout/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const CogIcon = (props) => <FontAwesomeIcon icon={faCog} className="text-primary" {...props} />;

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: 'Employee Management System',
    companyEmail: 'admin@ems.com',
    defaultVacationDays: 20,
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    theme: 'light',
    notifications: {
      emailNotifications: true,
      newEmployeeAlerts: true,
      salaryUpdateAlerts: false,
      systemMaintenance: true
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'weekly',
      retentionPeriod: '30'
    }
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would typically save to backend
    toast.success('Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default values
      setSettings({
        companyName: 'Employee Management System',
        companyEmail: 'admin@ems.com',
        defaultVacationDays: 20,
        currency: 'USD',
        dateFormat: 'MM/DD/YYYY',
        theme: 'light',
        notifications: {
          emailNotifications: true,
          newEmployeeAlerts: true,
          salaryUpdateAlerts: false,
          systemMaintenance: true
        },
        backup: {
          autoBackup: true,
          backupFrequency: 'weekly',
          retentionPeriod: '30'
        }
      });
      toast.info('Settings reset to default values');
    }
  };

  return (
    <div className="container mt-4">
      <PageHeader
        icon={CogIcon}
        title="System Settings"
        subtitle="Configure your Employee Management System"
      />

      <form onSubmit={handleSave}>
        <div className="row">
          {/* General Settings */}
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-cog me-2"></i>General Settings
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="companyName" className="form-label">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyName"
                    name="companyName"
                    value={settings.companyName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="companyEmail" className="form-label">Company Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="companyEmail"
                    name="companyEmail"
                    value={settings.companyEmail}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="defaultVacationDays" className="form-label">Default Vacation Days</label>
                  <input
                    type="number"
                    className="form-control"
                    id="defaultVacationDays"
                    name="defaultVacationDays"
                    value={settings.defaultVacationDays}
                    onChange={handleInputChange}
                    min="0"
                    max="365"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="currency" className="form-label">Currency</label>
                  <select
                    className="form-select"
                    id="currency"
                    name="currency"
                    value={settings.currency}
                    onChange={handleInputChange}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="dateFormat" className="form-label">Date Format</label>
                  <select
                    className="form-select"
                    id="dateFormat"
                    name="dateFormat"
                    value={settings.dateFormat}
                    onChange={handleInputChange}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="theme" className="form-label">Theme</label>
                  <select
                    className="form-select"
                    id="theme"
                    name="theme"
                    value={settings.theme}
                    onChange={handleInputChange}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-bell me-2"></i>Notification Settings
                </h5>
              </div>
              <div className="card-body">
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="emailNotifications"
                    name="notifications.emailNotifications"
                    checked={settings.notifications.emailNotifications}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="emailNotifications">
                    Email Notifications
                  </label>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="newEmployeeAlerts"
                    name="notifications.newEmployeeAlerts"
                    checked={settings.notifications.newEmployeeAlerts}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="newEmployeeAlerts">
                    New Employee Alerts
                  </label>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="salaryUpdateAlerts"
                    name="notifications.salaryUpdateAlerts"
                    checked={settings.notifications.salaryUpdateAlerts}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="salaryUpdateAlerts">
                    Salary Update Alerts
                  </label>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="systemMaintenance"
                    name="notifications.systemMaintenance"
                    checked={settings.notifications.systemMaintenance}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="systemMaintenance">
                    System Maintenance Notifications
                  </label>
                </div>
              </div>
            </div>

            {/* Backup Settings */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-database me-2"></i>Backup Settings
                </h5>
              </div>
              <div className="card-body">
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="autoBackup"
                    name="backup.autoBackup"
                    checked={settings.backup.autoBackup}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="autoBackup">
                    Enable Automatic Backup
                  </label>
                </div>

                <div className="mb-3">
                  <label htmlFor="backupFrequency" className="form-label">Backup Frequency</label>
                  <select
                    className="form-select"
                    id="backupFrequency"
                    name="backup.backupFrequency"
                    value={settings.backup.backupFrequency}
                    onChange={handleInputChange}
                    disabled={!settings.backup.autoBackup}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="retentionPeriod" className="form-label">Retention Period (days)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="retentionPeriod"
                    name="backup.retentionPeriod"
                    value={settings.backup.retentionPeriod}
                    onChange={handleInputChange}
                    min="1"
                    max="365"
                    disabled={!settings.backup.autoBackup}
                  />
                </div>

                <button type="button" className="btn btn-outline-info w-100">
                  <i className="fas fa-download me-2"></i>Create Manual Backup
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <button type="submit" className="btn btn-outline-primary px-4 me-2">
                  <i className="fas fa-save me-2"></i>Save Settings
                </button>
                <button type="button" className="btn btn-outline-secondary px-4" onClick={handleReset}>
                  <i className="fas fa-undo me-2"></i>Reset to Default
                </button>
              </div>
              <div>
                <button type="button" className="btn btn-outline-warning px-4 me-2">
                  <i className="fas fa-file-export me-2"></i>Export Settings
                </button>
                <button type="button" className="btn btn-outline-info px-4">
                  <i className="fas fa-file-import me-2"></i>Import Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;