import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import classNames from 'classnames';

export default function save({ attributes }) {
    const { blockStyle, heightType, columns, gaps, showArrows, showPagination, loop, autoplay, delay, navType } = attributes;

    const options = {
        loop,
        autoplay: autoplay ? { delay: delay || 3000 } : false,
        columns,
        gaps
    };

    return (
        <div
            {...useBlockProps.save({
                style: blockStyle,
                className: classNames({
                    fixed: heightType === 'fixed',
                    outside: navType === 'outside'
                })
            })}
            data-options={JSON.stringify(options)}
        >
            <div className="swiper">
                <div className="swiper-wrapper">
                    <InnerBlocks.Content />
                </div>
            </div>
            {showArrows && (
                <div className="swiper-navigation">
                    <div className="swiper-custom-prev gu-nav">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                fill="currentColor"
                                d="M7 239c-9.4 9.4-9.4 24.6 0 33.9L175 441c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L81.9 280 488 280c13.3 0 24-10.7 24-24s-10.7-24-24-24L81.9 232 209 105c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L7 239z"
                            ></path>
                        </svg>
                    </div>
                    <div className="swiper-custom-next gu-nav">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                fill="currentColor"
                                d="M505 273c9.4-9.4 9.4-24.6 0-33.9L337 71c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l127 127-406.1 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l406.1 0-127 127c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0L505 273z"
                            ></path>
                        </svg>
                    </div>
                </div>
            )}
            {showPagination && <div className="swiper-pagination"></div>}
        </div>
    );
}
