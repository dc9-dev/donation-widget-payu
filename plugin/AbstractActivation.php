<?php

declare(strict_types=1);

namespace RealHero\DonationWidgetPayu;

abstract class AbstractActivation
{
    public static function run()
    {
        flush_rewrite_rules();
    }
}
