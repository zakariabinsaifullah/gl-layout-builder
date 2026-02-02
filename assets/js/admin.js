/**
 * Admin Page JavaScript
 * Handles tabs, toggles, and AJAX interactions
 */

(function ($) {
    'use strict';

    const GllbAdmin = {
        /**
         * Initialize
         */
        init: function () {
            this.bindEvents();
        },

        /**
         * Bind events
         */
        bindEvents: function () {
            // Tab switching
            $('.gllb-nav-link').on('click', this.handleTabSwitch);

            // Save settings
            $('.gllb-save-settings').on('click', this.saveSettings);

            // Search filtering
            $('.gllb-search').on('input', this.handleSearch);

            // Bulk toggle actions
            $('.gllb-bulk-toggle').on('click', this.handleBulkToggle);

            // Initialize with first tab active
            this.initializeTabs();
        },

        /**
         * Initialize tabs
         */
        initializeTabs: function () {
            const hash = window.location.hash.substring(1);
            if (hash && $('#' + hash).length) {
                this.switchTab(hash);
            }
        },

        /**
         * Handle tab switch
         */
        handleTabSwitch: function (e) {
            e.preventDefault();
            const tabId = $(this).data('tab');
            GllbAdmin.switchTab(tabId);
        },

        /**
         * Switch to specific tab
         */
        switchTab: function (tabId) {
            // Update buttons
            $('.gllb-nav-link').removeClass('active');
            $('.gllb-nav-link[data-tab="' + tabId + '"]').addClass('active');

            // Update panes
            $('.gllb-tab-pane').removeClass('active');
            $('#' + tabId).addClass('active');

            // Update URL hash without jumping
            if (history.pushState) {
                history.pushState(null, null, '#' + tabId);
            } else {
                window.location.hash = '#' + tabId;
            }
        },

        /**
         * Save settings via AJAX
         */
        saveSettings: function (e) {
            e.preventDefault();

            const $button = $(this);
            const type = $button.data('type');
            const $container = $('#' + type);

            // Get all checked items
            const items = [];
            $container.find('input[type="checkbox"]:checked').each(function () {
                items.push($(this).val());
            });

            // Show loading state
            $button.addClass('loading');

            // Prepare data
            const data = {
                action: 'gllb_save_settings',
                nonce: gllbAdmin.nonce
            };

            if (type === 'blocks') {
                data.blocks = items;
                data.extensions = GllbAdmin.getExtensionsState();
            } else {
                data.extensions = items;
                data.blocks = GllbAdmin.getBlocksState();
            }

            // Send AJAX request
            $.ajax({
                url: gllbAdmin.ajaxUrl,
                type: 'POST',
                data: data,
                success: function (response) {
                    $button.removeClass('loading');
                    if (response.success) {
                        GllbAdmin.showNotification(response.data.message, 'success');
                    } else {
                        GllbAdmin.showNotification(response.data.message || 'An error occurred', 'error');
                    }
                },

                error: function () {
                    $button.removeClass('loading');
                    GllbAdmin.showNotification('Failed to save settings. Please try again.', 'error');
                }
            });
        },

        /**
         * Handle search filter
         */
        handleSearch: function () {
            const target = $(this).data('target');
            const term = $(this).val().toLowerCase();
            const $items = $('#' + target).find('.gllb-block-item');

            $items.each(function () {
                const label = $(this).data('label') || '';
                if (!term || label.indexOf(term) !== -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        },

        /**
         * Bulk activate/deactivate
         */
        handleBulkToggle: function (e) {
            e.preventDefault();
            const type = $(this).data('target'); // blocks or extensions
            const action = $(this).data('action'); // activate or deactivate
            const checked = action === 'activate';
            const $container = $('#' + type);
            $container.find('input[type="checkbox"]').prop('checked', checked);
        },

        /**
         * Get current blocks state
         */
        getBlocksState: function () {
            const blocks = [];
            $('#blocks input[type="checkbox"]:checked').each(function () {
                blocks.push($(this).val());
            });
            return blocks;
        },

        /**
         * Get current extensions state
         */
        getExtensionsState: function () {
            const extensions = [];
            $('#extensions input[type="checkbox"]:checked').each(function () {
                extensions.push($(this).val());
            });
            return extensions;
        },

        /**
         * Show notification
         */
        showNotification: function (message, type) {
            const $notification = $('#gllb-notification');

            // Remove existing classes
            $notification.removeClass('show success error');

            // Set message
            $notification.text(message);

            // Add type class
            if (type) {
                $notification.addClass(type);
            }

            // Show notification
            setTimeout(function () {
                $notification.addClass('show');
            }, 10);

            // Hide after 4 seconds
            setTimeout(function () {
                $notification.removeClass('show');
            }, 4000);
        },

        /**
         * Handle license activation
         */
        handleLicenseActivate: function (e) {
            e.preventDefault();

            const $button = $(this);
            const $card = $button.closest('.gllb-license-card');
            const $input = $card.find('.gllb-license-key');
            const $message = $card.find('.gllb-license-message');
            const licenseKey = $input.val().trim();

            if (!licenseKey) {
                $message.removeClass('success').addClass('error').text('Please enter a license key.');
                return;
            }

            $button.prop('disabled', true).text('Activating...');
            $message.removeClass('success error').text('');

            $.ajax({
                url: gllbAdmin.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'gllb_activate_license',
                    nonce: gllbAdmin.nonce,
                    license_key: licenseKey
                },
                success: function (response) {
                    if (response.success) {
                        $message.removeClass('error').addClass('success').text(response.data.message);
                        // Reload page to show updated UI
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    } else {
                        $message.removeClass('success').addClass('error').text(response.data.message);
                        $button.prop('disabled', false).text('Activate');
                    }
                },
                error: function () {
                    $message.removeClass('success').addClass('error').text('Connection error. Please try again.');
                    $button.prop('disabled', false).text('Activate');
                }
            });
        },

        /**
         * Handle license deactivation
         */
        handleLicenseDeactivate: function (e) {
            e.preventDefault();

            if (!confirm('Are you sure you want to deactivate this license?')) {
                return;
            }

            const $button = $(this);
            const $card = $button.closest('.gllb-license-card');
            const $message = $card.find('.gllb-license-message');

            $button.prop('disabled', true).text('Deactivating...');

            $.ajax({
                url: gllbAdmin.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'gllb_deactivate_license',
                    nonce: gllbAdmin.nonce
                },
                success: function (response) {
                    if (response.success) {
                        $message.removeClass('error').addClass('success').text(response.data.message);
                        // Reload page to show updated UI
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    } else {
                        $message.removeClass('success').addClass('error').text(response.data.message);
                        $button.prop('disabled', false).text('Deactivate');
                    }
                },
                error: function () {
                    $message.removeClass('success').addClass('error').text('Connection error. Please try again.');
                    $button.prop('disabled', false).text('Deactivate');
                }
            });
        }
    };

    // Initialize when document is ready
    $(document).ready(function () {
        GllbAdmin.init();

        // License handlers (using delegation for dynamic content)
        $(document).on('click', '.gllb-license-activate', GllbAdmin.handleLicenseActivate);
        $(document).on('click', '.gllb-license-deactivate', GllbAdmin.handleLicenseDeactivate);
    });
})(jQuery);
