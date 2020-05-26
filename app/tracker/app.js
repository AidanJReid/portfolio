// Storage controller

const StorageCtrl = (function(){
    // Public methods
    return {
        storeItem: function(item){
            let items;
            // Check if any items in local storage
            if(localStorage.getItem('items') === null){
                items = [];
                // Push new items
                items.push(item);
                // Set local storage
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                // Get what's in local storage
                items = JSON.parse(localStorage.getItem('items'));

                // Push new items
                items.push(item);

                // Reset local storage
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function(){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemStorage: function(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index){
                if(updatedItem.id === item.id){
                    items.splice(index, 1, updatedItem)
                } else {

                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemFromStorage: function(id){
        let items = JSON.parse(localStorage.getItem('items'));
        
        items.forEach(function(item, index){
            if(id === item.id){
            items.splice(index, 1);
            }
        });
        localStorage.setItem('items', JSON.stringify(items));
    },
        clearItemsFromStorage: function(){
        localStorage.removeItem('items');
    }
  }
})();

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
        items: StorageCtrl.getItemsFromStorage(),
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
        deleteItem: function(id){
            // Get ID's
            ids = data.items.map(function(item){
                return item.id;
            });

            // Get index
            const index = ids.indexOf(id);

            // Remove item
            data.items.splice(index, 1);
        },
        clearAllItems: function(){
            data.items = [];
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
        clearBtn: ".clear-btn",
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
        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
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
        removeItems: function(){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Turn node list into array
            listItems = Array.from(listItems);

            listItems.forEach(function(item){
                item.remove();
            });
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
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
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

        // Delete items
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // Back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        // Clear button event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);

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

            // Store in local storage
            StorageCtrl.storeItem(newItem);

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

        // Update local storage
        StorageCtrl.updateItemStorage(updatedItem);

        UICtrl.clearEditState();
    }

    // Delete Button Event
    const itemDeleteSubmit = function(e){
        // Get current item
        const currentItem = ItemCtrl.getCurrentItem();

        // Delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        // Get total units
        const totalUnits = ItemCtrl.getTotalUnits();
        // Add total units to UI
        UICtrl.showTotalUnits(totalUnits);

        // Delete from local storage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        UICtrl.clearEditState();

        e.preventDefault();
    };

    // Clear items
    const clearAllItemsClick = function(){
        // Delete all items from data structure
        ItemCtrl.clearAllItems();

        // Get total units
        const totalUnits = ItemCtrl.getTotalUnits();

        // Add total units to UI
        UICtrl.showTotalUnits(totalUnits);

        // Remove from UI
        UICtrl.removeItems();

        // Clear from Local Storage
        StorageCtrl.clearItemsFromStorage();

        // Hide list
        UICtrl.hideList();
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
    
})(ItemCtrl, StorageCtrl, UICtrl);


// Initialize App
App.init();