<div class="wrap">
    <h2><?= __("PayU donation widget settings", "donation-widget-payu"); ?></h2>
    <form method="post" action="options.php">
        <?php settings_fields('wp_payu_donation'); ?>
        <table class="form-table">
            <tr>
                <th><label for="environment"><?= __("PayU environment", "donation-widget-payu"); ?>:</label></th>
                <td>
                    <select id="environment" name="environment">
                        <?php
                        foreach (\RealHero\DonationWidgetPayu\PayU\PayUSettings::SETTINGS['environment']['field']['options'] as $value => $name) {
                            $currentValue = get_option('environment');
                            $isSelected = $currentValue == $value ? "selected" : "";

                            // Escape values
                            $escValue = esc_attr($value);

                            echo '<option value="' . esc_attr($value) . "\" {$isSelected}>" . esc_html($name) . '</option>';
                        }
                        ?>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="merchantPosId"><?= __("Merchant POS ID", "donation-widget-payu"); ?>:</label></th>

                <td>
                    <input type='number' class="regular-text" id="merchantPosId" name="merchantPosId" value="<?php esc_attr_e(get_option('merchantPosId')); ?>" autocomplete="off">
                </td>
            </tr>
            <tr>
                <th><label for="signatureKey"><?= __("Signature key", "donation-widget-payu"); ?>:</label></th>

                <td>
                    <input type='text' class="regular-text" id="signatureKey" name="signatureKey" value="<?php esc_attr_e(get_option('signatureKey')); ?>" autocomplete="off">
                </td>
            </tr>
            <tr>
                <th><label for="oauthClientId"><?= __("Oauth Client Id", "donation-widget-payu"); ?>:</label></th>

                <td>
                    <input type='password' class="regular-text" id="oauthClientId" name="oauthClientId" value="<?php esc_attr_e(get_option('oauthClientId')); ?>" autocomplete="off">
                </td>
            </tr>
            <tr>
                <th><label for="oauthClientSecret"><?= __("Oauth Client Secret", "donation-widget-payu"); ?>:</label></th>

                <td>
                    <input type='password' class="regular-text" id="oauthClientSecret" name="oauthClientSecret" value="<?php esc_attr_e(get_option('oauthClientSecret')); ?>" autocomplete="off">
                </td>
            </tr>
            <tr>
                <th><label for="continueUrl"><?= __("Redirect path after payment", "donation-widget-payu"); ?>:</label></th>

                <td>
                    <input type='text' class="regular-text" id="continueUrl" name="continueUrl" value="<?php esc_attr_e(get_option('continueUrl')); ?>" autocomplete="off">
                </td>
            </tr>
            <tr>
                <th><label for="continueUrl"><?= __("Transfer description", "donation-widget-payu"); ?>:</label></th>

                <td>
                    <input type='text' class="regular-text" id="transferDescription" name="transferDescription" value="<?php esc_attr_e(get_option('transferDescription')); ?>" autocomplete="off">
                </td>
            </tr>
        </table>
        <?php submit_button(); ?>
    </form>
</div>
