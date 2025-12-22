import { TextControl } from '@wordpress/components';

const NativeTextControl = ({ label, value, onChange, placeholder = '' }) => {
    return (
        <div className="native-control-wrapper">
            <TextControl
                label={label}
                value={value}
                placeholder={placeholder}
                onChange={v => onChange(v)}
                __next40pxDefaultSize
                __nextHasNoMarginBottom
            />
        </div>
    );
};

export default NativeTextControl;
