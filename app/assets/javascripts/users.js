/* global $, Stripe */
// Document ready
$(document).on('turbolinks:load', function(){
    var theForm = $('pro-form');
    var submitBtn = $('#form-signup-btn');
    
    // Set Stripe public key
    Stripe.setPublishableKey( $('meta[name = "stripe-key"]').attr('content') ); // CSS selector injected
    // When user clicks form submit button,
    submitBtn.click(function()
    {
        event.preventDefault();
        
        // Collect credit card fields
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
            
        // Send them to Stripe
        Stripe.createToken({
            number: ccNum,
            cvc: cvcNum,
            exp_month: expMonth,
            exp_year: expYear
        },stripeResponseHandler);
    });
    // prevent default form submission to server
    
    
    
    // Sends back a card token
    // Inject card token as hidden field into form
    // Submit form

});