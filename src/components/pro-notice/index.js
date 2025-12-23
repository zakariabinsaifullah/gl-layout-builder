import { __experimentalText as Text, ExternalLink } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const NativeProNotice = () => {
    return (
        <div className="native-pro-notice">
            <Text isBlock size="15rem" lineHeight="1.6" weight="500">
                {__('Native Table Resources', 'gutenlayouts')}
            </Text>
            <ExternalLink href="https://wpnativeblocks.com/table-builder/pricing">
                {__('Get Native Table Pro', 'gutenlayouts')}
            </ExternalLink>
            <ExternalLink href="https://wpnativeblocks.com/table-builder/demos">{__('Explore Demos', 'gutenlayouts')}</ExternalLink>
            <ExternalLink href="https://wpnativeblocks.com/table-builder/vidoes">{__('Tutorial Videos', 'gutenlayouts')}</ExternalLink>
            <ExternalLink href="https://wpnativeblocks.com/table-builder/blog">{__('Blog Posts', 'gutenlayouts')}</ExternalLink>
        </div>
    );
};

export default NativeProNotice;
