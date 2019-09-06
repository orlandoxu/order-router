"use strict";

const _routes = Symbol('routes');
const _all_orders = Symbol('all_orders');
const _common_routes = Symbol('common_routes');
const _routes_result = Symbol('routes_result');
const _func_index = Symbol('func_index');

class Router {
  constructor() {
    this[_routes] = [];
    this[_common_routes] = [];
    this[_all_orders] = {};
    this[_routes_result] = {};
    this[_func_index] = 0;
  }

  use(func) {
    this[_routes].push({idx: this[_func_index]++, func});
  }

  all() {
    const orders = [];
    const funcs = [];
    for (let i = 0; i < arguments.length; i++) {
      if (typeof arguments[i] == 'string') {
        this[_all_orders][arguments[i]] = true;
        orders.push(arguments[i]);
        continue;
      }
      if (typeof arguments[i] == 'function') {
        funcs.push(arguments[i]);
        continue;
      }
    }
    if (orders.length === 0 || funcs.length === 0) {
      return;
    }

    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < funcs.length; j++) {
        this[_routes].push({idx: this[_func_index]++, func: funcs[j], order: orders[i]});
      }
    }
  };

  routes(order) {
    if (!this[_all_orders][order]) {
      return [];
    }
    if (!this[_routes_result][order]) {
      let route = [];
      for (let i = 0; i < this[_routes].length; i++) {
        if (!this[_routes][i].order || this[_routes][i].order == order) {
          route.push(this[_routes][i].func);
          continue
        }
      }
      this[_routes_result][order] = route;
    }
    return this[_routes_result][order];
  }
}

module.exports = Router;
