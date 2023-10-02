document.addEventListener('DOMContentLoaded', function() {
  var inventory;

  (function() {
    inventory = {
      lastId: 0,
      collection: [],

      setDate: function() {
        var date = new Date();
        let dateNode = document.querySelector("#order_date");
        dateNode.innerText = date.toUTCString();
      },

      cacheTemplate: function() {
        var iTmpl = document.querySelector("#inventory_item");
        this.template = Handlebars.compile(iTmpl.innerHTML);
      },

      add: function() {
        this.lastId++;
        var item = {
          id: this.lastId,
          name: "",
          stock_number: "",
          quantity: 1
        };
        this.collection.push(item);

        return item;
      },

      remove: function(idx) {
        this.collection = this.collection.filter(function(item) {
          return item.id !== idx;
        });
      },

      get: function(id) {
        var found_item;

        this.collection.forEach(function(item) {
          if (item.id === id) {
            found_item = item;
            return false;
          }
        });

        return found_item;
      },

      update: function(item) {
        var id = this.findID(item)
        let collectionItem = this.get(id);

        collectionItem.name = item.querySelector("[name^=item_name]").value;
        collectionItem.stock_number = item.querySelector("[name^=item_stock_number]").value;
        collectionItem.quantity = item.querySelector("[name^=item_quantity]").value;
      },

      newItem: function(e) {
        e.preventDefault();
        var item = this.add()
        let inventory = document.querySelector("#inventory tbody");
        inventory.insertAdjacentHTML('beforeend', this.template(item).trim());
      },

      findParent: function(e) {
        let currentNode = e.target;

        while (currentNode.tagName !== 'TR') {
          currentNode = currentNode.parentElement;
        };

        return currentNode;
      },

      findID: function(item) {
        let idInput = item.querySelector("input[type=hidden]");
        return Number(idInput.value); 
      },

      deleteItem: function(e) {
        e.preventDefault();
        let item = this.findParent(e);
        this.remove(this.findID(item));
        item.remove();
      },

      updateItem: function(e) {
        var item = this.findParent(e);

        this.update(item);
      },

      bindEvents: function() {
        let addItem = document.querySelector("#add_item");
        addItem.addEventListener("click", this.newItem.bind(this));

        let inventory = document.querySelector("#inventory");
        inventory.addEventListener("click", event => {
          if (event.target.tagName === "A" && event.target.classList.contains("delete")) {
            this.deleteItem.call(this, event);
          }
        });

        inventory.addEventListener("blur", event => {
          if (event.target.tagName === "INPUT") {
            this.updateItem.call(this, event);
          }
        });
      },

      init: function() {
        this.setDate();
        this.cacheTemplate();
        this.bindEvents();
      }
    };
  })();

  inventory.init.call(inventory);
});
