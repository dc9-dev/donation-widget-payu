<div>
    <form id="<?= esc_attr($filteredAtts['id']); ?>" class="donation-widget" data-theme="<?= esc_attr($filteredAtts['theme']); ?>" method="post" action="<?= esc_attr($gatewayUrl); ?>" autocomplete="off">
        <?php
        /**
         * Loop through the fixed donation amounts.
         */
        foreach ($filteredAtts['fixed'] as $amount) :
            $isChecked = $amount === $filteredAtts['fixed-default'] ? "checked" : "";
            $fieldId = $filteredAtts['id'] . "_amount_${amount}";
            $amountCurrency = "${amount} zł";

        ?>
            <div class="donation-widget__amount -fixed">
                <input id="<?= esc_attr($fieldId); ?>" type="radio" name="amount" value="<?= esc_attr($amount); ?>" <?= $isChecked; ?>>
                <label for="<?= esc_attr($fieldId); ?>">
                    <?= esc_attr($amountCurrency); ?>
                </label>
            </div>
        <?php
        // @end: Loop through the fixed donation amounts.
        endforeach;
        ?>
        <div class="donation-widget__amount -custom">
            <label>
                <input type="text" tabindex="-1" min="<?= esc_attr($filteredAtts['custom-min']); ?>" name="custom-amount" value="<?= esc_attr($filteredAtts['custom-default']); ?>">
                zł
            </label>
        </div>
        <div class="donation-widget__submit">
            <input type="hidden" name="final-amount" value="<?= esc_attr($filteredAtts['fixed-default']); ?>">
            <button type="submit" name="submit-donation" aria-label="<?= __("Confirm donation", "donation-widget-payu"); ?>">
                <span><?= __("Donate", "donation-widget-payu"); ?></span>
            </button>

        </div>
        <div class="donation-widget__error" role="alert" aria-hidden="true">
            <p><?= sprintf(__("The minimum amount of support is PLN %s.", "donation-widget-payu"), $filteredAtts['custom-min']) ?></p>
        </div>
    </form>
</div>
