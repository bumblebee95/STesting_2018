describe('React Test', function() {
    it('Besuche die React Anwendung', function() {
        cy.visit('/')
    })

    it('Hinzufügen eines neuen Todos', function () {
        cy.get('#todo_title').type('Neues ToDo')
        cy.get('#add_todo').submit()
    })
    
    it('Erledigen des neuen Todos', function () {
        cy.get('[type="checkbox"]').first().check()
        //add knopf drücken
    })
})