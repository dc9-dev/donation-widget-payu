<?php

declare(strict_types=1);

namespace RealHero\DonationWidgetPayu\Components;

use RealHero\DonationWidgetPayu\Core\Component;
use RealHero\DonationWidgetPayu\Core\Hook;

/**
 * Load text domain.
 * 
 * @package     wp-modern-plugin-boilerplate
 * @subpackage  core
 * @version     1.0.0
 * @author      Konrad Fedorczyk <contact@realhe.ro>
 */
class I18n extends Component
{
    /**
     * Grouping hook.
     * 
     * This must be public.
     */
    public function loadTextDomain()
    {
        load_plugin_textdomain( 
            $this->pluginName, 
            false, 
            $this->pluginName . '/languages' 
        );
    }

    /**
     * @inheritdoc
     */
    protected function init()
    {
        $hook = new Hook(
            'init',
            $this,
            'loadTextDomain'
        );

        $this->hooks->addAction($hook);
    }
}
