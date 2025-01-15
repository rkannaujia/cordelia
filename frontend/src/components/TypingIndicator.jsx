import React from 'react';
import { Whisper, Tooltip } from 'rsuite';

const TypingIndicator = ({ isTyping }) => {
    return isTyping ? (
        <Whisper
            trigger="hover"
            speaker={<Tooltip>Typing...</Tooltip>}
            placement="top"
        >
            <p>...</p>
        </Whisper>
    ) : null;
};

export default TypingIndicator;
