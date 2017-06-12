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
        submitBtn.val("Processing").prop('disabled', true);
        
        // Collect credit card fields
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
            
        // check for card errors
        var error = false;
        
        // validate card num
        if (!Stripe.card.validateCardNumber(ccNum))
        {
            error = true;
            alert("Credit card number invalid");
        }
        
        if (!Stripe.card.validateCVC(cvcNum))
        {
            error = true;
            alert("CVC invalid");
        }
        if (!Stripe.card.validateExpiry(expMonth, expYear))
        {
            error = true;
            alert("Expiration Date Invalid");
        }
        
        
        
        if (error)
        {
            submitBtn.prop('disabled', true).val("Sign Up");   
        }
        else
        {
            // Send them to Stripe
            Stripe.createToken({
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
            },stripeResponseHandler);
        }
        
        
        
        return false;
    });
    // prevent default form submission to server
    
    
    
    // Sends back a card token, return
    function stripeResponseHandler(status, response)
    {
        // Get token from response
        var token = response.id;
        
        // inject the card token in a hidden field
        theForm.append( $('<input type="hidden"> name ="user[stripe_card_token]">').val(token) );
        
        // Submit form
        theForm.get(0).submit();
    }
    // Inject card token as hidden field into form
    

});