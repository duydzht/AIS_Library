import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFilterForm.propTypes = {
    onSubmit: PropTypes.func,
};

PostFilterForm.defaultProps = {
    onSubmit: null,
};

function PostFilterForm(props) {
    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null);

    const HandleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (!onSubmit) return;

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        // đợi gõ xong rồi mới submit
        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value,
            };
            onSubmit(formValues);
        }, 500);

    };

    return (
        <form className='col-6 col-lg-3 mt-3'>
            <input
                type='text'
                value={searchTerm}
                onChange={HandleSearchChange}
            />
        </form>
    );
}

export default PostFilterForm;
