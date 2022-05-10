<?php

declare(strict_types=1);

namespace RealHero\DonationWidgetPayu;

/**
 * Helpers class
 * 
 * @package     wp-modern-plugin-boilerplate
 * @subpackage  core
 * @version     1.0.0
 * @author      Konrad Fedorczyk <contact@realhe.ro>
 */
abstract class Helpers 
{
    public static function isDebugOn() {
        return defined('WP_DEBUG') && true === WP_DEBUG;
    }

    public static function sanitizeInteger($input) {
        return intval($input);
    }

    public static function sanitizeString($input) {
        return trim(htmlspecialchars($input));
    }
}
