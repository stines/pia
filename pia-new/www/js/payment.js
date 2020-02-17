var Payment = {
	initialize: function() {
		console.log("Payment.initialize()");
		
		// Start listening for user input:
		$("input[name=payment]").change(function() {
			if (!$(this).is(":checked")) return; // To avoid executing statements for both the checked and the unchecked radio button
			Basket.updateData($(this).attr("name"), $(this).val());
			Payment.showButtons();
  		});
  		
  		if (false && bankOnly) Payment.removePayPal();
  		else {
  			if (!Payment.chosen()) Payment.choosePayPal();
			else Payment.showButtons(); 
		
			// Render PayPal button:
			paypal.Buttons({
				style: {
					layout: "horizontal",
					fundingicons: false,
					tagline: false,
					color: "blue",
					shape: "rect",
					size: "responsive",
					label: "paypal"
					
				},

				onClick: function() {
					Dialogs.wait("Behandles...");
				},
	  
				createOrder: function(data, actions) {
					return actions.order.create({
						application_context: { 
							brand_name: "Pia Olsen",
							locale: "da-DK",
							user_action: "PAY_NOW",
     						shipping_preference: "NO_SHIPPING"
						},
						purchase_units: [{
							amount: {
								value: Basket.totalPrice()
							}
						}]
					});
			    },
	       
	       		onCancel: function() {
	       			Dialogs.close();
  				},
  				
			    onApprove: function(data, actions) {
				    return actions.order.capture().then(function(details) {
				    	console.log("PayPal: { payer: '" + details.payer.name.given_name + "', paymentId: " + data.orderID + " }"); 
					    Basket.submitAfterPayment(data.orderID); 
				    });
			    },
  				
	       		onError: function(err) {
    				console.log("Paypal error:", err);
    				Dialogs.open("Hmm, der skete tilsyneladende en fejl under betalingen?", [ Dialogs.button("Okay") ]);
  				}
			}).render("#paypal-button-container");
		}
	},
	
	showButtons: function() {
		if (Payment.paypalChosen()) {
			$("#bank-button-container").hide(0);
			$("#paypal-button-container").show(0);
				
		} else {
			$("#paypal-button-container").hide(0);
			$("#bank-button-container").show(0);
		}	
	},
	
	toggleEditable: function(editable) {
		Utils.toggleEnabledInput("#payment .basket-form-input", editable);
		
		if (editable) {
			Utils.toggleOpaqueness(".payment-bank", true);
			Utils.toggleOpaqueness(".payment-paypal", true);
			
		} else {
        	Utils.toggleOpaqueness(Payment.paypalChosen() ? ".payment-bank" : ".payment-paypal", editable);
        }
	},
	
	removePayPal: function() {
		console.log("Payment.removePayPal()");
       	
       	Payment.chooseBank();	
    	
    	$("#payment-paypal, .payment-paypal, #paypal-info").addClass("removed");
    	
        Utils.toggleEnabledInput("#payment-paypal", false);
        Utils.toggleOpaqueness(".payment-paypal", false);
        Utils.toggleEnabledLink("#paypal-info", false);
        
        $("#bank-footnote-stars, #bank-footnote").show(0);
	},
	
	choice: function() {
		return $("input[name=payment]:checked").val();
	},
	
	choosePayPal: function() {
		console.log("Payment.choosePayPal()");
		$("input[name=payment]").val(["paypal"]).trigger("change");
	},
	
	chooseBank: function() {
		console.log("Payment.chooseBank()");
		$("input[name=payment]").val(["bank"]).trigger("change");
	},
	
	chosen: function() {
		return typeof Payment.choice() !== "undefined";
	},
	
	paypalChosen: function() {
		return Payment.choice() === "paypal";
	}
};
