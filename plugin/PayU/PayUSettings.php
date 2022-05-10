<?php

declare(strict_types=1);

namespace RealHero\DonationWidgetPayu\PayU;

abstract class PayUSettings
{
    const SETTINGS = [
        'environment' => [
            'field' => [
                'type' => 'select',
                'options' => [0 => "Sandbox", 1 => "Secure"],
            ],
            'args' => [
                'type'              => 'integer',
                'description'       => 'PayU environment',
                'default'           => 0,
                'sanitize_callback' => ['\RealHero\DonationWidgetPayu\Helpers', 'sanitizeInteger']
            ]
        ],
        'merchantPosId' => [
            'field' => [
                'type' => 'number',
            ],
            'args' => [
                'type'              => 'integer',
                'description'       => 'PayU merchant pos id',
                'sanitize_callback' => ['\RealHero\DonationWidgetPayu\Helpers', 'sanitizeInteger']
            ]
        ],
        'signatureKey' => [
            'field' => [
                'type' => 'text',
            ],
            'args' => [
                'type'              => 'text',
                'description'       => 'Signature key',
                'sanitize_callback' => ['\RealHero\DonationWidgetPayu\Helpers', 'sanitizeString']
            ]
        ],
        'oauthClientId' => [
            'field' => [
                'type' => 'text',
            ],
            'args' => [
                'type'              => 'text',
                'description'       => 'Oauth Client Id',
                'sanitize_callback' => ['\RealHero\DonationWidgetPayu\Helpers', 'sanitizeString']
            ]
        ],
        'oauthClientSecret' => [
            'field' => [
                'type' => 'text',
            ],
            'args' => [
                'type'              => 'text',
                'description'       => 'Oauth Client Secret',
                'sanitize_callback' => ['\RealHero\DonationWidgetPayu\Helpers', 'sanitizeString']
            ]
        ],
        'continueUrl' => [
            'field' => [
                'type' => 'text',
            ],
            'args' => [
                'type'              => 'text',
                'description'       => 'Redirect URL after payment',
                'sanitize_callback' => ['\RealHero\DonationWidgetPayu\Helpers', 'sanitizeString'],
                'default'           => '/thank-you/'
            ]
        ],
        'transferDescription' => [
            'field' => [
                'type' => 'text',
            ],
            'args' => [
                'type'              => 'text',
                'description'       => 'Transfer description',
                'sanitize_callback' => ['\RealHero\DonationWidgetPayu\Helpers', 'sanitizeString'],
                'default'           => 'Donation'
            ]
        ],
    ];
}
