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
            {id: 0, name: "Guinness", units: 1.5},
            {id: 1, name: "Baby Guinness", units: 2},
            {id: 2, name: "Wine", units: 3}
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
            newItem = new Item(id, name, units);

            // Add to items array
            data.items.push(newItem);

            return newItem;
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
        addBtn: ".add-btn",
        itemNameInput: "#item-name",
        itemUnitInput: "#item-units"
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
                name: document.querySelector(UISelectors.itemNameInput.value),
                units: document.querySelector(UISelectors.itemUnitsInput.value)                
            }
        },
        addListItem: function(item){
            // Create LI element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = ` <strong>${item.name}: </strong> <em>${item.units} units</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>`;
            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
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
        }
        
        e.preventDefault();
    }

    // Public methods 
    return {
        init: function(){
            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // Populate list w/ items
            UICtrl.populateItemList(items);

            // Load event listener
            loadEventListeners();
        }
    }
    
})(ItemCtrl, UICtrl);


// Initialize App
App.init();