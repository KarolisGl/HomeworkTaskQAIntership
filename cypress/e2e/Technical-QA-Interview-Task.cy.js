// cypress/e2e/3-homework-assignment


describe('Magento software testing board, test suite(?)', () => {
  beforeEach(function() {
    cy.visit('https://magento.softwaretestingboard.com/');
    cy.fixture('checkout.json').as('checkout');
    cy.fixture('checkout').then((data) => {
      console.log('Loaded fixture data:', data); // Check if fixture data is loaded correctly
    });
  });
//first time doin javascript
  it('Navigate to mens, Hoodies and sweatshirts',function ()  {
    cy.get('a[id="ui-id-5"]').trigger('mouseover'); //mouses over the Men menu
    //cy.log('This is a test log???????????????????????????!???????????????????????');
    
    cy.get('a[id="ui-id-17"]').trigger('mouseover'); //goes into tops
    
    
    cy.get('a[id="ui-id-20"]').click(); //can't find it via cy.contains somehow, weird

    cy.get('#toolbar-amount').invoke('text').then((text) => {
      const itemCount = text.split(' ')[1];
      const realItemCount = parseInt(itemCount.split('-')[1]);
      cy.log('Item count: ' + realItemCount);
      cy.get('li.item.product.product-item').should('have.length',realItemCount);
    });
    cy.contains('Frankie Sweatshirt').click();
    cy.get('#option-label-size-143-item-168').click();
    cy.get('#option-label-color-93-item-60').click();
    cy.get('#qty').click().type('000');
    cy.intercept('/pub/static/version1695896754/frontend/Magento/luma/en_US/Magento_Ui/templates/collection.html').as('staticFileRequest');
    cy.get('#product-addtocart-button > span').click();
    cy.wait('@staticFileRequest')
    //check if matches
    cy.get('.counter-number').invoke('text').then((text) => {
     const shoppingCartValue = parseInt(text);
     cy.get('#qty').invoke('val').then((quantity) => {
      quantity = parseInt(quantity);
      expect(shoppingCartValue).to.eq(quantity);
     });
    });
    cy.get('.showcart').click();
    cy.get('.toggle > span').click();
    cy.get('.product > :nth-child(4) > span').should('contain.text','Yellow');
    cy.get('.content > .product > :nth-child(2) > span').should('contain.text','M');
    cy.intercept('/pub/static/version1695896754/frontend/Magento/luma/en_US/Magento_Weee/template/checkout/summary/item/price/row_excl_tax.html').as('finishLoadingStore');
    cy.get('#top-cart-btn-checkout').click();
    cy.wait('@finishLoadingStore');
    cy.get('#customer-email-fieldset > .required > .control > #customer-email')
    .should('be.visible')
    .type(this.checkout.email);
    cy.get('[name="shippingAddress.firstname"]').should('be.visible').type(this.checkout.firstName);
    cy.get('[name="shippingAddress.lastname"]').should('be.visible').type(this.checkout.lastName);
    cy.get('.street').should('be.visible').type(this.checkout.streetAddress);
    cy.get('[name="shippingAddress.city"]').should('be.visible').type(this.checkout.city);
    cy.get('[name="shippingAddress.country_id"] > class="select"').select('LT');
  });
});