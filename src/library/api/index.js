/**
 * WordPress dependencies
 */
import { useState, useEffect, useCallback } from '@wordpress/element';
import { parse } from '@wordpress/blocks';

const API_BASE = window.wpApiSettings?.root ? `${window.wpApiSettings.root}gllb/v1` : '/wp-json/gllb/v1';

console.log(API_BASE);

/**
 * Helper to fetch from external API
 */
const fetchFromApi = async (endpoint, params = {}) => {
    const queryString = Object.keys(params).length > 0 ? '?' + new URLSearchParams(params).toString() : '';
    const response = await fetch(`${API_BASE}${endpoint}${queryString}`, {
        headers: {
            'X-WP-Nonce': window.wpApiSettings?.nonce || '',
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
};

/**
 * Custom hook to fetch patterns data from External API
 */
export const usePatternsData = ({ page = 1, perPage = 10, selectedCategory = '' } = {}) => {
    const [allPatterns, setAllPatterns] = useState([]);
    const [patterns, setPatterns] = useState([]);
    const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);

    // Initial fetch of all patterns
    const fetchAllPatterns = useCallback(
        async (shouldRefresh = false) => {
            if (hasFetched && !shouldRefresh) return; // Prevent re-fetching unless forced

            setLoading(true);
            setError(null);

            try {
                // Fetch all patterns without pagination params to get everything
                const params = {};
                if (shouldRefresh) {
                    params.refresh = 'true';
                }
                const data = await fetchFromApi('/patterns', params);

                let patternsList = [];
                if (Array.isArray(data)) {
                    patternsList = data;
                } else if (data && data.patterns) {
                    patternsList = data.patterns;
                }

                if (patternsList) {
                    setAllPatterns(patternsList);
                    setHasFetched(true);
                } else {
                    setError("Couldn't load patterns. Invalid data format.");
                    setAllPatterns([]);
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch patterns');
                setAllPatterns([]);
            } finally {
                setLoading(false);
            }
        },
        [hasFetched]
    );

    useEffect(() => {
        fetchAllPatterns();
    }, [fetchAllPatterns]);

    // Handle pagination and parsing locally
    useEffect(() => {
        if (!allPatterns.length) {
            setPatterns([]);
            setPagination({ totalItems: 0, totalPages: 0 });
            return;
        }

        let filteredPatterns = allPatterns;

        // Filter by category if selected
        if (selectedCategory) {
            filteredPatterns = allPatterns.filter(pattern => pattern.categories && pattern.categories.includes(selectedCategory));
        }

        const totalItems = filteredPatterns.length;
        const totalPages = Math.ceil(totalItems / perPage);

        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const slicedPatterns = filteredPatterns.slice(startIndex, endIndex);

        // Parse blocks only for the displayed patterns
        const parsedPatterns = slicedPatterns.map(pattern => {
            try {
                // Check if already parsed
                if (pattern.parsedBlocks) return pattern;

                const parsedBlocks = pattern.content
                    ? parse(pattern.content, {
                          __unstableSkipMigrationLogs: true
                      })
                    : [];

                return {
                    ...pattern,
                    parsedBlocks
                };
            } catch (parseError) {
                return {
                    ...pattern,
                    parsedBlocks: []
                };
            }
        });

        setPatterns(parsedPatterns);
        setPagination({ totalItems, totalPages });
    }, [allPatterns, page, perPage, selectedCategory]);

    return {
        patterns,
        pagination,
        loading, // This represents the initial fetch loading state
        error,
        refetch: () => fetchAllPatterns(true) // Exposed refresh function
    };
};

/**
 * Custom hook to fetch pages data from External API
 */
/**
 * Custom hook to fetch pages data from External API
 */
export const usePageTemplatesData = ({ page = 1, perPage = 10, selectedCategory = '' } = {}) => {
    const [allTemplates, setAllTemplates] = useState([]);
    const [pageTemplates, setPageTemplates] = useState([]);
    const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);

    // Initial fetch of all templates
    const fetchPages = useCallback(
        async (shouldRefresh = false) => {
            if (hasFetched && !shouldRefresh) return;

            setLoading(true);
            setError(null);

            try {
                const params = {};
                if (shouldRefresh) {
                    params.refresh = 'true';
                }
                const data = await fetchFromApi('/templates', params);

                let templatesList = [];
                if (Array.isArray(data)) {
                    templatesList = data;
                } else if (data && data.pages) {
                    templatesList = data.pages;
                }

                if (templatesList) {
                    setAllTemplates(templatesList);
                    setHasFetched(true);
                    // The below logic for parsing is now moved to pagination effect to be efficient
                } else {
                    setError("Couldn't load page templates. Invalid data format.");
                    setAllTemplates([]);
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch page templates');
                setAllTemplates([]);
            } finally {
                setLoading(false);
            }
        },
        [hasFetched]
    );

    useEffect(() => {
        fetchPages();
    }, [fetchPages]);

    // Handle pagination and parsing locally
    useEffect(() => {
        if (!allTemplates.length) {
            setPageTemplates([]);
            setPagination({ totalItems: 0, totalPages: 0 });
            return;
        }

        let filteredTemplates = allTemplates;

        // Filter by category if selected
        if (selectedCategory) {
            filteredTemplates = allTemplates.filter(template => template.categories && template.categories.includes(selectedCategory));
        }

        const totalItems = filteredTemplates.length;
        const totalPages = Math.ceil(totalItems / perPage);

        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const slicedTemplates = filteredTemplates.slice(startIndex, endIndex);

        // Parse blocks only for the displayed patterns
        const parsedTemplates = slicedTemplates.map(template => {
            try {
                // Check if already parsed
                if (template.parsedBlocks) return template;

                const parsedBlocks = template.content
                    ? parse(template.content, {
                          __unstableSkipMigrationLogs: true
                      })
                    : [];

                return {
                    ...template,
                    parsedBlocks
                };
            } catch (parseError) {
                return {
                    ...template,
                    parsedBlocks: []
                };
            }
        });

        setPageTemplates(parsedTemplates);
        setPagination({ totalItems, totalPages });
    }, [allTemplates, page, perPage, selectedCategory]);

    return {
        pageTemplates,
        pagination,
        loading,
        error,
        refetch: () => fetchPages(true)
    };
};

/**
 * Custom hook to fetch categories from External API
 */
export const usePatternCategoriesData = ({ post_type = '' } = {}) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCategories = useCallback(
        async (shouldRefresh = false) => {
            setLoading(true);
            setError(null);

            try {
                const params = {};
                if (post_type) params.post_type = post_type;
                if (shouldRefresh) params.refresh = 'true';

                const data = await fetchFromApi('/pattern_categories', params);

                if (Array.isArray(data)) {
                    setCategories(data);
                } else if (data && data.categories) {
                    setCategories(data.categories);
                } else {
                    setCategories([]);
                }
            } catch (err) {
                console.warn('Error fetching categories (might be not available):', err);
                // setError(err.message || 'Failed to fetch categories');
                // Don't set error for categories to avoid blocking UI with error message if it's just 404
                setCategories([]);
            } finally {
                setLoading(false);
            }
        },
        [post_type]
    );

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        loading,
        error,
        refetch: () => fetchCategories(true)
    };
};

/**
 * Custom hook to fetch template categories from External API
 */
export const useTemplateCategoriesData = ({ post_type = '' } = {}) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCategories = useCallback(
        async (shouldRefresh = false) => {
            setLoading(true);
            setError(null);

            try {
                const params = {};
                if (post_type) params.post_type = post_type;
                if (shouldRefresh) params.refresh = 'true';

                const data = await fetchFromApi('/template_categories', params);

                if (Array.isArray(data)) {
                    setCategories(data);
                } else if (data && data.categories) {
                    setCategories(data.categories);
                } else {
                    setCategories([]);
                }
            } catch (err) {
                console.warn('Error fetching template categories:', err);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        },
        [post_type]
    );

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        loading,
        error,
        refetch: () => fetchCategories(true)
    };
};
