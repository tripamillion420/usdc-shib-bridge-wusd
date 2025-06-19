import React from 'react';

function StatusDisplay({ status }) {
  return (
    <div className="status-box">
      <h3>Status</h3>
      <p>{status || 'No recent actions'}</p>
    </div>
  );
}

export default StatusDisplay;
