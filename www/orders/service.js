(function() {
  'use strict';

  angular.module('oms.orders')
    .service('OrdersService', OrdersService);

  OrdersService.$inject = ['$q'];

  function OrdersService($q){
    this.statuses = [
      {
        id: 'quotation',
        title: 'Quotation'
      },
      {
        id: 'ready for design',
        title: 'Ready for Design'
      },
      {
        id: 'on proof',
        title: 'On Proof'
      },
      {
        id: 'ready to print',
        title: 'Ready To Print'
      },
      {
        id: 'finishing',
        title: 'Finishing'
      },
      {
        id: 'completed',
        title: 'Completed'
      }
    ];

    this.datasets = [
      {
        id: 'current',
        title: 'Current'
      },
      {
        id: 'archive',
        title: 'Archive'
      }
    ];

    var _this = this;

    this.getAll = function(dataset) {

      if(dataset.id == 'archive'){
        return dpd.ordersarchive.get();
      }
      else {
        return dpd.orders.get()
      }
    };

    this.add = function(order) {
      return dpd.orders.post(angular.copy(order));
    };

    this.update = function(order) {
      var items = [];
      order.items.forEach(function(item){
        items.push({
          label: item.label,
          quantity: item.quantity,
          unitPrice: item.unitPrice
        });
      });

      return dpd.orders.put(order.id, {
        customer: {
          id: order.customer.id,
          name: order.customer.name
        },
        orderDate: order.orderDate,
        dueDate: order.dueDate,
        status: order.status,
        items: items,
        total: order.total,
        vat: order.vat,
        totalDue: order.totalDue,
        ref: order.ref,
        vatOption: order.vatOption
      });
    };

    this.remove = function(order) {
      return dpd.orders.del(order.id);
    };

    this.archive = function(order) {
      var newOrder = angular.copy(order);
      newOrder.id = null;
      return dpd.ordersarchive.post(newOrder).then(
        function success(res){
          return dpd.orders.del(order.id);
        });
    }
  }
})();
