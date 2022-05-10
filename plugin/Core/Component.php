<?php

declare(strict_types=1);

namespace RealHero\DonationWidgetPayu\Core;

/**
 * Component base class.
 * 
 * This is skeleton for building component classes.
 * 
 * @package     wp-modern-plugin-boilerplate
 * @subpackage  core
 * @version     1.0.0
 * @author      Konrad Fedorczyk <contact@realhe.ro>
 */
abstract class Component
{
    /** @var \RealHero\DonationWidgetPayu\Core\HooksCollection $hooks Hook collector & dispatcher.  */
    protected $hooks;

    /** @var string $pluginName Simple unique plugin identificator. */
    protected $pluginName;

    /** @var string $assetsUrl Absolute assets URL. */
    protected $assetsUrl;

    /** @var string $pluginPath Absolute plugin path. */
    protected $pluginPath;

    /** @var string $version Semantic version of a component. */
    protected $version;

    /**
     * Constructor.
     * 
     * @param  string  $pluginName  Simple unique plugin identificator.
     * @param  string  $assetsUrl   Absolute assets URL.
     * @param  string  $pluginPath  Absolute plugin path.
     * @param  string  $version     Semantic version of a component.
     */
    public function __construct(
        string $pluginName, 
        string $assetsUrl,
        string $pluginPath,
        string $version
    ) {
        $this->pluginName = $pluginName;
        $this->assetsUrl = $assetsUrl;
        $this->pluginPath = $pluginPath;
        $this->version = $version;
        $this->hooks = new HooksCollection;
    }

    /**
     * Component init method.
     * 
     * This must be implemented in a components.
     * 
     * @return void
     */
    abstract protected function init();

    /**
     * Exposed run method.
     * 
     * This is used for running all the component code.
     */
    final public function run()
    {
        $this->init();
        $this->hooks->run();
    }
}
