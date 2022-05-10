<?php
/**
 * The plugin bootstrap file.
 *
 * @link              https://github.com/fedek6/donation-widget-payu
 * @since             1.0.0
 * @package           wp_modern_plugin_boilerplate
 *
 * @wordpress-plugin
 * Plugin Name:       Donation widget via PayU
 * Plugin URI:        https://github.com/fedek6/donation-widget-payu
 * Requires PHP:      7.4
 * Requires at least: 5.2
 * Tested up to:      5.2
 * Description:       Very simple donation widget (using PayU)
 * Version:           1.0.0
 * Author:            RealHero
 * Author URI:        https://realhe.ro
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       donation-widget-payu
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

/**
 * Composer.
 */
require_once plugin_dir_path( __FILE__ ) . 'vendor/autoload.php';

/**
 * Bootstrap plugin.
 */

/** @var string $assetsUrl */
$assetsUrl = plugin_dir_url(__FILE__) . 'assets';

/** @var string $pluginName */
$pluginName = basename(__DIR__);

$plugin = new \RealHero\DonationWidgetPayu\Bootstrap($pluginName, $assetsUrl, __DIR__, '1.0.0');

// Add components.
$plugin->registerComponent('i18n', '\RealHero\DonationWidgetPayu\Components\I18n');
$plugin->registerComponent('widgetShortcode', '\RealHero\DonationWidgetPayu\Components\WidgetShortcode');
$plugin->registerComponent('settingsPage', '\RealHero\DonationWidgetPayu\Components\SettingsPage');
$plugin->registerComponent('frontendAssets', '\RealHero\DonationWidgetPayu\Components\FrontendAssets');
$plugin->registerComponent('paymentGateway', '\RealHero\DonationWidgetPayu\Components\PaymentGateway');

// Plugin lifecycle.
register_activation_hook( __FILE__, ['\RealHero\DonationWidgetPayu\AbstractActivation', 'run']);
register_deactivation_hook( __FILE__, ['\RealHero\DonationWidgetPayu\AbstractDeactivation', 'run']);

$plugin->run();
