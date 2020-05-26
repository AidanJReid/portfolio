// Storage controller

// Item contoller
const ItemCtrl = (function(){
    // Item constructor
    const Item = function(id, name, units){
        this.id = id;
        this.name = name;
        this.units = units;
    }

    // Data structure / State
    const data = {
        items: [
            // {id: 0, name: "Guinness", units: 1.5},
            // {id: 1, name: "Baby Guinness", units: 2},
            // {id: 2, name: "Wine", units: 3}
        ],
        currentItem: null,
        totalUnits: 0
    }

    // Public methods
    return {
        getItems: function(){
            return data.items;
        },
        addItem: function(name, units){
            let ID;
            // Create ID
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Units to number
            units = parseInt(units);

            // Create new item
            newItem = new Item(ID, name, units);

            // Add to items array
            data.items.push(newItem);

            return newItem;
        },
        getItemById: function(id){
            let found = null;
            // Loop through items
            data.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }
            });
            return found;
        },
        updateItem: function(name, units){
            // Units to number
            units = parseInt(units);

            let found = null;

            data.items.forEach(function(item){
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.units = units;
                    found = item;
                }
            });
            return found;
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        getTotalUnits: function(){
            let total = 0;

            // Loop through items and add units
            data.items.forEach(function(item){
                total += item.units;
            });

            // Set total units in data structure
            data.totalUnits = total;

            // Return total
            return data.totalUnits;
        },
        logData: function(){
            return data;
        }
    }
})();



// UI controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: "#item-list",
        listItems: "#item-list li",
        addBtn: ".add-btn",
        updateBtn: ".update-btn",
        deleteBtn: ".delete-btn",
        backBtn: ".back-btn",
        itemNameInput: "#item-name",
        itemUnitInput: "#item-units",
        totalUnits: ".total-units"
    }
    
    // Public methods
    return {
        populateItemList: function(items){
            let html = "";

            items.forEach(function(item){
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.units} units</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>`;
            });

            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                units: document.querySelector(UISelectors.itemUnitInput).value                
            }
        },
        addListItem: function(item){
            // Show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create LI element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.units} units</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>`;
            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        updateListItem: function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Turn node list into array
            listItems = Array.from(listItems);

            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.units} units</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>`;
                }
            });
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = "";
            document.querySelector(UISelectors.itemUnitInput).value = "";
        },
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemUnitInput).value = ItemCtrl.getCurrentItem().units;
            UICtrl.showEditState();
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalUnits: function(totalUnits){
            document.querySelector(UISelectors.totalUnits).textContent = totalUnits;
        },
        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        getSelectors: function(){
            return UISelectors;
        }
    }

})();



// App controller
const App = (function(ItemCtrl, UICtrl){
    // Load event listeners
    const loadEventListeners = function(){
        // GET UI
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // Disable submit on enter
        document.addEventListener('keypress', function(){
            if(e.keyCode === 13 || e.which === 13){
                e.preventDefault();
                return false;
            }
        });

        // Edit icon event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        // Update items
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    }

    // Add item submit
    const itemAddSubmit = function(e){
        // Get form input from UI controller
        const input = UICtrl.getItemInput();

        // Check for name and unit input
        if(input.name !== "" && input.units !== "") {
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.units);
            // Add item to UI list
            UICtrl.addListItem(newItem);
            // Get total units
            const totalUnits = ItemCtrl.getTotalUnits();
            // Add total units to UI
            UICtrl.showTotalUnits(totalUnits);
            // Clear fields
            UICtrl.clearInput();
        }
        
        e.preventDefault();
    }

    // Click Edit submit
    const itemEditClick = function(e){
        if(e.target.classList.contains('edit-item')){
            // Get list item ID
            const listId = e.target.parentNode.parentNode.id;

            // Break into array
            const listIdArray = listId.split('-');

            // Get ID
            const id = parseInt(listIdArray[1]);

            // Get item
            const itemToEdit = ItemCtrl.getItemById(id);

            // Set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add item to form
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    }

    // Update item
    const itemUpdateSubmit = function(e){
        // Get item input
        const input = UICtrl.getItemInput();

        // Update item 
        const updatedItem = ItemCtrl.updateItem(input.name, input.units);   

        // Update UI
        UICtrl.updateListItem(updatedItem)
        e.preventDefault();

        // Get total units
        const totalUnits = ItemCtrl.getTotalUnits();

        // Add total units to UI
        UICtrl.showTotalUnits(totalUnits);

        UICtrl.clearEditState();
    }

    // Public methods 
    return {
        init: function(){
            // Set initial state
            UICtrl.clearEditState();

            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // Check if any items
            if(items.length === 0){
                UICtrl.hideList();
            } else {
            // Populate list w/ items
            UICtrl.populateItemList(items);
            }

            // Get total units
            const totalUnits = ItemCtrl.getTotalUnits();
            // Add total units to UI
            UICtrl.showTotalUnits(totalUnits);

            // Load event listener
            loadEventListeners();
        }
    }
    
})(ItemCtrl, UICtrl);


// Initialize App
App.init();