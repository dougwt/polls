import React from 'react';
import requireAuth from '../requireAuth';

const PollEdit = () => {
  return <div>PollEdit</div>;
};

export default requireAuth(PollEdit);
