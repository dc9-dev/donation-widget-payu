<?php

declare(strict_types=1);

namespace RealHero\DonationWidgetPayu;

/**
 * Helpers class
 * 
 * @package     wp-modern-plugin-boilerplate
 * @subpackage  core
 * @version     1.0.1
 * @author      Konrad Fedorczyk <contact@realhe.ro>
 */
abstract class Helpers
{
    public static function isDebugOn()
    {
        return defined('WP_DEBUG') && true === WP_DEBUG;
    }

    public static function sanitizeInteger($input)
    {
        return intval($input);
    }

    public static function sanitizeString($input)
    {
        return trim(htmlspecialchars($input));
    }

    /**
     * Determine IP address of the client.
     * 
     * @link https://thisinterestsme.com/php-ip-address-cloudflare/
     */
    public static function getRealIp()
    {
        //Check to see if the CF-Connecting-IP header exists.
        if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
            //If it does, assume that PHP app is behind Cloudflare.
            return $_SERVER["HTTP_CF_CONNECTING_IP"];
        } else {
            //Otherwise, use REMOTE_ADDR.
            return $_SERVER['REMOTE_ADDR'];
        }
    }
}
