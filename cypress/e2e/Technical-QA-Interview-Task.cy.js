// cypress/e2e/Technical-QA-Interview-Task.cy.js


describe('Magento software testing board - Test Suite', () => {
  beforeEach(function() {
    //Visits the homepage of magento testing site.
    cy.visit('https://magento.softwaretestingboard.com/');

    //Loading fixture data from checkout.json
    cy.fixture('checkout.json').as('checkout');
    cy.fixture('checkout').then((data) => {
      cy.log('Fixture data loaded successfully', data); 
    });

    //Reloads the page before each test.
    cy.reload({ forceReload: true })

  });

  it('Scenario 1 - Purchase flow, buying Frankie\'s sweatshirt',function ()  {
    // Navigate to Men's Tops
    cy.log('Navigating to Men\'s Tops category');
    cy.get('a[id="ui-id-5"]').trigger('mouseover'); // Mouse over Men menu
    cy.get('a[id="ui-id-17"]').trigger('mouseover'); // Mouse over Tops submenu
    cy.get('a[id="ui-id-20"]').click(); // Click on Tops link

    // Verify item count on the page
    cy.get('#toolbar-amount').invoke('text').then((text) => {
      const itemCount = text.split(' ')[1];
      const realItemCount = parseInt(itemCount.split('-')[1]);
      cy.log(`Item count on the page: ${realItemCount}`);
      cy.get('li.item.product.product-item').should('have.length', realItemCount);
  });

    // Select and customize a product (Frankie Sweatshirt)
    cy.log('Selecting and customizing Frankie Sweatshirt');
    cy.contains('Frankie Sweatshirt').click();
    cy.get('#option-label-size-143-item-168').click(); // Select size
    cy.get('#option-label-color-93-item-60').click(); // Select color
    cy.get('#qty').click().type('000').invoke('val').should('eq','1000'); // Set quantity of items

    // Add to cart and load the shopping cart number
    cy.intercept('/pub/static/version1695896754/frontend/Magento/luma/en_US/Magento_Ui/templates/collection.html').as('loadShoppingCart');
    cy.get('#product-addtocart-button').click(); // Add to cart
    cy.wait('@loadShoppingCart');

    // Verify cart count matches quantity
    cy.get('.counter-number').invoke('text').should('eq','1000')

    // Open cart and verify item details
    cy.log('Verifying cart contents');
    cy.get('.showcart').click(); // Open mini cart
    cy.get('.toggle > span').click(); // Expand item details
    cy.get('.product > :nth-child(4) > span').should('contain.text', 'Yellow'); // Verify color
    cy.get('.content > .product > :nth-child(2) > span').should('contain.text', 'M'); // Verify size
    
    // Proceed to checkout
    cy.log('Proceeding to checkout');
    cy.intercept('/pub/static/version1695896754/frontend/Magento/luma/en_US/Magento_Weee/template/checkout/summary/item/price/row_excl_tax.html').as('finishLoadingStore');
    cy.get('#top-cart-btn-checkout').click(); // Click Checkout button
    cy.wait('@finishLoadingStore');


    // Fill in checkout form
    cy.log('Filling in checkout details');
    cy.get('#customer-email-fieldset > .required > .control > #customer-email')
        .should('be.visible')
        .type(this.checkout.email);
    cy.get('[name="shippingAddress.firstname"]').should('be.visible').type(this.checkout.firstName);
    cy.get('[name="shippingAddress.lastname"]').should('be.visible').type(this.checkout.lastName);
    cy.get('[name^="street[0]"]').should('be.visible').type(this.checkout.streetAddress);
    cy.get('[name="shippingAddress.city"]').should('be.visible').type(this.checkout.city);
    cy.get(':nth-child(2) > :nth-child(1) > .radio').click(); // Select shipping method
    cy.get('[name^="country_id"]').select('LT');
    cy.get('[name^="region_id"]').should('be.visible').select('484').invoke('val').should('deep.equal', '484');
    cy.get('[name="shippingAddress.postcode"]').should('be.visible').type('10000');
    cy.get('[name="shippingAddress.telephone"]').type(this.checkout.phoneNumber);

    // Continue to payment
    cy.log('Proceeding to payment');
    cy.get('.button').should('be.visible').click();
    cy.intercept('/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=*').as('finishLoading');
    cy.wait('@finishLoading');
    cy.get('#billing-address-same-as-shipping-checkmo').should('be.visible').click();

    // Place order
    cy.log('Placing order');
    cy.contains('Place Order').should('be.visible').click();
  });
  it.only('Scenario 2',function ()  {
    cy.get('#ui-id-4').trigger('mouseover');
    cy.get('#ui-id-10').trigger('mouseover');
    cy.get('#ui-id-15').click();
    cy.get('#sorter')
    .select('price', { force: true })
    .invoke('val')
    .should('eq', 'price');
    cy.visit('https://magento.softwaretestingboard.com/women/bottoms-women/pants-women.html?product_list_order=price') //Very inconsistent otherwise....
    cy.get('.swatch-opt-1819 > .size > .swatch-attribute-options > #option-label-size-143-item-172').should('be.visible').click();
    cy.get('.swatch-opt-1819 > .swatch-attribute.color > .swatch-attribute-options > #option-label-color-93-item-59').should('be.visible').click();
    cy.intercept('/swatches/ajax/media/?product_id=1818&isAjax=true').as('loadProduct0');
    cy.wait('@loadProduct0');
    cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').should('be.visible').scrollIntoView().realHover();
    cy.get('[data-product-id="1819"]') 
    .parents('.product-item-info') 
    .find('button[title="Add to Cart"]')
    .should('be.visible')
    .click({ force: true }); 
    //cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').realMouseWheel({ deltaY: -100 });
    //cy.intercept('/pub/static/version1695896754/frontend/Magento/luma/en_US/Magento_Tax/template/checkout/minicart/subtotal/totals.html').as('finishLoadingShoppingCart');
    //cy.contains('Add to Cart').should('be.visible').realClick();
    cy.intercept('/pub/static/version1695896754/frontend/Magento/luma/en_US/Magento_Tax/template/checkout/minicart/subtotal/totals.html').as('finishLoadingShoppingCart');
    cy.wait('@finishLoadingShoppingCart')
    cy.get('.counter-number').invoke('text').should('eq','1')
    cy.get('.swatch-opt-1889 > .size > .swatch-attribute-options > #option-label-size-143-item-172').click();
    cy.get('.swatch-opt-1889 > .swatch-attribute.color > .swatch-attribute-options > #option-label-color-93-item-53').click();
    cy.get(':nth-child(2) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').should('be.visible').scrollIntoView().realHover();
    cy.get('[data-product-id="1889"]') 
    .parents('.product-item-info') 
    .find('button[title="Add to Cart"]')
    .should('be.visible')
    .click({ force: true }); 
    cy.intercept('/customer/section/load/?sections=cart%2Cdirectory-data%2Cmessages&force_new_section_timestamp*').as('finishLoadingShoppingCart');
    cy.wait('@finishLoadingShoppingCart')
    cy.get('.counter-number').invoke('text').should('eq','2')
    cy.get('.swatch-opt-1826 > .size > .swatch-attribute-options > #option-label-size-143-item-172').click();
    cy.get('.swatch-opt-1826 > .swatch-attribute.color > .swatch-attribute-options > #option-label-color-93-item-57').click();
    cy.get(':nth-child(3) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').should('be.visible').scrollIntoView().realHover();
    cy.get('[data-product-id="1826"]') 
    .parents('.product-item-info') 
    .find('button[title="Add to Cart"]')
    .should('be.visible')
    .click({ force: true }); 
    cy.intercept('/customer/section/load/?sections=cart%2Cdirectory-data%2Cmessages&force_new_section_timestamp*').as('finishLoadingShoppingCart');
    cy.wait('@finishLoadingShoppingCart')
    cy.get('.counter-number').invoke('text').should('eq','3')
    cy.get('.showcart').click();
    cy.get('a.action.delete[title="Remove item"]')
    .first()
    .should('be.visible') // Ensure the button is visible
    .click(); // Click on the remove button
    cy.get('.action-primary').click();
    cy.intercept('/customer/section/load/?sections=cart%2Cdirectory-data%2Cmessages&force_new_section_timestamp*').as('finishLoadingShoppingCart');
    cy.wait('@finishLoadingShoppingCart')
    cy.get('.counter-number').invoke('text').should('eq','2')
    cy.contains('View and Edit Cart').click();
    cy.get('[data-product-id="17"]') 
    .parents('.product-item-info') 
    .find('button[title="Add to Cart"]')
    .should('be.visible')
    .click({ force: true });
    cy.intercept('/customer/section/load/?sections=cart%2Cdirectory-data%2Cmessages&force_new_section_timestamp*').as('finishLoadingShoppingCart');
    cy.wait('@finishLoadingShoppingCart')
    cy.get('.counter-number').invoke('text').should('eq','3')
    //cy.contains('Proceed to Checkout').click({ force: true });
    cy.get('.checkout-methods-items > :nth-child(1) > .action').click();

    //CHECKOUT STUFF

    cy.intercept('/pub/static/version1695896754/frontend/Magento/luma/en_US/Magento_Weee/template/checkout/summary/item/price/row_excl_tax.html').as('finishLoadingStore');
    cy.wait('@finishLoadingStore');
    // Fill in checkout form
    cy.log('Filling in checkout details');
    cy.get('#customer-email-fieldset > .required > .control > #customer-email')
        .should('be.visible')
        .type(this.checkout.email);
    cy.get('[name="shippingAddress.firstname"]').should('be.visible').type(this.checkout.firstName);
    cy.get('[name="shippingAddress.lastname"]').should('be.visible').type(this.checkout.lastName);
    cy.get('[name^="street[0]"]').should('be.visible').type(this.checkout.streetAddress);
    cy.get('[name="shippingAddress.city"]').should('be.visible').type(this.checkout.city);
    cy.get(':nth-child(2) > :nth-child(1) > .radio').click(); // Select shipping method
    cy.get('[name^="country_id"]').select('LT');
    cy.get('[name^="region_id"]').should('be.visible').select('484').invoke('val').should('deep.equal', '484');
    cy.get('[name="shippingAddress.postcode"]').should('be.visible').type('10000');
    cy.get('[name="shippingAddress.telephone"]').type(this.checkout.phoneNumber);

    // Continue to payment
    cy.log('Proceeding to payment');
    cy.get('.button').should('be.visible').click();
    cy.intercept('/customer/section/load/?sections=messages&force_new_section_timestamp=true&_=*').as('finishLoading');
    cy.wait('@finishLoading');
    cy.get('#billing-address-same-as-shipping-checkmo').should('be.visible').click();

    // Place order
    cy.log('Placing order');
    cy.contains('Place Order').should('be.visible').click();
  });
});