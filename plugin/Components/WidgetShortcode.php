<?php

declare(strict_types=1);

namespace RealHero\DonationWidgetPayu\Components;

use RealHero\DonationWidgetPayu\Core\Component;


/**
 * Add shortcode with payment widget
 * 
 * @package     wp-modern-plugin-boilerplate
 * @subpackage  paymentGateway
 * @version     1.0.1
 * @author      Konrad Fedorczyk <contact@realhe.ro>
 */
class WidgetShortcode extends Component
{
    private function transformAtts($atts) 
    {
        // Explode fixed into array
        $fixed = array_map('trim', explode(',', $atts['fixed']));

        return array_merge($atts, [
            'fixed' => $fixed,
        ]);
    }

    public function donationWidget($atts = [])
    {
        /** @var string $gatewayUrl */
        $gatewayUrl = "";

        if (get_option('permalink_structure')) {
            $gatewayUrl = get_site_url(null, PaymentGateway::URL);
        } else {
            $gatewayUrl = get_site_url(null, '/?' . PaymentGateway::QUERY_VAR . '=1');
        }

        $filteredAtts = shortcode_atts( [
            'fixed'             => "20, 50, 100",
            'fixed-default'     => "20",
            'custom-default'    => "",
            'custom-min'        => '5',
            'id'                => "widget-" . rand(1, 99999),
            'theme'             => 'standard'
        ], $atts );

        $filteredAtts = $this->transformAtts($filteredAtts);

        ob_start();
        include $this->pluginPath . '/templates/donation-widget.php';
        return ob_get_clean();
    }

    /**
     * @inheritdoc
     */
    protected function init()
    {
        add_shortcode('donation-widget', [$this, 'donationWidget']);
    }
}
