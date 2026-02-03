/**
 * WordPress Dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { RenderIcon } from '../../helpers';

// iframeUrl function
const iframeUrl = props => {
    const { attributes } = props;
    const { contentType, youtubeUrl, vimeoUrl } = attributes;

    let videoUrl = '';

    function get_youtube_video_id(url) {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    }

    function get_vimeo_video_id(url) {
        if (!url) return null;
        const regExp = /https?:\/\/(?:www\.)?vimeo.com\/(\d+)/;
        const match = url.match(regExp);
        return match && match[1] ? match[1] : null;
    }

    // YouTube video embed url
    if (contentType === 'youtube' && youtubeUrl) {
        const youtubeVideoId = get_youtube_video_id(youtubeUrl);
        if (youtubeVideoId !== null) {
            videoUrl = `https://www.youtube.com/embed/${youtubeVideoId}`;
        }
    }

    // Vimeo video embed url
    if (contentType === 'vimeo' && vimeoUrl) {
        const vimeoVideoId = get_vimeo_video_id(vimeoUrl);
        if (vimeoVideoId !== null) {
            videoUrl = `https://player.vimeo.com/video/${vimeoVideoId}`;
        }
    }

    return videoUrl;
};

// block save function
const Save = props => {
    const { attributes } = props;
    const { blockStyle, contentCaption, showPosterIcon, uniqueId, customSvgCode, iconName, iconSize, contentType } = attributes;

    const actualUniqueId = uniqueId || 'lightbox-default';

    const VideoURL = iframeUrl(props);

    const blockProps = useBlockProps.save({
        style: blockStyle
    });

    return (
        <div {...blockProps}>
            <a
                href={`#${actualUniqueId}`}
                className="gutenlayouts-play-btn gutenlayouts-lightbox-btn-1"
                data-fslightbox={actualUniqueId}
                data-caption={contentCaption}
            >
                {showPosterIcon && (
                    <span className="gutenlayouts-btn-icon">
                        <RenderIcon customSvgCode={customSvgCode} iconName={iconName} size={iconSize} />
                    </span>
                )}
            </a>
            <div id={`${uniqueId}`} className="gutenlayouts-lightbox-content">
                {VideoURL && (
                    <iframe
                        className={`${uniqueId} gutenlayouts-content-iframe`}
                        src={VideoURL}
                        allowFullScreen={true}
                        allow="autoplay; fullscreen"
                    />
                )}
                {contentType === 'content' && <InnerBlocks.Content />}
            </div>
        </div>
    );
};

export default Save;
