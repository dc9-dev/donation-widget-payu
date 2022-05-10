<?php

declare(strict_types=1);

namespace RealHero\DonationWidgetPayu\Core;

use Hook;

/**
 * HooksCollection is a data-storage for WP hooks.
 * 
 * This class can massively add WP hooks.
 * 
 * @uses        WP
 * @package     wp-modern-plugin-boilerplate
 * @subpackage  core
 * @version     1.0.0
 * @author      Konrad Fedorczyk <contact@realhe.ro>
 */
final class HooksCollection
{
    /** @var \RealHero\DonationWidgetPayu\Core\Hook[] $actions */
    private $actions = [];

    /** @var \RealHero\DonationWidgetPayu\Core\Hook[] $filters */
    private $filters = [];

    /**
     * Add a new action to the collection to be registered with WordPress.
     * 
     * @param Hook $hook
     */
    public function addAction(\RealHero\DonationWidgetPayu\Core\Hook $hook): void
    {
        $this->actions[$hook->id] = $hook;
    }

    /**
     * Add a new action to the collection to be registered with WordPress.
     * 
     * @param Hook $hook
     */
    public function addFilter(\RealHero\DonationWidgetPayu\Core\Hook $hook): void
    {
        $this->filters[$hook->id] = $hook;
    }

    /**
     * Massively add WP filters.
     */
    private function addWPFilters(): void
    {
        foreach ($this->filters as $hook) {
            add_filter(
                $hook->hook,
                [ 
                    $hook->component, 
                    $hook->callback
                ],
                $hook->priority,
                $hook->acceptedArgs
            );
        }
    }

    /**
     * Massively add WP Actions.
     */
    private function addWPActions(): void
    {
        foreach ($this->actions as $hook) {
            add_action(
                $hook->hook,
                [ 
                    $hook->component, 
                    $hook->callback
                ],
                $hook->priority,
                $hook->acceptedArgs
            );
        }
    }

    /**
     * Run WP hooks.
     */
    public function run()
    {
        $this->addWPActions();
        $this->addWPFilters();
    }
}
