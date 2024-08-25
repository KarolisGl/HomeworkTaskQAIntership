// cypress/e2e/3-homework-assignment


describe('Magento software testing board, test suite(?)', () => {
  beforeEach(() => {
    cy.visit('https://magento.softwaretestingboard.com/');
  });
//first time doin javascript
  it('Navigate to mens, Hoodies and sweatshirts', () => {
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
  });
});