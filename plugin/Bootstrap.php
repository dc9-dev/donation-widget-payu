<?php

declare(strict_types=1);

namespace RealHero\DonationWidgetPayu;

/**
 * Main plugin bootstrap class.
 * 
 * @package     wp-modern-plugin-boilerplate
 * @subpackage  core
 * @version     1.0.0
 * @author      Konrad Fedorczyk <contact@realhe.ro>
 */
class Bootstrap
{
    /** @var array $component A pair of component' id & class. */
    private $components = [];

    /** @var string $version Semantic version of a component. */
    private $version;

    /** @var string $assetsUrl Absolute assets URL. */
    private $assetsUrl;

    /** @var string $pluginName Simple unique plugin identificator. */
    private $pluginName;

    /** @var string $pluginPath Absolute plugin path. */
    private $pluginPath;

    /** @var array $componentInstance A pair of component' id & instance. */
    private $componentInstances = [];

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
    }

    /**
     * Register component. 
     * 
     * @param  string  $name       Unique component name.
     * @param  string  $component  Component class (with namespace).
     * @throws \Error
     */
    public function registerComponent(string $name, string $component)
    {
        if (class_exists($component)) {
            $this->components[$name] = $component;
        } else {
            throw new \Error("Component {$component} does not exist.");
        }
    }

    /**
     * Main exposed run method.
     */
    public function run()
    {
        foreach ($this->components as $name => $component) {
            // Create instance.
            $this->componentInstances[$name] = new $component(
                $this->pluginName,
                $this->assetsUrl,
                $this->pluginPath,
                $this->version
            );

            // Run.
            $this->componentInstances[$name]->run();
        }
    }
}
