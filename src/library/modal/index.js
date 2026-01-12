/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { Button, Spinner } from '@wordpress/components';
import { Modal } from '@wordpress/components';
import classnames from 'classnames';

const libCategories = [
    { slug: 'patterns', name: __('Patterns', 'gutenlayouts') },
    { slug: 'templates', name: __('Templates', 'gutenlayouts') }
];

/*
 * Internal dependencies
 */
import { usePatternsData, usePatternCategoriesData, usePageTemplatesData, useTemplateCategoriesData } from '../api';

const defaultApi = {
    importImage: async (imageUrl, title) => {
        const apiBase = window.wpApiSettings?.root ? `${window.wpApiSettings.root}gutenlayouts/v1` : '/wp-json/gutenlayouts/v1';
        const response = await fetch(`${apiBase}/import_image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': window.wpApiSettings?.nonce || ''
            },
            body: JSON.stringify({ imageUrl, title })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Import failed');
        return data;
    }
};

export const PatternLibraryModal = ({ isOpen, onClose, openPreferences }) => {
    const [activeTab, setActiveTab] = useState('patterns');
    const [view, setView] = useState({
        type: 'list',
        page: 1,
        perPage: 20,
        category: ''
    });

    const [importingId, setImportingId] = useState(null);

    // reset view on tab change
    useEffect(() => {
        setView({
            type: 'list',
            page: 1,
            perPage: 20,
            category: ''
        });
    }, [activeTab]);

    // Data hooks
    const {
        patterns,
        pagination: patternsPagination,
        loading: patternsLoading,
        error: patternsError,
        refetch: refetchPatterns
    } = usePatternsData({
        page: view.page,
        perPage: view.perPage,
        selectedCategory: view.category
    });

    const {
        pageTemplates,
        pagination: templatesPagination,
        loading: templatesLoading,
        error: templatesError,
        refetch: refetchTemplates
    } = usePageTemplatesData({
        page: view.page,
        perPage: view.perPage,
        selectedCategory: view.category
    });

    const { categories: patternCategories, refetch: refetchPatternCategories } = usePatternCategoriesData();
    const { categories: templateCategories, refetch: refetchTemplateCategories } = useTemplateCategoriesData();

    // Determine current data based on active tab
    const currentItems = activeTab === 'patterns' ? patterns : pageTemplates;
    const currentPagination = activeTab === 'patterns' ? patternsPagination : templatesPagination;
    const loading = activeTab === 'patterns' ? patternsLoading : templatesLoading;
    const error = activeTab === 'patterns' ? patternsError : templatesError;
    const currentCategories = activeTab === 'patterns' ? patternCategories : templateCategories;

    const totalPages = currentPagination?.totalPages || 0;
    const hasNext = view.page < totalPages;
    const hasPrev = view.page > 1;

    const onNext = () => {
        if (hasNext) setView({ ...view, page: view.page + 1 });
    };

    const onPrev = () => {
        if (hasPrev) setView({ ...view, page: view.page - 1 });
    };

    const onCategorySelect = categorySlug => {
        setView({ ...view, category: categorySlug, page: 1 });
    };

    const importPattern = async pattern => {
        setImportingId(pattern.id);

        try {
            // 1. Get parsed blocks
            let blocks = pattern.parsedBlocks;
            if (!blocks || blocks.length === 0) {
                const { parse } = await import('@wordpress/blocks');
                blocks = parse(pattern.content || '');
            }

            // 2. Clone blocks
            const clonedBlocks = JSON.parse(JSON.stringify(blocks));

            // 3. Find and import images
            const imageMap = new Map();
            const findImages = blocks => {
                blocks.forEach(block => {
                    if (block.attributes) {
                        Object.keys(block.attributes).forEach(key => {
                            const value = block.attributes[key];
                            // Relaxed regex to match images with query strings
                            if (
                                typeof value === 'string' &&
                                (value.match(/\.(jpeg|jpg|gif|png|webp)(\?.*)?$/i) || key === 'url' || key === 'src')
                            ) {
                                if (value.startsWith('http')) {
                                    imageMap.set(value, null);
                                }
                            }
                        });
                    }
                    if (block.innerBlocks && block.innerBlocks.length > 0) {
                        findImages(block.innerBlocks);
                    }
                });
            };

            findImages(clonedBlocks);

            // 4. Download images
            for (const [url] of imageMap) {
                try {
                    const imported = await defaultApi.importImage(url, pattern.title);
                    if (imported && imported.url) {
                        imageMap.set(url, { url: imported.url, id: imported.id });
                    }
                } catch (e) {
                    console.error(`Failed to import image ${url}:`, e);
                }
            }

            // 5. Replace URLs in blocks
            const replaceUrls = blocks => {
                blocks.forEach(block => {
                    if (block.attributes) {
                        Object.keys(block.attributes).forEach(key => {
                            const value = block.attributes[key];
                            if (imageMap.has(value)) {
                                const replacement = imageMap.get(value);
                                if (replacement) {
                                    block.attributes[key] = replacement.url;
                                    if (key === 'url') {
                                        block.attributes['id'] = replacement.id;
                                    }
                                }
                            }
                        });
                    }
                    if (block.innerBlocks) {
                        replaceUrls(block.innerBlocks);
                    }
                });
            };

            replaceUrls(clonedBlocks);

            // 6. Insert blocks
            const { insertBlocks } = window.wp.data.dispatch('core/block-editor');
            insertBlocks(clonedBlocks);

            onClose();
        } catch (error) {
            alert('Import failed: ' + error.message);
        } finally {
            setImportingId(null);
        }
    };

    const onFetchLatestData = async () => {
        // Trigger refetch for all data
        await Promise.all([refetchPatterns(), refetchTemplates(), refetchPatternCategories(), refetchTemplateCategories()]);
        setView({ ...view, page: 1 }); // Reset to page 1
    };

    return (
        <Modal
            overlayClassName="gutenlayouts-library-modal__overlay"
            className="gutenlayouts-library-modal"
            title={
                <div className="gutenlayouts-modal-header">
                    <h2 className="gutenlayouts-modal-header-title">{__('Gutenlayouts', 'gutenlayouts')}</h2>
                    <div className="gutenlayouts-modal-header-tabs">
                        {libCategories.map(cat => (
                            <Button
                                key={cat.slug}
                                className={classnames('gutenlayouts-tab-button', { active: activeTab === cat.slug })}
                                onClick={() => setActiveTab(cat.slug)}
                            >
                                {cat.name}
                            </Button>
                        ))}
                    </div>
                </div>
            }
            onRequestClose={onClose}
            isFullScreen={true}
            headerActions={
                <>
                    <Button className="fetch-lastest-data" onClick={onFetchLatestData}>
                        <span className="dashicons dashicons-update"></span> {__('Fetch Latest Data', 'gutenlayouts')}
                    </Button>
                </>
            }
        >
            <div className="gutenlayouts-modal__container">
                <div className="gutenlayouts-modal__content">
                    {loading && (
                        <div className="gutenlayouts-loading">
                            <Spinner />
                        </div>
                    )}

                    {error && (
                        <div className="gutenlayouts-error notice notice-error">
                            <p>{error}</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="gutenberlayouts-content-view">
                            <div className="pattern-categories">
                                <Button
                                    className={classnames('pattern-category', { active: view.category === '' })}
                                    onClick={() => onCategorySelect('')}
                                >
                                    {__('All', 'gutenlayouts')}
                                </Button>
                                {currentCategories &&
                                    currentCategories.map(cat => (
                                        <Button
                                            key={cat.id}
                                            className={classnames('pattern-category', { active: view.category === cat.name })}
                                            onClick={() => onCategorySelect(cat.name)}
                                        >
                                            {cat.name}
                                        </Button>
                                    ))}
                            </div>
                            <div className="pattern-content-view">
                                <div className="gutenlayouts-patterns-grid">
                                    {currentItems.map(item => (
                                        <div key={item.id} className="gutenlayouts-pattern-card">
                                            <div className="pattern-image">
                                                <img src={item.thumbnail} alt={item.title} />
                                            </div>
                                            <div className="pattern-info">
                                                <h3 className="pattern-title">{item.title || __('Untitled', 'gutenlayouts')}</h3>
                                                <Button
                                                    className="pattern-import-button"
                                                    disabled={importingId === item.id}
                                                    onClick={() => {
                                                        if (item?.type === 'pro') {
                                                            alert('This item is pro');
                                                        } else {
                                                            importPattern(item);
                                                        }
                                                    }}
                                                >
                                                    {item?.type === 'pro' ? (
                                                        <>
                                                            <span className="dashicons dashicons-lock"></span>
                                                            {__('Pro', 'gutenlayouts')}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {importingId === item.id ? (
                                                                <>
                                                                    <Spinner />
                                                                    {__('Importing...', 'gutenlayouts')}
                                                                </>
                                                            ) : (
                                                                __('Import', 'gutenlayouts')
                                                            )}
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    {currentItems.length === 0 && <p>{__('No items found.', 'gutenlayouts')}</p>}
                                </div>

                                <div className="gutenlayouts-pagination">
                                    <Button disabled={!hasPrev} onClick={onPrev}>
                                        {__('Previous', 'gutenlayouts')}
                                    </Button>
                                    <span style={{ fontSize: '13px' }}>
                                        {sprintf(__('Page %d of %d', 'gutenlayouts'), view.page, Math.max(1, totalPages))}
                                    </span>
                                    <Button disabled={!hasNext} onClick={onNext}>
                                        {__('Next', 'gutenlayouts')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};
