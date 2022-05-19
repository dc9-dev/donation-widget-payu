<?php
// No cache please
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

require __DIR__ . "/vendor/autoload.php";

/**
 * PayU configuration
 */
$config = new stdClass();

$config->environment            = get_option("environment") == "0" ? "sandbox" : "secure";
$config->merchantPosId          = get_option("merchantPosId");
$config->signatureKey           = get_option("signatureKey");
$config->oauthClientId          = get_option("oauthClientId");
$config->oauthClientSecret      = get_option("oauthClientSecret");
$config->continueUrl            = get_option("continueUrl", '/thank-you/');
$config->transferDescription    = get_option("transferDescription", 'Donation');

// Check if we have all settings
$keys = array_keys(\RealHero\DonationWidgetPayu\PayU\PayUSettings::SETTINGS);

foreach ($keys as $k) {
    if (empty($config->{$k})) {
        $errorMsg = sprintf(__("Please configure '%s' option in donation plugin.", "donation-widget-payu"), $k);
        wp_die($errorMsg);
    }
}

// Start PayU configuration
OpenPayU_Configuration::setEnvironment($config->environment);
OpenPayU_Configuration::setMerchantPosId($config->merchantPosId);
OpenPayU_Configuration::setSignatureKey($config->signatureKey);
OpenPayU_Configuration::setOauthClientId($config->oauthClientId);
OpenPayU_Configuration::setOauthClientSecret($config->oauthClientSecret);

/**
 * Create order
 */

/** @var int $amount */
$amount = 0;

if (!empty($_POST["final-amount"])) {
    $amount = intval($_POST["final-amount"]);
} else {
    wp_die("There's no amount posted to the gateway.");
}

// Convert amount to "grosze"

/** @var int $realAmount */
$realAmount = $amount * 100;

// Random order id
$extOrderId = uniqid("order_") . rand(1, 9999);

$order['continueUrl']       = get_site_url(null, $config->continueUrl);
// $order['notifyUrl']  = 'http://localhost/';
$order['customerIp']        = \RealHero\DonationWidgetPayu\Helpers::getRealIp();
$order['merchantPosId']     = OpenPayU_Configuration::getMerchantPosId();

// This works like a transfer title 
$order['description']       = $config->transferDescription;
$order['currencyCode']      = 'PLN';
$order['totalAmount']       = $realAmount;
$order['extOrderId']        = $extOrderId;

$order['products'][0]['name'] = 'Donation: ' . $amount;
$order['products'][0]['unitPrice'] = $realAmount;
$order['products'][0]['quantity'] = 1;

try {
    $response = OpenPayU_Order::create($order);
    header('Location:' . $response->getResponse()->redirectUri);
} catch (\Exception $e) {
    if (\RealHero\DonationWidgetPayu\Helpers::isDebugOn()) {
        wp_die($e->getMessage());
    } else {
        wp_die(__("Something went wrong. Please check donation plugin configuration.", "donation-widget-payu"));
    }
}
