=== Donation widget via PayU ===
Contributors: fedek6
Tags: payu, donation
Requires at least: 5.2
Tested up to: 5.9.3
Stable tag: 1.0.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Very simple donation widget (using PayU)

== Description ==

This plugin adds a shortcode with a simple donation widget.

Example usage:

`[donation-widget theme="cotopaxi" fixed="20, 50, 100, 200, 300, 500" fixed-default="50" custom-min="5"]`

Options description:

* *theme* CSS theme.
* *fixed* predefined values on buttons (comma separated).
* *fixed-default* value selected by default.
* *custom-min* value typed in a custom value field (optional).

Please configure plugin after installation. For this you will need a configured PayU POS (you can use sandbox for testing purposes).

To add your theme simply add following CSS to your website (and edit it for your needs):

`
.donation-widget[data-theme="cotopaxi"] {
  --primary-color: #ff2b00;
  --primary-color-300: #cc2200;
  --secondary-color: #242424;
  --outline-color: #3f88c5;
  --button-height: 50px;
  --transition: all 200ms ease-out;
  --text-color-on-focus: White;
  --font-family: "Montserrat", sans-serif;
  --font-weight: 700;
  --fixed-amount-font-size: 18px;
  --custom-amount-font-size: 14px;
  --btn-font-size: 14px;
  --max-widget-width: 500px;
}
`

Where *data-theme* is the name used in shortcode.

== Screenshots ==

1. Widget look
2. Plugin configuration

== Changelog ==

= 1.0.0 =
* Fully working tested version
