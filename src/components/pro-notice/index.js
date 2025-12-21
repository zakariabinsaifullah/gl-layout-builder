import { __experimentalText as Text, ExternalLink } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const NativeProNotice = () => {
    return (
        <div className="native-pro-notice">
            <Text isBlock size="15rem" lineHeight="1.6" weight="500">
                {__('Native Table Resources', 'native-table')}
            </Text>
            <ExternalLink href="https://wpnativeblocks.com/table-builder/pricing">
                {__('Get Native Table Pro', 'native-table')}
            </ExternalLink>
            <ExternalLink href="https://wpnativeblocks.com/table-builder/demos">{__('Explore Demos', 'native-table')}</ExternalLink>
            <ExternalLink href="https://wpnativeblocks.com/table-builder/vidoes">{__('Tutorial Videos', 'native-table')}</ExternalLink>
            <ExternalLink href="https://wpnativeblocks.com/table-builder/blog">{__('Blog Posts', 'native-table')}</ExternalLink>
        </div>
    );
};

export default NativeProNotice;
