import React from 'react';

interface ErrorBoxProps {
    msg: string | null | undefined;
}

const ErrorBox: React.FC<ErrorBoxProps> = (props) => {
    // Only show error box if there's a non-empty error message
    if (!props.msg || (typeof props.msg === 'string' && props.msg.trim() === '')) {
        return null;
    }

    // Log error to console for debugging
    if (props.msg) {
        console.error('ErrorBox:', props.msg);
    }

    return (
        <div className="alert alert-danger" role="alert">
            {
                typeof props.msg === 'string' ?
                    props.msg
                    : 'Unexpected error'
            }
        </div>
    );
};

export default ErrorBox;
