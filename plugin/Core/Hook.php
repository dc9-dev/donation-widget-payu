<?php

declare(strict_types=1);

namespace RealHero\DonationWidgetPayu\Core;

/**
 * Hook is universal object for storing WP hooks.
 * 
 * @package     wp-modern-plugin-boilerplate
 * @subpackage  core
 * @version     1.0.0
 * @author      Konrad Fedorczyk <contact@realhe.ro>
 */
final class Hook
{
    /** @var string $hook WP hook name. */
    public $hook;

    /** @var object $component Object with hook. */
    public $component;

    /** @var string $callback Callback name. */
    public $callback;

    /** @var int $priority Priority, by default 10. */
    public $priority;

    /** @var int $acceptedArgs Accepted args, by default 1. */
    public $acceptedArgs;

    /**
     * Constructor.
     * 
     * @param string    $hook
     * @param object    $component
     * @param string    $callback
     * @param int       $priority
     * @param int       $acceptedArgs
     */
    public function __construct(
        string $hook,
        object $component,
        string $callback,
        int $priority = 10,
        int $acceptedArgs = 1
    ) {
        $this->hook = $hook;
        $this->component = $component;
        $this->callback = $callback;
        $this->priority = $priority;
        $this->acceptedArgs = $acceptedArgs;
    }

    /**
     * 
     * @param string $name
     */
    public function __get(string $name)
    {
        switch ($name) {
            case 'id':
                return $this->id();
        }
    }

    /**
     * Generate hook name.
     * 
     * @return string
     */
    private function id(): string
    {
        $id = get_class($this);
        $id .= "__{$this->callback}";

        return $id;
    }
}
