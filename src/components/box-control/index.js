import { BoxControl } from '@wordpress/components';

const NativeBoxControl = ({ label, value, onChange, allowReset = false }) => {
    return (
        <div className="native-control-wrapper">
            <BoxControl label={label} values={value} onChange={v => onChange(v)} allowReset={allowReset} />
        </div>
    );
};

export default NativeBoxControl;
