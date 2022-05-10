<?php

declare(strict_types=1);

namespace RealHero\DonationWidgetPayu\Components;

use RealHero\DonationWidgetPayu\Core\Component;
use RealHero\DonationWidgetPayu\Core\Hook;
use RealHero\DonationWidgetPayu\PayU\PayUSettings;

/**
 * Add settings page to WP.
 * 
 * @package     wp-modern-plugin-boilerplate
 * @subpackage  paymentGateway
 * @version     1.0.1
 * @author      Konrad Fedorczyk <contact@realhe.ro>
 */
class SettingsPage extends Component
{
    public function registerSettings()
    {
        foreach (PayUSettings::SETTINGS as $name => $settings) {
            register_setting("wp_payu_donation", $name, $settings['args']);
        }
    }

    public function addOptionsPage()
    {
        add_options_page('PayU donation widget settings', 'PayU donation widget', 'manage_options', 'payu-donation-widget', [$this, "settingsForm"]);
    }

    public function settingsForm()
    {
        // No HTML in PHP classes! Fcuk spaghetti code!
        include $this->pluginPath . '/templates/plugin-settings.php';
    }

    /**
     * @link https://neliosoftware.com/blog/how-to-add-a-link-to-your-settings-in-the-wordpress-plugin-list/
     */
    public function settingsLink($links)
    {
        $url = esc_url(add_query_arg(
            'page',
            'payu-donation-widget',
            get_admin_url() . 'admin.php'
        ));

        $settings_link = "<a href='$url'>" . __('Settings') . '</a>';

        array_push(
            $links,
            $settings_link
        );

        return $links;
    }

    /**
     * @inheritdoc
     */
    protected function init()
    {
        // Register settings
        $registerSettings = new Hook(
            'admin_init',
            $this,
            'registerSettings'
        );
        $this->hooks->addAction($registerSettings);

        // Add settings menu
        $addOptionsPage = new Hook(
            'admin_menu',
            $this,
            'addOptionsPage'
        );
        $this->hooks->addAction($addOptionsPage);

        // Add settings link
        $addSettingsLink = new Hook(
            'plugin_action_links_payu-donation-widget-wp/payu-donation-widget-wp.php',
            $this,
            'settingsLink'
        );
        $this->hooks->addFilter($addSettingsLink);
    }
}
