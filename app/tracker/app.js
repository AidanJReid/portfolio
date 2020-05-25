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
        logData: function(){
            return data;
        }
    }
})();



// UI controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: "#item-list"
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
        }
    }

})();



// App controller
const App = (function(ItemCtrl, UICtrl){

    // Public methods 
    return {
        init: function(){
            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // Populate list w/ items
            UICtrl.populateItemList(items);
        }
    }
    
})(ItemCtrl, UICtrl);


// Initialize App
App.init();