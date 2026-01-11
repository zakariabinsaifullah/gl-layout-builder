import { Icon } from '@wordpress/icons';
import { icons, getIconByName } from '../utils/icons';

export const RenderIcon = ({ customSvgCode, iconName, size = '24' }) => {
    const renderCurrentIcon = (size = '24') => {
        if (customSvgCode) {
            return (
                <div
                    className="gutenlayouts-custom-svg-container"
                    style={{
                        width: size + 'px',
                        height: size + 'px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    dangerouslySetInnerHTML={{ __html: customSvgCode }}
                />
            );
        }

        if (iconName) {
            const selectedIcon = getIconByName(iconName);
            if (selectedIcon) {
                return <Icon icon={selectedIcon.icon} size={size} />;
            }
        }

        return <Icon icon={icons[0].icon} size={size} />;
    };

    return renderCurrentIcon(size);
};
