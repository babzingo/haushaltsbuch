'use strict;'
//Include crypto to generate the action id
var crypto = require('crypto');

module.exports = function() {
    return {
        actionList : [],
        /*
            * Save the action inside the "db".
            */
        save(action) {
            action.id = 1; // fast enough for our purpose
            this.actionList.push(action);
            return 1;           
        },
        /*
            * Retrieve a action with a given id or return all the actions if the id is undefined.
            */
        find(id) {
            if(id) {
                return this.actionList.find(element => {
                        return element.id === id;
                    }); 
            }else {
                return this.actionList;
            }
        },
        /*
            * Delete a action with the given id.
            */
        remove(id) {
            var found = 0;
            this.actionList = this.actionList.filter(element => {
                    if(element.id === id) {
                        found = 1;
                    }else {
                        return element.id !== id;
                    }
                });
            return found;           
        },
        /*
            * Update a action with the given id
            */
        update(id, action) {
            var actionIndex = this.actionList.findIndex(element => {
                return element.id === id;
            });
            if(actionIndex !== -1) {
                this.actionList[actionIndex].value = action.value;
                this.actionList[actionIndex].date = action.date;
                this.actionList[actionIndex].user = action.user;
                return 1;
            }else {
                return 0;
            }
        }       
    }
};  