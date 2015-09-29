import React from 'react';

const InputGroup = (props) => {
	const { id, label, type, hint, value, readOnly, placeholder, onChange } = props;

	return (
		<fieldset>
            {label && <label htmlFor={id}>{label}</label>}
			<input id={id} type={type} defaultValue={value} readOnly={readOnly} placeholder={placeholder} onChange={onChange} />
			{hint && <p className="hint">{hint}</p>}
		</fieldset>
	);
};

InputGroup.propTypes = {
	type: React.PropTypes.string.isRequired,
	id: React.PropTypes.string,
	label: React.PropTypes.string,
	hint: React.PropTypes.string,
	value: React.PropTypes.string,
	readOnly: React.PropTypes.bool,
	placeholder: React.PropTypes.string,
	onChange: React.PropTypes.func,
};

InputGroup.defaultValue = {
	type: 'text',
};

export default InputGroup;
