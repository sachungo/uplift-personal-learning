import React from 'react';
import { Toast, Box } from 'gestalt';

export default ({ message, show }) => (
  show && (
    <Box
      dangerouslySetInlineStyle={{
        __style: {
          bottom: 200,
          left: '50%',
          transform: 'translateX(-50%)'
        }
      }}
      position="fixed"
    >
      <Toast color="orange" text={message} />
    </Box>
  )
);
