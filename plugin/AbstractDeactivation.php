<?php

declare(strict_types=1);

namespace RealHero\DonationWidgetPayu;

abstract class AbstractDeactivation
{
    public static function run()
    {
        flush_rewrite_rules();
    }
}
