<?php

declare(strict_types=1);

namespace RealHero\DonationWidgetPayu\Components;

use RealHero\DonationWidgetPayu\Core\Component;
use RealHero\DonationWidgetPayu\Core\Hook;

/**
 * Add payment gateway URL.
 * 
 * @package     wp-modern-plugin-boilerplate
 * @subpackage  paymentGateway
 * @version     1.0.0
 * @author      Konrad Fedorczyk <contact@realhe.ro>
 */
class PaymentGateway extends Component
{
    const URL = "/payment-gateway/";
    const REWRITE_URL = "payment-gateway/?$";
    const QUERY_VAR = "payment-gateway";

    public function addTemplateRedirect()
    {
        $custom = intval(get_query_var(self::QUERY_VAR));
        if ($custom) {
            include $this->pluginPath . '/gateway.php';
            die;
        }
    }

    public function rewriteRules($wp_rewrite)
    {
        $wp_rewrite->rules = array_merge(
            [self::REWRITE_URL => "index.php?" . self::QUERY_VAR . "=1"],
            $wp_rewrite->rules
        );
    }

    public function addQueryVar($query_vars)
    {
        $query_vars[] = self::QUERY_VAR;
        return $query_vars;
    }

    /**
     * @inheritdoc
     */
    protected function init()
    {
        $addTemplateRedirect = new Hook(
            'template_redirect',
            $this,
            'addTemplateRedirect'
        );

        $addQueryVar = new Hook(
            'query_vars',
            $this,
            'addQueryVar'
        );

        $rewriteRules = new Hook(
            'generate_rewrite_rules',
            $this,
            'rewriteRules'
        );

        $this->hooks->addFilter($rewriteRules);
        $this->hooks->addAction($addQueryVar);
        $this->hooks->addAction($addTemplateRedirect);
    }
}
