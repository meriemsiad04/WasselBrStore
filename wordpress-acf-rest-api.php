<?php
/**
 * Expose ACF "best_seller" field in WooCommerce REST API
 * Add this code to your theme's functions.php or create a custom plugin
 */

// Option 1: Add ACF fields to WooCommerce product REST response as meta_data
add_filter( 'woocommerce_rest_prepare_product_object', 'add_acf_to_product_rest_response', 10, 3 );
function add_acf_to_product_rest_response( $response, $product, $request ) {
    // Get all ACF fields for the product
    $acf_fields = get_fields( $product->get_id() );
    
    if ( $acf_fields ) {
        // Get existing meta data from response
        $meta_data = $response->data['meta_data'];
        
        // Add each ACF field to meta_data if not already present
        foreach ( $acf_fields as $key => $value ) {
            // Check if this meta key already exists
            $existing = wp_list_filter( $meta_data, array( 'key' => $key ) );
            if ( empty( $existing ) ) {
                $meta_data[] = array(
                    'id'    => null,
                    'key'   => $key,
                    'value' => $value,
                );
            }
        }
        
        // Update the response data
        $response->data['meta_data'] = $meta_data;
        
        // Also add as a separate 'acf' object for easy access
        $response->data['acf'] = $acf_fields;
    }
    
    return $response;
}

// Option 2: If you want to specifically expose only "best_seller", use this instead of Option 1
/*
add_filter( 'woocommerce_rest_prepare_product_object', 'add_best_seller_to_rest_response', 10, 3 );
function add_best_seller_to_rest_response( $response, $product, $request ) {
    $best_seller = get_field( 'best_seller', $product->get_id() );
    
    // Add as meta_data
    $meta_data = $response->data['meta_data'];
    $existing = wp_list_filter( $meta_data, array( 'key' => 'best_seller' ) );
    if ( empty( $existing ) ) {
        $meta_data[] = array(
            'id'    => null,
            'key'   => 'best_seller',
            'value' => $best_seller,
        );
    }
    $response->data['meta_data'] = $meta_data;
    
    // Add as acf object
    $response->data['acf']['best_seller'] = $best_seller;
    
    return $response;
}
*/

// Also, make sure ACF is set to show in REST API (ACF Pro has this setting in field group settings)
// In ACF field group: Set "Show in REST API" to "Yes"
