var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// mol/ambient/ambient.ts
var $mol_ambient_ref = Symbol("$mol_ambient_ref");
function $mol_ambient(overrides) {
  return Object.setPrototypeOf(overrides, this || $);
}
__name($mol_ambient, "$mol_ambient");

// mol/delegate/delegate.ts
var instances = /* @__PURE__ */ new WeakSet();
function $mol_delegate(proto, target) {
  const proxy = new Proxy(proto, {
    get: (_, field) => {
      const obj = target();
      let val = Reflect.get(obj, field);
      if (typeof val === "function") {
        val = val.bind(obj);
      }
      return val;
    },
    has: (_, field) => Reflect.has(target(), field),
    set: (_, field, value) => Reflect.set(target(), field, value),
    getOwnPropertyDescriptor: (_, field) => Reflect.getOwnPropertyDescriptor(target(), field),
    ownKeys: () => Reflect.ownKeys(target()),
    getPrototypeOf: () => Reflect.getPrototypeOf(target()),
    setPrototypeOf: (_, donor) => Reflect.setPrototypeOf(target(), donor),
    isExtensible: () => Reflect.isExtensible(target()),
    preventExtensions: () => Reflect.preventExtensions(target()),
    apply: (_, self2, args) => Reflect.apply(target(), self2, args),
    construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
    defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
    deleteProperty: (_, field) => Reflect.deleteProperty(target(), field)
  });
  instances.add(proxy);
  return proxy;
}
__name($mol_delegate, "$mol_delegate");
Reflect.defineProperty(
  $mol_delegate,
  Symbol.hasInstance,
  {
    value: (obj) => instances.has(obj)
  }
);

// mol/owning/owning.ts
$.$mol_delegate = $mol_delegate;
var $mol_owning_map = /* @__PURE__ */ new WeakMap();
function $mol_owning_allow(having) {
  try {
    if (!having)
      return false;
    if (typeof having !== "object" && typeof having !== "function")
      return false;
    if (having instanceof $mol_delegate)
      return false;
    if (typeof having["destructor"] !== "function")
      return false;
    return true;
  } catch {
    return false;
  }
}
__name($mol_owning_allow, "$mol_owning_allow");
function $mol_owning_get(having, Owner) {
  if (!$mol_owning_allow(having))
    return null;
  while (true) {
    const owner = $mol_owning_map.get(having);
    if (!owner)
      return owner;
    if (!Owner)
      return owner;
    if (owner instanceof Owner)
      return owner;
    having = owner;
  }
}
__name($mol_owning_get, "$mol_owning_get");
function $mol_owning_check(owner, having) {
  if (!$mol_owning_allow(having))
    return false;
  if ($mol_owning_map.get(having) !== owner)
    return false;
  return true;
}
__name($mol_owning_check, "$mol_owning_check");
function $mol_owning_catch(owner, having) {
  if (!$mol_owning_allow(having))
    return false;
  if ($mol_owning_map.get(having))
    return false;
  $mol_owning_map.set(having, owner);
  return true;
}
__name($mol_owning_catch, "$mol_owning_catch");

// mol/fail/hidden/hidden.ts
function $mol_fail_hidden(error) {
  throw error;
}
__name($mol_fail_hidden, "$mol_fail_hidden");

// mol/func/name/name.ts
var named = /* @__PURE__ */ new WeakSet();
function $mol_func_name(func) {
  let name = func.name;
  if (name?.length > 1)
    return name;
  if (named.has(func))
    return name;
  for (let key in this) {
    try {
      if (this[key] !== func)
        continue;
      name = key;
      Object.defineProperty(func, "name", { value: name });
      break;
    } catch {
    }
  }
  named.add(func);
  return name;
}
__name($mol_func_name, "$mol_func_name");

// mol/object2/object2.ts
$.$mol_ambient_ref = $mol_ambient_ref;
$.$mol_owning_get = $mol_owning_get;
$.$mol_fail_hidden = $mol_fail_hidden;
$.$mol_func_name = $mol_func_name;
var $mol_object2 = class _$mol_object2 {
  static {
    __name(this, "$mol_object2");
  }
  static $ = $;
  [Symbol.toStringTag];
  [$mol_ambient_ref] = null;
  get $() {
    if (this[$mol_ambient_ref])
      return this[$mol_ambient_ref];
    const owner = $mol_owning_get(this);
    return this[$mol_ambient_ref] = owner?.$ || _$mol_object2.$;
  }
  set $(next) {
    if (this[$mol_ambient_ref])
      $mol_fail_hidden(new Error("Context already defined"));
    this[$mol_ambient_ref] = next;
  }
  static create(init) {
    const obj = new this();
    if (init)
      init(obj);
    return obj;
  }
  static [Symbol.toPrimitive]() {
    return this.toString();
  }
  static toString() {
    return this[Symbol.toStringTag] || this.$.$mol_func_name(this);
  }
  static toJSON() {
    return this.toString();
  }
  destructor() {
  }
  static destructor() {
  }
  //[ Symbol.toPrimitive ]( hint: string ) {
  //	return hint === 'number' ? this.valueOf() : this.toString()
  //}
  toString() {
    return this[Symbol.toStringTag] || this.constructor.name + "<>";
  }
  // toJSON(): any {
  // 	return this.toString()
  // }
};

// mol/object/object.ts
$.$mol_object2 = $mol_object2;
var $mol_object_field = Symbol("$mol_object_field");
var $mol_object = class extends $mol_object2 {
  static {
    __name(this, "$mol_object");
  }
  static make(config) {
    return super.create((obj) => {
      for (let key in config)
        obj[key] = config[key];
    });
  }
};

// mol/fail/fail.ts
function $mol_fail(error) {
  throw error;
}
__name($mol_fail, "$mol_fail");

// mol/wire/wire.ts
var $mol_wire_auto_sub = null;
function $mol_wire_auto(next = $mol_wire_auto_sub) {
  return $mol_wire_auto_sub = next;
}
__name($mol_wire_auto, "$mol_wire_auto");

// mol/wire/cursor/cursor.ts
var $mol_wire_cursor = /* @__PURE__ */ (($mol_wire_cursor2) => {
  $mol_wire_cursor2[$mol_wire_cursor2["stale"] = -1] = "stale";
  $mol_wire_cursor2[$mol_wire_cursor2["doubt"] = -2] = "doubt";
  $mol_wire_cursor2[$mol_wire_cursor2["fresh"] = -3] = "fresh";
  $mol_wire_cursor2[$mol_wire_cursor2["final"] = -4] = "final";
  return $mol_wire_cursor2;
})($mol_wire_cursor || {});

// mol/wire/pub/pub.ts
$.$mol_fail = $mol_fail;
$.$mol_wire_auto = $mol_wire_auto;
$.$mol_wire_cursor = $mol_wire_cursor;
var $mol_wire_pub = class extends Object {
  static {
    __name(this, "$mol_wire_pub");
  }
  data = [];
  // Derived objects should be Arrays.
  static get [Symbol.species]() {
    return Array;
  }
  /**
   * Index of first subscriber.
   */
  sub_from = 0;
  // 4B
  /**
   * All current subscribers.
   */
  get sub_list() {
    const res = [];
    for (let i = this.sub_from; i < this.data.length; i += 2) {
      res.push(this.data[i]);
    }
    return res;
  }
  /**
   * Has any subscribers or not.
   */
  get sub_empty() {
    return this.sub_from === this.data.length;
  }
  /**
   * Subscribe subscriber to this publisher events and return position of subscriber that required to unsubscribe.
   */
  sub_on(sub2, pub_pos) {
    const pos = this.data.length;
    this.data.push(sub2, pub_pos);
    return pos;
  }
  /**
   * Unsubscribe subscriber from this publisher events by subscriber position provided by `on(pub)`.
   */
  sub_off(sub_pos) {
    if (!(sub_pos < this.data.length)) {
      $mol_fail(new Error(`Wrong pos ${sub_pos}`));
    }
    const end = this.data.length - 2;
    if (sub_pos !== end) {
      this.peer_move(end, sub_pos);
    }
    this.data.pop();
    this.data.pop();
    if (this.data.length === this.sub_from)
      this.reap();
  }
  /**
   * Called when last sub was unsubscribed.
   **/
  reap() {
  }
  /**
   * Autowire this publisher with current subscriber.
   **/
  promote() {
    $mol_wire_auto()?.track_next(this);
  }
  /**
   * Enforce actualization. Should not throw errors.
   */
  fresh() {
  }
  /**
   * Allow to put data to caches in the subtree.
   */
  complete() {
  }
  get incompleted() {
    return false;
  }
  /**
   * Notify subscribers about self changes.
   */
  emit(quant = -1 /* stale */) {
    for (let i = this.sub_from; i < this.data.length; i += 2) {
      ;
      this.data[i].absorb(quant);
    }
  }
  /**
   * Moves peer from one position to another. Doesn't clear data at old position!
   */
  peer_move(from_pos, to_pos) {
    const peer = this.data[from_pos];
    const self_pos = this.data[from_pos + 1];
    this.data[to_pos] = peer;
    this.data[to_pos + 1] = self_pos;
    peer.peer_repos(self_pos, to_pos);
  }
  /**
   * Updates self position in the peer.
   */
  peer_repos(peer_pos, self_pos) {
    this.data[peer_pos + 1] = self_pos;
  }
};

// mol/dev/format/format.ts
$["devtoolsFormatters"] ||= [];
function $mol_dev_format_register(config) {
  $["devtoolsFormatters"].push(config);
}
__name($mol_dev_format_register, "$mol_dev_format_register");
var $mol_dev_format_head = Symbol("$mol_dev_format_head");
var $mol_dev_format_body = Symbol("$mol_dev_format_body");
$mol_dev_format_register({
  header: (val, config = false) => {
    if (config)
      return null;
    if (!val)
      return null;
    if ($mol_dev_format_head in val) {
      try {
        return val[$mol_dev_format_head]();
      } catch (error) {
        return $mol_dev_format_accent($mol_dev_format_native(val), "\u{1F4A8}", $mol_dev_format_native(error), "");
      }
    }
    if (typeof val === "function") {
      return $mol_dev_format_native(val);
    }
    if (Symbol.toStringTag in val) {
      return $mol_dev_format_native(val);
    }
    return null;
  },
  hasBody: (val) => val[$mol_dev_format_body],
  body: (val) => val[$mol_dev_format_body]()
});
function $mol_dev_format_native(obj) {
  if (typeof obj === "undefined")
    return $mol_dev_format_shade("undefined");
  return [
    "object",
    {
      object: obj,
      config: true
    }
  ];
}
__name($mol_dev_format_native, "$mol_dev_format_native");
function $mol_dev_format_auto(obj) {
  if (obj == null)
    return $mol_dev_format_shade(String(obj));
  return [
    "object",
    {
      object: obj,
      config: false
    }
  ];
}
__name($mol_dev_format_auto, "$mol_dev_format_auto");
function $mol_dev_format_element(element, style, ...content) {
  const styles = [];
  for (let key in style)
    styles.push(`${key} : ${style[key]}`);
  return [
    element,
    {
      style: styles.join(" ; ")
    },
    ...content
  ];
}
__name($mol_dev_format_element, "$mol_dev_format_element");
function $mol_dev_format_span(style, ...content) {
  return $mol_dev_format_element(
    "span",
    {
      // 'vertical-align' : '8%',
      ...style
    },
    ...content
  );
}
__name($mol_dev_format_span, "$mol_dev_format_span");
var $mol_dev_format_div = $mol_dev_format_element.bind(null, "div");
var $mol_dev_format_ol = $mol_dev_format_element.bind(null, "ol");
var $mol_dev_format_li = $mol_dev_format_element.bind(null, "li");
var $mol_dev_format_table = $mol_dev_format_element.bind(null, "table");
var $mol_dev_format_tr = $mol_dev_format_element.bind(null, "tr");
var $mol_dev_format_td = $mol_dev_format_element.bind(null, "td");
var $mol_dev_format_accent = $mol_dev_format_span.bind(null, {
  "color": "magenta"
});
var $mol_dev_format_strong = $mol_dev_format_span.bind(null, {
  "font-weight": "bold"
});
var $mol_dev_format_string = $mol_dev_format_span.bind(null, {
  "color": "green"
});
var $mol_dev_format_shade = $mol_dev_format_span.bind(null, {
  "color": "gray"
});
var $mol_dev_format_indent = $mol_dev_format_div.bind(null, {
  "margin-left": "13px"
});

// mol/wire/pub/sub/sub.ts
$.$mol_wire_pub = $mol_wire_pub;
$.$mol_wire_cursor = $mol_wire_cursor;
$.$mol_wire_auto = $mol_wire_auto;
$.$mol_fail = $mol_fail;
$.$mol_dev_format_head = $mol_dev_format_head;
$.$mol_dev_format_native = $mol_dev_format_native;
var $mol_wire_pub_sub = class extends $mol_wire_pub {
  static {
    __name(this, "$mol_wire_pub_sub");
  }
  pub_from = 0;
  // 4B
  cursor = -1 /* stale */;
  // 4B
  get temp() {
    return false;
  }
  get pub_list() {
    const res = [];
    const max = this.cursor >= 0 ? this.cursor : this.sub_from;
    for (let i = this.pub_from; i < max; i += 2) {
      if (this.data[i])
        res.push(this.data[i]);
    }
    return res;
  }
  track_on() {
    this.cursor = this.pub_from;
    const sub2 = $mol_wire_auto();
    $mol_wire_auto(this);
    return sub2;
  }
  promote() {
    if (this.cursor >= this.pub_from) {
      $mol_fail(new Error("Circular subscription"));
    }
    super.promote();
  }
  track_next(pub) {
    if (this.cursor < 0)
      $mol_fail(new Error("Promo to non begun sub"));
    if (this.cursor < this.sub_from) {
      const next = this.data[this.cursor];
      if (pub === void 0)
        return next ?? null;
      if (next === pub) {
        this.cursor += 2;
        return next;
      }
      if (next) {
        if (this.sub_from < this.data.length) {
          this.peer_move(this.sub_from, this.data.length);
        }
        this.peer_move(this.cursor, this.sub_from);
        this.sub_from += 2;
      }
    } else {
      if (pub === void 0)
        return null;
      if (this.sub_from < this.data.length) {
        this.peer_move(this.sub_from, this.data.length);
      }
      this.sub_from += 2;
    }
    this.data[this.cursor] = pub;
    this.data[this.cursor + 1] = pub.sub_on(this, this.cursor);
    this.cursor += 2;
    return pub;
  }
  track_off(sub2) {
    $mol_wire_auto(sub2);
    if (this.cursor < 0) {
      $mol_fail(new Error("End of non begun sub"));
    }
    for (let cursor = this.pub_from; cursor < this.cursor; cursor += 2) {
      const pub = this.data[cursor];
      pub.fresh();
    }
    this.cursor = -3 /* fresh */;
  }
  pub_off(sub_pos) {
    this.data[sub_pos] = void 0;
    this.data[sub_pos + 1] = void 0;
  }
  destructor() {
    for (let cursor = this.data.length - 2; cursor >= this.sub_from; cursor -= 2) {
      const sub2 = this.data[cursor];
      const pos = this.data[cursor + 1];
      sub2.pub_off(pos);
      this.data.pop();
      this.data.pop();
    }
    this.cursor = this.pub_from;
    this.track_cut();
    this.cursor = -4 /* final */;
  }
  track_cut() {
    if (this.cursor < this.pub_from) {
      $mol_fail(new Error("Cut of non begun sub"));
    }
    let tail = 0;
    for (let cursor = this.cursor; cursor < this.sub_from; cursor += 2) {
      const pub = this.data[cursor];
      pub?.sub_off(this.data[cursor + 1]);
      if (this.sub_from < this.data.length) {
        this.peer_move(this.data.length - 2, cursor);
        this.data.pop();
        this.data.pop();
      } else {
        ++tail;
      }
    }
    for (; tail; --tail) {
      this.data.pop();
      this.data.pop();
    }
    this.sub_from = this.cursor;
  }
  complete() {
  }
  complete_pubs() {
    const limit = this.cursor < 0 ? this.sub_from : this.cursor;
    for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
      const pub = this.data[cursor];
      if (pub?.incompleted)
        return;
    }
    for (let cursor = this.pub_from; cursor < limit; cursor += 2) {
      const pub = this.data[cursor];
      pub?.complete();
    }
  }
  absorb(quant = -1 /* stale */) {
    if (this.cursor === -4 /* final */)
      return;
    if (this.cursor >= quant)
      return;
    this.cursor = quant;
    this.emit(-2 /* doubt */);
  }
  [$mol_dev_format_head]() {
    return $mol_dev_format_native(this);
  }
  /**
   * Is subscribed to any publisher or not.
   */
  get pub_empty() {
    return this.sub_from === this.pub_from;
  }
};

// mol/after/frame/frame.web.ts
$.$mol_object2 = $mol_object2;
var $mol_after_frame = class _$mol_after_frame extends $mol_object2 {
  constructor(task) {
    super();
    this.task = task;
    this.promise = _$mol_after_frame.promise.then(() => {
      if (this.cancelled)
        return;
      task();
    });
  }
  static {
    __name(this, "$mol_after_frame");
  }
  static _promise = null;
  static get promise() {
    if (this._promise)
      return this._promise;
    return this._promise = new Promise((done) => {
      const complete = /* @__PURE__ */ __name(() => {
        this._promise = null;
        done();
      }, "complete");
      if (typeof requestAnimationFrame === "function") {
        requestAnimationFrame(complete);
      } else {
        setTimeout(complete, 16);
      }
    });
  }
  cancelled = false;
  promise;
  destructor() {
    this.cancelled = true;
  }
};

// mol/promise/like/like.ts
function $mol_promise_like(val) {
  return val && typeof val === "object" && "then" in val && typeof val.then === "function";
}
__name($mol_promise_like, "$mol_promise_like");

// mol/wire/fiber/fiber.ts
$.$mol_wire_pub_sub = $mol_wire_pub_sub;
$.$mol_after_frame = $mol_after_frame;
$.$mol_wire_cursor = $mol_wire_cursor;
$.$mol_promise_like = $mol_promise_like;
$.$mol_dev_format_head = $mol_dev_format_head;
$.$mol_dev_format_body = $mol_dev_format_body;
$.$mol_dev_format_native = $mol_dev_format_native;
$.$mol_dev_format_auto = $mol_dev_format_auto;
$.$mol_dev_format_div = $mol_dev_format_div;
$.$mol_dev_format_shade = $mol_dev_format_shade;
$.$mol_owning_check = $mol_owning_check;
$.$mol_wire_pub = $mol_wire_pub;
$.$mol_fail_hidden = $mol_fail_hidden;
var handled = /* @__PURE__ */ new WeakSet();
var $mol_wire_fiber = class _$mol_wire_fiber extends $mol_wire_pub_sub {
  constructor(id, task, host, args) {
    super();
    this.task = task;
    this.host = host;
    if (args)
      this.data.push(...args);
    this.pub_from = this.sub_from = args?.length ?? 0;
    this[Symbol.toStringTag] = id;
  }
  static {
    __name(this, "$mol_wire_fiber");
  }
  static warm = true;
  static planning = /* @__PURE__ */ new Set();
  static reaping = /* @__PURE__ */ new Set();
  static plan_task = null;
  static plan() {
    if (this.plan_task)
      return;
    this.plan_task = new $mol_after_frame(() => {
      try {
        this.sync();
      } finally {
        _$mol_wire_fiber.plan_task = null;
      }
    });
  }
  static sync() {
    while (this.planning.size) {
      for (const fiber of this.planning) {
        this.planning.delete(fiber);
        if (fiber.cursor >= 0)
          continue;
        if (fiber.cursor === -4 /* final */)
          continue;
        fiber.fresh();
      }
    }
    while (this.reaping.size) {
      const fibers = this.reaping;
      this.reaping = /* @__PURE__ */ new Set();
      for (const fiber of fibers) {
        if (!fiber.sub_empty)
          continue;
        fiber.destructor();
      }
    }
  }
  [Symbol.toStringTag];
  cache = void 0;
  get args() {
    return this.data.slice(0, this.pub_from);
  }
  result() {
    if ($mol_promise_like(this.cache))
      return;
    if (this.cache instanceof Error)
      return;
    return this.cache;
  }
  get incompleted() {
    return $mol_promise_like(this.cache);
  }
  field() {
    return this.task.name + "<>";
  }
  plan() {
    _$mol_wire_fiber.planning.add(this);
    _$mol_wire_fiber.plan();
  }
  reap() {
    _$mol_wire_fiber.reaping.add(this);
    _$mol_wire_fiber.plan();
  }
  toString() {
    return this[Symbol.toStringTag];
  }
  toJSON() {
    return this[Symbol.toStringTag];
  }
  [$mol_dev_format_head]() {
    const cursor = {
      [-1 /* stale */]: "\u{1F534}",
      [-2 /* doubt */]: "\u{1F7E1}",
      [-3 /* fresh */]: "\u{1F7E2}",
      [-4 /* final */]: "\u{1F535}"
    }[this.cursor] ?? this.cursor.toString();
    return $mol_dev_format_div(
      {},
      $mol_owning_check(this, this.cache) ? $mol_dev_format_auto({
        [$mol_dev_format_head]: () => $mol_dev_format_shade(cursor),
        [$mol_dev_format_body]: () => $mol_dev_format_native(this)
      }) : $mol_dev_format_shade($mol_dev_format_native(this), cursor),
      $mol_dev_format_auto(this.cache)
    );
  }
  get $() {
    return (this.host ?? this.task)["$"];
  }
  emit(quant = -1 /* stale */) {
    if (this.sub_empty)
      this.plan();
    else
      super.emit(quant);
  }
  fresh() {
    if (this.cursor === -3 /* fresh */)
      return;
    if (this.cursor === -4 /* final */)
      return;
    check:
      if (this.cursor === -2 /* doubt */) {
        for (let i = this.pub_from; i < this.sub_from; i += 2) {
          ;
          this.data[i]?.fresh();
          if (this.cursor !== -2 /* doubt */)
            break check;
        }
        this.cursor = -3 /* fresh */;
        return;
      }
    const bu = this.track_on();
    let result;
    try {
      switch (this.pub_from) {
        case 0:
          result = this.task.call(this.host);
          break;
        case 1:
          result = this.task.call(this.host, this.data[0]);
          break;
        default:
          result = this.task.call(this.host, ...this.args);
          break;
      }
      if ($mol_promise_like(result)) {
        const put = /* @__PURE__ */ __name((res) => {
          if (this.cache === result)
            this.put(res);
          return res;
        }, "put");
        result = Object.assign(result.then(put, put), {
          destructor: result["destructor"] ?? (() => {
          })
        });
        handled.add(result);
      }
    } catch (error) {
      if (error instanceof Error || $mol_promise_like(error)) {
        result = error;
      } else {
        result = new Error(String(error), { cause: error });
      }
      if ($mol_promise_like(result) && !handled.has(result)) {
        result = Object.assign(result.finally(() => {
          if (this.cache === result)
            this.absorb();
        }), {
          destructor: result["destructor"] ?? (() => {
          })
        });
        handled.add(result);
      }
    }
    if (!$mol_promise_like(result)) {
      this.track_cut();
    }
    this.track_off(bu);
    this.put(result);
  }
  refresh() {
    this.cursor = -1 /* stale */;
    this.fresh();
  }
  /**
   * Synchronous execution. Throws Promise when waits async task (SuspenseAPI provider).
   * Should be called inside SuspenseAPI consumer (ie fiber).
   */
  sync() {
    if (!_$mol_wire_fiber.warm) {
      return this.result();
    }
    this.promote();
    this.fresh();
    if (this.cache instanceof Error) {
      return $mol_fail_hidden(this.cache);
    }
    if ($mol_promise_like(this.cache)) {
      return $mol_fail_hidden(this.cache);
    }
    return this.cache;
  }
  /**
   * Asynchronous execution.
   * It's SuspenseAPI consumer. So SuspenseAPI providers can be called inside.
   */
  async async() {
    while (true) {
      this.fresh();
      if (this.cache instanceof Error) {
        $mol_fail_hidden(this.cache);
      }
      if (!$mol_promise_like(this.cache))
        return this.cache;
      await Promise.race([this.cache, this.step()]);
      if (!$mol_promise_like(this.cache))
        return this.cache;
      if (this.cursor === -4 /* final */) {
        await new Promise(() => {
        });
      }
    }
  }
  step() {
    return new Promise((done) => {
      const sub2 = new $mol_wire_pub_sub();
      const prev = sub2.track_on();
      sub2.track_next(this);
      sub2.track_off(prev);
      sub2.absorb = () => {
        done(null);
        sub2.destructor();
      };
    });
  }
};

// mol/guid/guid.ts
function $mol_guid(length = 8, exists = () => false) {
  for (; ; ) {
    let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
    if (exists(id))
      continue;
    return id;
  }
}
__name($mol_guid, "$mol_guid");

// mol/key/key.ts
$.$mol_guid = $mol_guid;
var $mol_key_store = /* @__PURE__ */ new WeakMap();
function $mol_key(value) {
  if (typeof value === "bigint")
    return value.toString() + "n";
  if (typeof value === "symbol")
    return value.description;
  if (!value)
    return JSON.stringify(value);
  if (typeof value !== "object" && typeof value !== "function")
    return JSON.stringify(value);
  return JSON.stringify(value, (field, value2) => {
    if (typeof value2 === "bigint")
      return value2.toString() + "n";
    if (typeof value2 === "symbol")
      return value2.description;
    if (!value2)
      return value2;
    if (typeof value2 !== "object" && typeof value2 !== "function")
      return value2;
    if (Array.isArray(value2))
      return value2;
    const proto = Reflect.getPrototypeOf(value2);
    if (!proto)
      return value2;
    if (Reflect.getPrototypeOf(proto) === null)
      return value2;
    if ("toJSON" in value2)
      return value2;
    if (value2 instanceof RegExp)
      return value2.toString();
    if (value2 instanceof Uint8Array)
      return [...value2];
    let key = $mol_key_store.get(value2);
    if (key)
      return key;
    key = $mol_guid();
    $mol_key_store.set(value2, key);
    return key;
  });
}
__name($mol_key, "$mol_key");

// mol/compare/deep/deep.ts
var $mol_compare_deep_cache = /* @__PURE__ */ new WeakMap();
function $mol_compare_deep(left, right) {
  if (Object.is(left, right))
    return true;
  if (left === null)
    return false;
  if (right === null)
    return false;
  if (typeof left !== "object")
    return false;
  if (typeof right !== "object")
    return false;
  const left_proto = Reflect.getPrototypeOf(left);
  const right_proto = Reflect.getPrototypeOf(right);
  if (left_proto !== right_proto)
    return false;
  if (left instanceof Boolean)
    return Object.is(left.valueOf(), right["valueOf"]());
  if (left instanceof Number)
    return Object.is(left.valueOf(), right["valueOf"]());
  if (left instanceof String)
    return Object.is(left.valueOf(), right["valueOf"]());
  if (left instanceof Date)
    return Object.is(left.valueOf(), right["valueOf"]());
  if (left instanceof RegExp)
    return left.source === right.source && left.flags === right.flags;
  if (left instanceof Error)
    return left.message === right.message && left.stack === right.stack;
  let left_cache = $mol_compare_deep_cache.get(left);
  if (left_cache) {
    const right_cache = left_cache.get(right);
    if (typeof right_cache === "boolean")
      return right_cache;
  } else {
    left_cache = new WeakMap([[right, true]]);
    $mol_compare_deep_cache.set(left, left_cache);
  }
  let result;
  try {
    if (!left_proto)
      result = compare_pojo(left, right);
    else if (!Reflect.getPrototypeOf(left_proto))
      result = compare_pojo(left, right);
    else if (Symbol.toPrimitive in left)
      result = compare_primitive(left, right);
    else if (Array.isArray(left))
      result = compare_array(left, right);
    else if (left instanceof Set)
      result = compare_set(left, right);
    else if (left instanceof Map)
      result = compare_map(left, right);
    else if (ArrayBuffer.isView(left))
      result = compare_buffer(left, right);
    else if (Symbol.iterator in left)
      result = compare_iterator(left[Symbol.iterator](), right[Symbol.iterator]());
    else
      result = false;
  } finally {
    left_cache.set(right, result);
  }
  return result;
}
__name($mol_compare_deep, "$mol_compare_deep");
function compare_array(left, right) {
  const len = left.length;
  if (len !== right.length)
    return false;
  for (let i = 0; i < len; ++i) {
    if (!$mol_compare_deep(left[i], right[i]))
      return false;
  }
  return true;
}
__name(compare_array, "compare_array");
function compare_buffer(left, right) {
  const len = left.byteLength;
  if (len !== right.byteLength)
    return false;
  if (left instanceof DataView)
    return compare_buffer(
      new Uint8Array(left.buffer, left.byteOffset, left.byteLength),
      new Uint8Array(right.buffer, left.byteOffset, left.byteLength)
    );
  for (let i = 0; i < len; ++i) {
    if (left[i] !== right[i])
      return false;
  }
  return true;
}
__name(compare_buffer, "compare_buffer");
function compare_iterator(left, right) {
  while (true) {
    const left_next = left.next();
    const right_next = right.next();
    if (left_next.done !== right_next.done)
      return false;
    if (left_next.done)
      break;
    if (!$mol_compare_deep(left_next.value, right_next.value))
      return false;
  }
  return true;
}
__name(compare_iterator, "compare_iterator");
function compare_set(left, right) {
  if (left.size !== right.size)
    return false;
  return compare_iterator(left.values(), right.values());
}
__name(compare_set, "compare_set");
function compare_map(left, right) {
  if (left.size !== right.size)
    return false;
  return compare_iterator(left.keys(), right.keys()) && compare_iterator(left.values(), right.values());
}
__name(compare_map, "compare_map");
function compare_pojo(left, right) {
  const left_keys = Object.getOwnPropertyNames(left);
  const right_keys = Object.getOwnPropertyNames(right);
  if (!compare_array(left_keys, right_keys))
    return false;
  for (let key of left_keys) {
    if (!$mol_compare_deep(left[key], right[key]))
      return false;
  }
  const left_syms = Object.getOwnPropertySymbols(left);
  const right_syms = Object.getOwnPropertySymbols(right);
  if (!compare_array(left_syms, right_syms))
    return false;
  for (let key of left_syms) {
    if (!$mol_compare_deep(left[key], right[key]))
      return false;
  }
  return true;
}
__name(compare_pojo, "compare_pojo");
function compare_primitive(left, right) {
  return Object.is(
    left[Symbol.toPrimitive]("default"),
    right[Symbol.toPrimitive]("default")
  );
}
__name(compare_primitive, "compare_primitive");

// mol/log3/log3.web.ts
$.$mol_log3_stack = $mol_log3_stack;
$.$mol_log3_come = $mol_log3_come;
$.$mol_log3_done = $mol_log3_done;
$.$mol_log3_fail = $mol_log3_fail;
$.$mol_log3_warn = $mol_log3_warn;
$.$mol_log3_rise = $mol_log3_rise;
$.$mol_log3_area = $mol_log3_area;
function $mol_log3_web_make(level, color) {
  return /* @__PURE__ */ __name(function $mol_log3_logger(event) {
    const pending = this.$mol_log3_stack.pop();
    if (pending)
      pending();
    let tpl = "%c";
    const chunks = Object.values(event);
    for (let i = 0; i < chunks.length; ++i) {
      tpl += typeof chunks[i] === "string" ? " \u25AB %s" : " \u25AB %o";
    }
    const style = `color:${color};font-weight:bolder`;
    this.console[level](tpl, style, ...chunks);
    const self2 = this;
    return () => self2.console.groupEnd();
  }, "$mol_log3_logger");
}
__name($mol_log3_web_make, "$mol_log3_web_make");
$.$mol_log3_come = $mol_log3_web_make("info", "royalblue");
$.$mol_log3_done = $mol_log3_web_make("info", "forestgreen");
$.$mol_log3_fail = $mol_log3_web_make("error", "orangered");
$.$mol_log3_warn = $mol_log3_web_make("warn", "goldenrod");
$.$mol_log3_rise = $mol_log3_web_make("log", "magenta");
$.$mol_log3_area = $mol_log3_web_make("group", "cyan");

// mol/log3/log3.ts
var $mol_log3_come;
var $mol_log3_done;
var $mol_log3_fail;
var $mol_log3_warn;
var $mol_log3_rise;
var $mol_log3_area;
var $mol_log3_stack = [];

// mol/wire/task/task.ts
$.$mol_wire_fiber = $mol_wire_fiber;
$.$mol_wire_auto = $mol_wire_auto;
$.$mol_compare_deep = $mol_compare_deep;
$.$mol_log3_warn = $mol_log3_warn;
$.$mol_promise_like = $mol_promise_like;
$.$mol_wire_cursor = $mol_wire_cursor;
var $mol_wire_task = class _$mol_wire_task extends $mol_wire_fiber {
  static {
    __name(this, "$mol_wire_task");
  }
  static getter(task) {
    return /* @__PURE__ */ __name(function $mol_wire_task_get(host, args) {
      const sub2 = $mol_wire_auto();
      const existen = sub2?.track_next();
      reuse:
        if (existen) {
          if (!existen.temp)
            break reuse;
          if (existen.host !== host)
            break reuse;
          if (existen.task !== task)
            break reuse;
          if (!$mol_compare_deep(existen.args, args))
            break reuse;
          return existen;
        }
      const next = new _$mol_wire_task(`${host?.[Symbol.toStringTag] ?? host}.${task.name}<#>`, task, host, args);
      if (existen?.temp) {
        $$.$mol_log3_warn({
          place: "$mol_wire_task",
          message: `Non idempotency`,
          existen,
          next,
          hint: "Ignore it"
        });
      }
      return next;
    }, "$mol_wire_task_get");
  }
  get temp() {
    return true;
  }
  complete() {
    if ($mol_promise_like(this.cache))
      return;
    this.destructor();
  }
  put(next) {
    const prev = this.cache;
    this.cache = next;
    if ($mol_promise_like(next)) {
      this.cursor = -3 /* fresh */;
      if (next !== prev)
        this.emit();
      return next;
    }
    this.cursor = -4 /* final */;
    if (this.sub_empty)
      this.destructor();
    else if (next !== prev)
      this.emit();
    return next;
  }
};

// mol/wire/method/method.ts
$.$mol_wire_task = $mol_wire_task;
function $mol_wire_method(host, field, descr) {
  if (!descr)
    descr = Reflect.getOwnPropertyDescriptor(host, field);
  const orig = descr?.value ?? host[field];
  const sup = Reflect.getPrototypeOf(host);
  if (typeof sup[field] === "function") {
    Object.defineProperty(orig, "name", { value: sup[field].name });
  }
  const temp = $mol_wire_task.getter(orig);
  const value = /* @__PURE__ */ __name(function(...args) {
    const fiber = temp(this ?? null, args);
    return fiber.sync();
  }, "value");
  Object.defineProperty(value, "name", { value: orig.name + " " });
  Object.assign(value, { orig });
  const descr2 = { ...descr, value };
  Reflect.defineProperty(host, field, descr2);
  return descr2;
}
__name($mol_wire_method, "$mol_wire_method");

// mol/fail/catch/catch.ts
$.$mol_promise_like = $mol_promise_like;
$.$mol_fail_hidden = $mol_fail_hidden;
var catched = /* @__PURE__ */ new WeakMap();
function $mol_fail_catch(error) {
  if (typeof error !== "object")
    return false;
  if ($mol_promise_like(error))
    $mol_fail_hidden(error);
  if (catched.get(error))
    return false;
  catched.set(error, true);
  return true;
}
__name($mol_fail_catch, "$mol_fail_catch");

// mol/fail/log/log.ts
$.$mol_promise_like = $mol_promise_like;
$.$mol_fail_catch = $mol_fail_catch;
function $mol_fail_log(error) {
  if ($mol_promise_like(error))
    return false;
  if (!$mol_fail_catch(error))
    return false;
  console.error(error);
  return true;
}
__name($mol_fail_log, "$mol_fail_log");

// mol/wire/atom/atom.ts
$.$mol_wire_fiber = $mol_wire_fiber;
$.$mol_func_name = $mol_func_name;
$.$mol_key = $mol_key;
$.$mol_after_frame = $mol_after_frame;
$.$mol_wire_cursor = $mol_wire_cursor;
$.$mol_wire_method = $mol_wire_method;
$.$mol_wire_auto = $mol_wire_auto;
$.$mol_owning_check = $mol_owning_check;
$.$mol_owning_catch = $mol_owning_catch;
$.$mol_compare_deep = $mol_compare_deep;
$.$mol_fail_log = $mol_fail_log;
$.$mol_promise_like = $mol_promise_like;
var _$mol_wire_atom = class _$mol_wire_atom extends $mol_wire_fiber {
  static {
    __name(this, "$mol_wire_atom");
  }
  static solo(host, task) {
    const field = task.name + "<>";
    const existen = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
    if (existen)
      return existen;
    const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
    const key = `${prefix}.${field}`;
    const fiber = new _$mol_wire_atom(key, task, host, []);
    (host ?? task)[field] = fiber;
    return fiber;
  }
  static plex(host, task, key) {
    const field = task.name + "<>";
    let dict = Object.getOwnPropertyDescriptor(host ?? task, field)?.value;
    const prefix = host?.[Symbol.toStringTag] ?? (host instanceof Function ? $$.$mol_func_name(host) : host);
    const key_str = $mol_key(key);
    if (dict) {
      const existen = dict.get(key_str);
      if (existen)
        return existen;
    } else {
      dict = (host ?? task)[field] = /* @__PURE__ */ new Map();
    }
    const id = `${prefix}.${task.name}<${key_str.replace(/^"|"$/g, "'")}>`;
    const fiber = new _$mol_wire_atom(id, task, host, [key]);
    dict.set(key_str, fiber);
    return fiber;
  }
  static watching = /* @__PURE__ */ new Set();
  static watcher = null;
  static watch() {
    _$mol_wire_atom.watcher = new $mol_after_frame(_$mol_wire_atom.watch);
    for (const atom of _$mol_wire_atom.watching) {
      if (atom.cursor === -4 /* final */) {
        _$mol_wire_atom.watching.delete(atom);
      } else {
        atom.cursor = -1 /* stale */;
        atom.fresh();
      }
    }
  }
  watch() {
    if (!_$mol_wire_atom.watcher) {
      _$mol_wire_atom.watcher = new $mol_after_frame(_$mol_wire_atom.watch);
    }
    _$mol_wire_atom.watching.add(this);
  }
  resync(args) {
    return this.put(this.task.call(this.host, ...args));
  }
  once() {
    return this.sync();
  }
  channel() {
    return Object.assign((next) => {
      if (next !== void 0)
        return this.resync([...this.args, next]);
      if (!$mol_wire_fiber.warm)
        return this.result();
      if ($mol_wire_auto()?.temp) {
        return this.once();
      } else {
        return this.sync();
      }
    }, { atom: this });
  }
  destructor() {
    super.destructor();
    const prev = this.cache;
    if ($mol_owning_check(this, prev)) {
      prev.destructor();
    }
    if (this.pub_from === 0) {
      ;
      (this.host ?? this.task)[this.field()] = null;
    } else {
      ;
      (this.host ?? this.task)[this.field()].delete($mol_key(this.args[0]));
    }
  }
  put(next) {
    const prev = this.cache;
    update:
      if (next !== prev) {
        try {
          if ($mol_compare_deep(prev, next))
            break update;
        } catch (error) {
          $mol_fail_log(error);
        }
        if ($mol_owning_check(this, prev)) {
          prev.destructor();
        }
        if ($mol_owning_catch(this, next)) {
          try {
            next[Symbol.toStringTag] = this[Symbol.toStringTag];
          } catch {
            Object.defineProperty(next, Symbol.toStringTag, { value: this[Symbol.toStringTag] });
          }
        }
        if (!this.sub_empty)
          this.emit();
      }
    this.cache = next;
    this.cursor = -3 /* fresh */;
    if ($mol_promise_like(next))
      return next;
    this.complete_pubs();
    return next;
  }
};
__decorateClass([
  $mol_wire_method
], _$mol_wire_atom.prototype, "resync", 1);
__decorateClass([
  $mol_wire_method
], _$mol_wire_atom.prototype, "once", 1);
var $mol_wire_atom = _$mol_wire_atom;

// mol/wire/solo/solo.ts
$.$mol_wire_atom = $mol_wire_atom;
$.$mol_wire_fiber = $mol_wire_fiber;
$.$mol_wire_auto = $mol_wire_auto;
function $mol_wire_solo(host, field, descr) {
  if (!descr)
    descr = Reflect.getOwnPropertyDescriptor(host, field);
  const orig = descr?.value ?? host[field];
  const sup = Reflect.getPrototypeOf(host);
  if (typeof sup[field] === "function") {
    Object.defineProperty(orig, "name", { value: sup[field].name });
  }
  const descr2 = {
    ...descr,
    value: function(...args) {
      let atom = $mol_wire_atom.solo(this, orig);
      if (args.length === 0 || args[0] === void 0) {
        if (!$mol_wire_fiber.warm)
          return atom.result();
        if ($mol_wire_auto()?.temp) {
          return atom.once();
        } else {
          return atom.sync();
        }
      }
      return atom.resync(args);
    }
  };
  Reflect.defineProperty(descr2.value, "name", { value: orig.name + " " });
  Reflect.defineProperty(descr2.value, "length", { value: orig.length });
  Object.assign(descr2.value, { orig });
  Reflect.defineProperty(host, field, descr2);
  return descr2;
}
__name($mol_wire_solo, "$mol_wire_solo");

// mol/wire/plex/plex.ts
$.$mol_wire_atom = $mol_wire_atom;
$.$mol_wire_fiber = $mol_wire_fiber;
$.$mol_wire_auto = $mol_wire_auto;
function $mol_wire_plex(host, field, descr) {
  if (!descr)
    descr = Reflect.getOwnPropertyDescriptor(host, field);
  const orig = descr?.value ?? host[field];
  const sup = Reflect.getPrototypeOf(host);
  if (typeof sup[field] === "function") {
    Object.defineProperty(orig, "name", { value: sup[field].name });
  }
  const descr2 = {
    ...descr,
    value: function(...args) {
      let atom = $mol_wire_atom.plex(this, orig, args[0]);
      if (args.length === 1 || args[1] === void 0) {
        if (!$mol_wire_fiber.warm)
          return atom.result();
        if ($mol_wire_auto()?.temp) {
          return atom.once();
        } else {
          return atom.sync();
        }
      }
      return atom.resync(args);
    }
  };
  Reflect.defineProperty(descr2.value, "name", { value: orig.name + " " });
  Reflect.defineProperty(descr2.value, "length", { value: orig.length });
  Object.assign(descr2.value, { orig });
  Reflect.defineProperty(host, field, descr2);
  return descr2;
}
__name($mol_wire_plex, "$mol_wire_plex");

// mol/mem/mem.ts
$.$mol_wire_solo = $mol_wire_solo;
$.$mol_wire_plex = $mol_wire_plex;
var $mol_mem = $mol_wire_solo;
var $mol_mem_key = $mol_wire_plex;

// mol/window/window.web.ts
$.$mol_object = $mol_object;
$.$mol_mem = $mol_mem;
var $mol_window = class extends $mol_object {
  static {
    __name(this, "$mol_window");
  }
  static size() {
    this.resizes();
    return {
      width: self.innerWidth,
      height: self.innerHeight
    };
  }
  static resizes(next) {
    return next;
  }
};
__decorateClass([
  $mol_mem
], $mol_window, "size", 1);
__decorateClass([
  $mol_mem
], $mol_window, "resizes", 1);
self.addEventListener("resize", (event) => $mol_window.resizes(event));

// mol/dom/context/context.ts
var $mol_dom_context = window;

// mol/dom/context/context.web.ts
$.$mol_dom_context = $mol_dom_context;
$.$mol_dom_context = self;

// mol/after/tick/tick.ts
$.$mol_object2 = $mol_object2;
var $mol_after_tick = class extends $mol_object2 {
  constructor(task) {
    super();
    this.task = task;
    this.promise = Promise.resolve().then(() => {
      if (this.cancelled)
        return;
      task();
    });
  }
  static {
    __name(this, "$mol_after_tick");
  }
  promise;
  cancelled = false;
  destructor() {
    this.cancelled = true;
  }
};

// mol/view/selection/selection.ts
$.$mol_object = $mol_object;
$.$mol_mem = $mol_mem;
$.$mol_dom_context = $mol_dom_context;
$.$mol_after_tick = $mol_after_tick;
var $mol_view_selection = class extends $mol_object {
  static {
    __name(this, "$mol_view_selection");
  }
  static focused(next, notify) {
    const parents = [];
    let element = next?.[0] ?? $mol_dom_context.document.activeElement;
    while (element) {
      parents.push(element);
      element = element.parentNode;
    }
    if (!next || notify)
      return parents;
    new $mol_after_tick(() => {
      const element2 = this.focused()[0];
      if (element2)
        element2.focus();
      else
        $mol_dom_context.blur();
    });
    return parents;
  }
};
__decorateClass([
  $mol_mem
], $mol_view_selection, "focused", 1);

// mol/maybe/maybe.ts
function $mol_maybe(value) {
  return value == null ? [] : [value];
}
__name($mol_maybe, "$mol_maybe");

// mol/view/selection/selection.web.ts
$.$mol_dom_context = $mol_dom_context;
$.$mol_view_selection = $mol_view_selection;
$.$mol_maybe = $mol_maybe;
if ($mol_dom_context.document) {
  $mol_dom_context.document.documentElement.addEventListener(
    "focus",
    (event) => {
      $mol_view_selection.focused($mol_maybe($mol_dom_context.document.activeElement), "notify");
    },
    true
  );
}

// mol/wrapper/wrapper.ts
$.$mol_object2 = $mol_object2;
var $mol_wrapper = class extends $mol_object2 {
  static {
    __name(this, "$mol_wrapper");
  }
  static wrap;
  static run(task) {
    return this.func(task)();
  }
  static func(func) {
    return this.wrap(func);
  }
  static get class() {
    return (Class) => {
      const construct = /* @__PURE__ */ __name((target, args) => new Class(...args), "construct");
      const handler = {
        construct: this.func(construct)
      };
      handler[Symbol.toStringTag] = Class.name + "#";
      return new Proxy(Class, handler);
    };
  }
  static get method() {
    return (obj, name, descr) => {
      descr.value = this.func(descr.value);
      return descr;
    };
  }
  static get field() {
    return (obj, name, descr) => {
      descr.get = descr.set = this.func(descr.get);
      return descr;
    };
  }
};

// mol/memo/memo.ts
$.$mol_wrapper = $mol_wrapper;
var $mol_memo = class extends $mol_wrapper {
  static {
    __name(this, "$mol_memo");
  }
  static wrap(task) {
    const store = /* @__PURE__ */ new WeakMap();
    return function(next) {
      if (next === void 0 && store.has(this))
        return store.get(this);
      const val = task.call(this, next) ?? next;
      store.set(this, val);
      return val;
    };
  }
};

// mol/dom/qname/qname.ts
function $mol_dom_qname(name) {
  return name.replace(/\W/g, "").replace(/^(?=\d+)/, "_");
}
__name($mol_dom_qname, "$mol_dom_qname");

// mol/wire/probe/probe.ts
$.$mol_wire_fiber = $mol_wire_fiber;
function $mol_wire_probe(task, def) {
  const warm = $mol_wire_fiber.warm;
  try {
    $mol_wire_fiber.warm = false;
    const res = task();
    if (res === void 0)
      return def;
    return res;
  } finally {
    $mol_wire_fiber.warm = warm;
  }
}
__name($mol_wire_probe, "$mol_wire_probe");

// mol/wire/watch/watch.ts
$.$mol_wire_auto = $mol_wire_auto;
$.$mol_wire_atom = $mol_wire_atom;
$.$mol_fail = $mol_fail;
function $mol_wire_watch() {
  const atom = $mol_wire_auto();
  if (atom instanceof $mol_wire_atom) {
    atom.watch();
  } else {
    $mol_fail(new Error("Atom is required for watching"));
  }
}
__name($mol_wire_watch, "$mol_wire_watch");

// mol/const/const.ts
$.$mol_dev_format_head = $mol_dev_format_head;
$.$mol_dev_format_auto = $mol_dev_format_auto;
$.$mol_dev_format_span = $mol_dev_format_span;
function $mol_const(value) {
  const getter = /* @__PURE__ */ __name(() => value, "getter");
  getter["()"] = value;
  getter[Symbol.toStringTag] = value;
  getter[$mol_dev_format_head] = () => $mol_dev_format_span({}, "()=> ", $mol_dev_format_auto(value));
  return getter;
}
__name($mol_const, "$mol_const");

// mol/wire/solid/solid.ts
$.$mol_wire_auto = $mol_wire_auto;
$.$mol_wire_fiber = $mol_wire_fiber;
$.$mol_wire_pub_sub = $mol_wire_pub_sub;
function $mol_wire_solid() {
  let current = $mol_wire_auto();
  if (current.temp)
    current = current.host;
  if (current.reap !== nothing) {
    current?.sub_on(sub, sub.data.length);
  }
  current.reap = nothing;
}
__name($mol_wire_solid, "$mol_wire_solid");
var nothing = /* @__PURE__ */ __name(() => {
}, "nothing");
var sub = new $mol_wire_pub_sub();

// mol/dom/render/attributes/attributes.ts
function $mol_dom_render_attributes(el2, attrs) {
  for (let name in attrs) {
    let val = attrs[name];
    if (val === void 0) {
      continue;
    }
    if (val === null || val === false) {
      if (!el2.hasAttribute(name))
        continue;
      el2.removeAttribute(name);
    } else {
      const str = String(val);
      if (el2.getAttribute(name) === str)
        continue;
      el2.setAttribute(name, str);
    }
  }
}
__name($mol_dom_render_attributes, "$mol_dom_render_attributes");

// mol/dom/render/events/events.ts
function $mol_dom_render_events(el2, events, passive = false) {
  for (let name in events) {
    el2.addEventListener(name, events[name], { passive });
  }
}
__name($mol_dom_render_events, "$mol_dom_render_events");

// mol/view/view/view.web.ts
$.$mol_dom_context = $mol_dom_context;
$.$mol_view = $mol_view;
$mol_dom_context.document?.addEventListener(
  "DOMContentLoaded",
  () => $mol_view.autobind(),
  { once: true }
);

// mol/plugin/plugin.ts
$.$mol_view = $mol_view;
$.$mol_owning_get = $mol_owning_get;
$.$mol_wire_fiber = $mol_wire_fiber;
var $mol_plugin = class extends $mol_view {
  static {
    __name(this, "$mol_plugin");
  }
  dom_node_external(next) {
    return next ?? $mol_owning_get(this).host.dom_node();
  }
  render() {
    this.dom_node_actual();
  }
};

// mol/dom/render/styles/styles.ts
function $mol_dom_render_styles(el2, styles) {
  for (let name in styles) {
    let val = styles[name];
    const style = el2.style;
    const kebab = /* @__PURE__ */ __name((name2) => name2.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase()), "kebab");
    if (typeof val === "number") {
      style.setProperty(kebab(name), `${val}px`);
    } else {
      style.setProperty(kebab(name), val);
    }
  }
}
__name($mol_dom_render_styles, "$mol_dom_render_styles");

// mol/dom/render/children/children.ts
$.$mol_dom_context = $mol_dom_context;
function $mol_dom_render_children(el2, childNodes) {
  const node_set = new Set(childNodes);
  let nextNode = el2.firstChild;
  for (let view of childNodes) {
    if (view == null)
      continue;
    if (view instanceof $mol_dom_context.Node) {
      while (true) {
        if (!nextNode) {
          el2.appendChild(view);
          break;
        }
        if (nextNode == view) {
          nextNode = nextNode.nextSibling;
          break;
        } else {
          if (node_set.has(nextNode)) {
            el2.insertBefore(view, nextNode);
            break;
          } else {
            const nn = nextNode.nextSibling;
            el2.removeChild(nextNode);
            nextNode = nn;
          }
        }
      }
    } else {
      if (nextNode && nextNode.nodeName === "#text") {
        const str = String(view);
        if (nextNode.nodeValue !== str)
          nextNode.nodeValue = str;
        nextNode = nextNode.nextSibling;
      } else {
        const textNode = $mol_dom_context.document.createTextNode(String(view));
        el2.insertBefore(textNode, nextNode);
      }
    }
  }
  while (nextNode) {
    const currNode = nextNode;
    nextNode = currNode.nextSibling;
    el2.removeChild(currNode);
  }
}
__name($mol_dom_render_children, "$mol_dom_render_children");

// mol/dom/render/fields/fields.ts
function $mol_dom_render_fields(el2, fields) {
  for (let key in fields) {
    const val = fields[key];
    if (val === void 0)
      continue;
    el2[key] = val;
  }
}
__name($mol_dom_render_fields, "$mol_dom_render_fields");

// mol/wire/async/async.ts
$.$mol_wire_fiber = $mol_wire_fiber;
$.$mol_wire_task = $mol_wire_task;
function $mol_wire_async(obj) {
  let fiber;
  const temp = $mol_wire_task.getter(obj);
  return new Proxy(obj, {
    get(obj2, field) {
      const val = obj2[field];
      if (typeof val !== "function")
        return val;
      let fiber2;
      const temp2 = $mol_wire_task.getter(val);
      return /* @__PURE__ */ __name(function $mol_wire_async2(...args) {
        fiber2?.destructor();
        fiber2 = temp2(obj2, args);
        return fiber2.async();
      }, "$mol_wire_async");
    },
    apply(obj2, self2, args) {
      fiber?.destructor();
      fiber = temp(self2, args);
      return fiber.async();
    }
  });
}
__name($mol_wire_async, "$mol_wire_async");

// mol/view/view/view.ts
$.$mol_window = $mol_window;
$.$mol_object = $mol_object;
$.$mol_mem = $mol_mem;
$.$mol_mem_key = $mol_mem_key;
$.$mol_fail_log = $mol_fail_log;
$.$mol_dom_context = $mol_dom_context;
$.$mol_view_selection = $mol_view_selection;
$.$mol_memo = $mol_memo;
$.$mol_dom_qname = $mol_dom_qname;
$.$mol_wire_probe = $mol_wire_probe;
$.$mol_wire_watch = $mol_wire_watch;
$.$mol_const = $mol_const;
$.$mol_wire_solid = $mol_wire_solid;
$.$mol_dom_render_attributes = $mol_dom_render_attributes;
$.$mol_dom_render_events = $mol_dom_render_events;
$.$mol_plugin = $mol_plugin;
$.$mol_promise_like = $mol_promise_like;
$.$mol_dom_render_styles = $mol_dom_render_styles;
$.$mol_dom_render_children = $mol_dom_render_children;
$.$mol_dom_render_fields = $mol_dom_render_fields;
$.$mol_func_name = $mol_func_name;
$.$mol_owning_get = $mol_owning_get;
$.$mol_wire_fiber = $mol_wire_fiber;
$.$mol_wire_async = $mol_wire_async;
$.$mol_dev_format_head = $mol_dev_format_head;
$.$mol_dev_format_native = $mol_dev_format_native;
$.$mol_dev_format_auto = $mol_dev_format_auto;
$.$mol_dev_format_span = $mol_dev_format_span;
$.$mol_dev_format_shade = $mol_dev_format_shade;
$.$mol_fail_hidden = $mol_fail_hidden;
$.$mol_after_frame = $mol_after_frame;
var error_showed = /* @__PURE__ */ new WeakMap();
var _$mol_view = class _$mol_view extends $mol_object {
  static {
    __name(this, "$mol_view");
  }
  static Root(id) {
    return new this();
  }
  autorun() {
    try {
      this.dom_tree();
      document.title = this.title();
    } catch (error) {
      $mol_fail_log(error);
    }
  }
  static autobind() {
    const nodes = $mol_dom_context.document.querySelectorAll('[mol_view_root]:not([mol_view_root=""])');
    for (let i = nodes.length - 1; i >= 0; --i) {
      const name = nodes.item(i).getAttribute("mol_view_root");
      const View = $[name];
      if (!View) {
        console.error(`Can not attach view. Class not found: ${name}`);
        continue;
      }
      const view = View.Root(i);
      view.dom_node(nodes.item(i));
      view.autorun();
    }
  }
  title() {
    return this.toString().match(/.*\.(\w+)/)?.[1] ?? this.toString();
  }
  focused(next) {
    let node = this.dom_node();
    const value = $mol_view_selection.focused(next === void 0 ? void 0 : next ? [node] : []);
    return value.indexOf(node) !== -1;
  }
  state_key(suffix = "") {
    return this.$.$mol_view_state_key(suffix);
  }
  dom_name() {
    return $mol_dom_qname(this.constructor.toString()) || "div";
  }
  /// NameSpace of element that created when element not found in DOM
  dom_name_space() {
    return "http://www.w3.org/1999/xhtml";
  }
  /// Raw child views
  sub() {
    return [];
  }
  /// Visible sub views with defined ambient context
  /// Render all by default
  sub_visible() {
    return this.sub();
  }
  minimal_width() {
    let min = 0;
    try {
      const sub2 = this.sub();
      if (!sub2)
        return 0;
      sub2.forEach((view) => {
        if (view instanceof _$mol_view) {
          min = Math.max(min, view.minimal_width());
        }
      });
    } catch (error) {
      $mol_fail_log(error);
      return 24;
    }
    return min;
  }
  maximal_width() {
    return this.minimal_width();
  }
  minimal_height() {
    let min = 0;
    try {
      for (const view of this.sub() ?? []) {
        if (view instanceof _$mol_view) {
          min = Math.max(min, view.minimal_height());
        }
      }
    } catch (error) {
      $mol_fail_log(error);
      return 24;
    }
    return min;
  }
  static watchers = /* @__PURE__ */ new Set();
  view_rect() {
    if ($mol_wire_probe(() => this.view_rect()) === void 0) {
      $mol_wire_watch();
      return null;
    } else {
      const { width, height, left, right, top, bottom } = this.dom_node().getBoundingClientRect();
      return { width, height, left, right, top, bottom };
    }
  }
  dom_id() {
    return this.toString().replace(/</g, "(").replace(/>/g, ")").replaceAll(/"/g, "'");
  }
  dom_node_external(next) {
    const node = next ?? $mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
    const id = this.dom_id();
    node.setAttribute("id", id);
    node.toString = $mol_const("<#" + id + ">");
    return node;
  }
  dom_node(next) {
    $mol_wire_solid();
    const node = this.dom_node_external(next);
    $mol_dom_render_attributes(node, this.attr_static());
    const events = this.event_async();
    $mol_dom_render_events(node, events);
    return node;
  }
  dom_final() {
    this.render();
    const sub2 = this.sub_visible();
    if (!sub2)
      return;
    for (const el2 of sub2) {
      if (el2 && typeof el2 === "object" && "dom_final" in el2) {
        el2["dom_final"]();
      }
    }
    return this.dom_node();
  }
  dom_tree(next) {
    const node = this.dom_node(next);
    render:
      try {
        $mol_dom_render_attributes(node, { mol_view_error: null });
        try {
          this.render();
        } finally {
          for (let plugin of this.plugins()) {
            if (plugin instanceof $mol_plugin) {
              plugin.dom_tree();
            }
          }
        }
      } catch (error) {
        $mol_fail_log(error);
        const mol_view_error = $mol_promise_like(error) ? "Promise" : error.name || error.constructor.name;
        $mol_dom_render_attributes(node, { mol_view_error });
        if ($mol_promise_like(error))
          break render;
        if ((error_showed.get(error) ?? this) !== this)
          break render;
        try {
          const message = error.message || error;
          node.innerText = message.replace(/^|$/mg, "\xA0\xA0");
        } catch {
        }
        error_showed.set(error, this);
      }
    try {
      this.auto();
    } catch (error) {
      $mol_fail_log(error);
    }
    return node;
  }
  dom_node_actual() {
    const node = this.dom_node();
    $mol_dom_render_styles(node, this.style_size());
    const attr = this.attr();
    const style = this.style();
    $mol_dom_render_attributes(node, attr);
    $mol_dom_render_styles(node, style);
    return node;
  }
  auto() {
    return null;
  }
  render() {
    const node = this.dom_node_actual();
    const sub2 = this.sub_visible();
    if (!sub2)
      return;
    const nodes = sub2.map((child) => {
      if (child == null)
        return null;
      return child instanceof _$mol_view ? child.dom_node() : child instanceof $mol_dom_context.Node ? child : String(child);
    });
    $mol_dom_render_children(node, nodes);
    for (const el2 of sub2)
      if (el2 && typeof el2 === "object" && "dom_tree" in el2)
        el2["dom_tree"]();
    $mol_dom_render_fields(node, this.field());
  }
  static view_classes() {
    const proto = this.prototype;
    let current = proto;
    const classes = [];
    while (current) {
      if (current.constructor.name !== classes.at(-1)?.name) {
        classes.push(current.constructor);
      }
      if (!(current instanceof _$mol_view))
        break;
      current = Object.getPrototypeOf(current);
    }
    return classes;
  }
  static _view_names;
  static view_names(suffix) {
    let cache = Reflect.getOwnPropertyDescriptor(this, "_view_names")?.value;
    if (!cache)
      cache = this._view_names = /* @__PURE__ */ new Map();
    const cached = cache.get(suffix);
    if (cached)
      return cached;
    const names = [];
    const suffix2 = "_" + suffix[0].toLowerCase() + suffix.substring(1);
    for (const Class of this.view_classes()) {
      if (suffix in Class.prototype)
        names.push(this.$.$mol_func_name(Class) + suffix2);
      else
        break;
    }
    cache.set(suffix, names);
    return names;
  }
  view_names_owned() {
    const names = [];
    let owner = $mol_owning_get(this);
    if (!(owner?.host instanceof _$mol_view))
      return names;
    const suffix = owner.task.name.trim();
    const suffix2 = "_" + suffix[0].toLowerCase() + suffix.substring(1);
    names.push(...owner.host.constructor.view_names(suffix));
    for (let prefix of owner.host.view_names_owned()) {
      names.push(prefix + suffix2);
    }
    return names;
  }
  view_names() {
    const names = /* @__PURE__ */ new Set();
    for (let name of this.view_names_owned())
      names.add(name);
    for (let Class of this.constructor.view_classes()) {
      const name = this.$.$mol_func_name(Class);
      if (name)
        names.add(name);
    }
    return names;
  }
  theme(next = null) {
    return next;
  }
  attr_static() {
    let attrs = {};
    for (let name of this.view_names())
      attrs[name.replace(/\$/g, "").replace(/^(?=\d)/, "_").toLowerCase()] = "";
    return attrs;
  }
  attr() {
    return {
      mol_theme: this.theme() ?? void 0
    };
  }
  style_size() {
    return {
      minHeight: this.minimal_height(),
      minWidth: this.minimal_width()
    };
  }
  style() {
    return {};
  }
  field() {
    return {};
  }
  event() {
    return {};
  }
  event_async() {
    return { ...$mol_wire_async(this.event()) };
  }
  plugins() {
    return [];
  }
  [$mol_dev_format_head]() {
    return $mol_dev_format_span(
      {},
      $mol_dev_format_native(this)
      // $mol_dev_format_shade( '/' ) ,
      // $mol_dev_format_auto( $mol_wire_cache( this ).sub().cache ) ,
    );
  }
  /** Deep search view by predicate. */
  *view_find(check, path = []) {
    if (check(this))
      return yield [...path, this];
    try {
      for (const item of this.sub()) {
        if (item instanceof _$mol_view) {
          yield* item.view_find(check, [...path, this]);
        }
      }
    } catch (error) {
      if ($mol_promise_like(error))
        $mol_fail_hidden(error);
      $mol_fail_log(error);
    }
  }
  /** Renders path of views to DOM. */
  force_render(path) {
    const kids = this.sub();
    const index = kids.findIndex((item) => {
      if (item instanceof _$mol_view) {
        return path.has(item);
      } else {
        return false;
      }
    });
    if (index >= 0) {
      kids[index].force_render(path);
    }
  }
  /** Renders view to DOM and scroll to it. */
  ensure_visible(view, align = "start") {
    const path = this.view_find((v) => v === view).next().value;
    this.force_render(new Set(path));
    try {
      this.dom_final();
    } catch (err) {
      $mol_fail_log(err);
    }
    view.dom_node().scrollIntoView({ block: align });
  }
  bring() {
    const win = this.$.$mol_dom_context;
    if (win.parent !== win.self && !win.document.hasFocus())
      return;
    new this.$.$mol_after_frame(() => {
      this.dom_node().scrollIntoView({ block: "start", inline: "nearest" });
      this.focused(true);
    });
  }
  destructor() {
    const node = $mol_wire_probe(() => this.dom_node());
    if (!node)
      return;
    const events = $mol_wire_probe(() => this.event_async());
    if (!events)
      return;
    for (let event_name in events) {
      node.removeEventListener(
        event_name,
        events[event_name]
      );
    }
  }
};
__decorateClass([
  $mol_mem
], _$mol_view.prototype, "autorun", 1);
__decorateClass([
  $mol_mem
], _$mol_view.prototype, "title", 1);
__decorateClass([
  $mol_mem
], _$mol_view.prototype, "focused", 1);
__decorateClass([
  $mol_memo.method
], _$mol_view.prototype, "dom_name", 1);
__decorateClass([
  $mol_mem
], _$mol_view.prototype, "minimal_width", 1);
__decorateClass([
  $mol_mem
], _$mol_view.prototype, "minimal_height", 1);
__decorateClass([
  $mol_mem
], _$mol_view.prototype, "view_rect", 1);
__decorateClass([
  $mol_memo.method
], _$mol_view.prototype, "dom_id", 1);
__decorateClass([
  $mol_mem
], _$mol_view.prototype, "dom_node", 1);
__decorateClass([
  $mol_mem
], _$mol_view.prototype, "dom_final", 1);
__decorateClass([
  $mol_mem
], _$mol_view.prototype, "dom_tree", 1);
__decorateClass([
  $mol_mem
], _$mol_view.prototype, "dom_node_actual", 1);
__decorateClass([
  $mol_mem
], _$mol_view.prototype, "render", 1);
__decorateClass([
  $mol_memo.method
], _$mol_view.prototype, "view_names_owned", 1);
__decorateClass([
  $mol_memo.method
], _$mol_view.prototype, "view_names", 1);
__decorateClass([
  $mol_mem
], _$mol_view.prototype, "theme", 1);
__decorateClass([
  $mol_mem
], _$mol_view.prototype, "event_async", 1);
__decorateClass([
  $mol_mem_key
], _$mol_view, "Root", 1);
__decorateClass([
  $mol_mem
], _$mol_view, "autobind", 1);
__decorateClass([
  $mol_memo.method
], _$mol_view, "view_classes", 1);
var $mol_view = _$mol_view;

// mol/scroll/scroll.view.tree
$.$mol_view = $mol_view;
$.$mol_mem = $mol_mem;
var $mol_scroll2 = class extends $.$mol_view {
  static {
    __name(this, "$mol_scroll");
  }
  tabindex() {
    return -1;
  }
  event_scroll(next) {
    if (next !== void 0)
      return next;
    return null;
  }
  scroll_top(next) {
    if (next !== void 0)
      return next;
    return 0;
  }
  scroll_left(next) {
    if (next !== void 0)
      return next;
    return 0;
  }
  field() {
    return { ...super.field(), "tabIndex": this.tabindex() };
  }
  event() {
    return { ...super.event(), "scroll": (next) => this.event_scroll(next) };
  }
};
$.$mol_scroll = $mol_scroll2;
$mol_mem($.$mol_scroll.prototype, "event_scroll");
$mol_mem($.$mol_scroll.prototype, "scroll_top");
$mol_mem($.$mol_scroll.prototype, "scroll_left");

// mol/dom/listener/listener.ts
$.$mol_object = $mol_object;
var $mol_dom_listener = class extends $mol_object {
  constructor(_node, _event, _handler, _config = { passive: true }) {
    super();
    this._node = _node;
    this._event = _event;
    this._handler = _handler;
    this._config = _config;
    this._node.addEventListener(this._event, this._handler, this._config);
  }
  static {
    __name(this, "$mol_dom_listener");
  }
  destructor() {
    this._node.removeEventListener(this._event, this._handler, this._config);
    super.destructor();
  }
};

// mol/print/print.ts
$.$mol_object = $mol_object;
$.$mol_mem = $mol_mem;
$.$mol_dom_listener = $mol_dom_listener;
$.$mol_dom_context = $mol_dom_context;
var $mol_print = class extends $mol_object {
  static {
    __name(this, "$mol_print");
  }
  static before() {
    return new $mol_dom_listener(this.$.$mol_dom_context, "beforeprint", () => {
      this.active(true);
    });
  }
  static after() {
    return new $mol_dom_listener(this.$.$mol_dom_context, "afterprint", () => {
      this.active(false);
    });
  }
  static active(next) {
    this.before();
    this.after();
    return next || false;
  }
};
__decorateClass([
  $mol_mem
], $mol_print, "before", 1);
__decorateClass([
  $mol_mem
], $mol_print, "after", 1);
__decorateClass([
  $mol_mem
], $mol_print, "active", 1);

// mol/scroll/scroll.view.ts
$.$mol_mem = $mol_mem;
$.$mol_print = $mol_print;
var $mol_scroll_sfunc = /* @__PURE__ */ __name(function($b) {
  if (this)
    this.$ = $b;
  class $mol_scroll3 extends $.$mol_scroll {
    static {
      __name(this, "$mol_scroll");
    }
    scroll_top(next, cache) {
      const el2 = this.dom_node();
      if (next !== void 0 && !cache)
        el2.scrollTop = next;
      return el2.scrollTop;
    }
    scroll_left(next, cache) {
      const el2 = this.dom_node();
      if (next !== void 0 && !cache)
        el2.scrollLeft = next;
      return el2.scrollLeft;
    }
    event_scroll(next) {
      const el2 = this.dom_node();
      this.scroll_left(el2.scrollLeft, "cache");
      this.scroll_top(el2.scrollTop, "cache");
    }
    minimal_height() {
      return this.$.$mol_print.active() ? null : 0;
    }
    minimal_width() {
      return this.$.$mol_print.active() ? null : 0;
    }
  }
  __decorateClass([
    $mol_mem
  ], $mol_scroll3.prototype, "scroll_top", 1);
  __decorateClass([
    $mol_mem
  ], $mol_scroll3.prototype, "scroll_left", 1);
  $b.$mol_scroll = $mol_scroll3;
}, "$mol_scroll_sfunc");
$mol_scroll_sfunc($);

// mol/decor/decor.ts
var $mol_decor = class {
  constructor(value) {
    this.value = value;
  }
  static {
    __name(this, "$mol_decor");
  }
  prefix() {
    return "";
  }
  valueOf() {
    return this.value;
  }
  postfix() {
    return "";
  }
  toString() {
    return `${this.prefix()}${this.valueOf()}${this.postfix()}`;
  }
};

// mol/style/unit/unit.ts
$.$mol_decor = $mol_decor;
var $mol_style_unit = class extends $mol_decor {
  constructor(value, literal) {
    super(value);
    this.literal = literal;
  }
  static {
    __name(this, "$mol_style_unit");
  }
  postfix() {
    return this.literal;
  }
  static per(value) {
    return `${value}%`;
  }
  static px(value) {
    return `${value}px`;
  }
  static mm(value) {
    return `${value}mm`;
  }
  static cm(value) {
    return `${value}cm`;
  }
  static Q(value) {
    return `${value}Q`;
  }
  static in(value) {
    return `${value}in`;
  }
  static pc(value) {
    return `${value}pc`;
  }
  static pt(value) {
    return `${value}pt`;
  }
  static cap(value) {
    return `${value}cap`;
  }
  static ch(value) {
    return `${value}ch`;
  }
  static em(value) {
    return `${value}em`;
  }
  static rem(value) {
    return `${value}rem`;
  }
  static ex(value) {
    return `${value}ex`;
  }
  static ic(value) {
    return `${value}ic`;
  }
  static lh(value) {
    return `${value}lh`;
  }
  static rlh(value) {
    return `${value}rlh`;
  }
  static vh(value) {
    return `${value}vh`;
  }
  static vw(value) {
    return `${value}vw`;
  }
  static vi(value) {
    return `${value}vi`;
  }
  static vb(value) {
    return `${value}vb`;
  }
  static vmin(value) {
    return `${value}vmin`;
  }
  static vmax(value) {
    return `${value}vmax`;
  }
  static deg(value) {
    return `${value}deg`;
  }
  static rad(value) {
    return `${value}rad`;
  }
  static grad(value) {
    return `${value}grad`;
  }
  static turn(value) {
    return `${value}turn`;
  }
  static s(value) {
    return `${value}s`;
  }
  static ms(value) {
    return `${value}ms`;
  }
};

// mol/style/attach/attach.ts
$.$mol_after_tick = $mol_after_tick;
$.$mol_dom_context = $mol_dom_context;
var all = [];
var el = null;
var timer = null;
function $mol_style_attach_force() {
  if (all.length) {
    el.innerHTML += "\n" + all.join("\n\n");
    all = [];
  }
  timer = null;
  return el;
}
__name($mol_style_attach_force, "$mol_style_attach_force");
function $mol_style_attach(id, text) {
  all.push(`/* ${id} */

${text}`);
  if (timer)
    return el;
  const doc = $mol_dom_context.document;
  if (!doc)
    return null;
  el = doc.createElement("style");
  el.id = `$mol_style_attach`;
  doc.head.appendChild(el);
  timer = new $mol_after_tick($mol_style_attach_force);
  return el;
}
__name($mol_style_attach, "$mol_style_attach");

// mol/style/sheet/sheet.ts
$.$mol_view = $mol_view;
$.$mol_dom_qname = $mol_dom_qname;
$.$mol_ambient = $mol_ambient;
$.$mol_func_name = $mol_func_name;
function $mol_style_sheet(Component, config0) {
  let rules = [];
  const block = $mol_dom_qname($mol_ambient({}).$mol_func_name(Component));
  const kebab = /* @__PURE__ */ __name((name) => name.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase()), "kebab");
  const make_class = /* @__PURE__ */ __name((prefix, path, config) => {
    const props = [];
    const selector = /* @__PURE__ */ __name((prefix2, path2) => {
      if (path2.length === 0)
        return prefix2 || `[${block}]`;
      let res = `[${block}_${path2.join("_")}]`;
      if (prefix2)
        res = prefix2 + " :where(" + res + ")";
      return res;
    }, "selector");
    for (const key of Object.keys(config).reverse()) {
      if (/^(--)?[a-z]/.test(key)) {
        const addProp = /* @__PURE__ */ __name((keys, val) => {
          if (Array.isArray(val)) {
            if (val[0] && [Array, Object].includes(val[0].constructor)) {
              val = val.map((v) => {
                return Object.entries(v).map(([n, a]) => {
                  if (a === true)
                    return kebab(n);
                  if (a === false)
                    return null;
                  return String(a);
                }).filter(Boolean).join(" ");
              }).join(",");
            } else {
              val = val.join(" ");
            }
            props.push(`	${keys.join("-")}: ${val};
`);
          } else if (val.constructor === Object) {
            for (let suffix in val) {
              addProp([...keys, kebab(suffix)], val[suffix]);
            }
          } else {
            props.push(`	${keys.join("-")}: ${val};
`);
          }
        }, "addProp");
        addProp([kebab(key)], config[key]);
      } else if (/^[A-Z]/.test(key)) {
        make_class(prefix, [...path, key.toLowerCase()], config[key]);
      } else if (key[0] === "$") {
        make_class(selector(prefix, path) + " :where([" + $mol_dom_qname(key) + "])", [], config[key]);
      } else if (key === ">") {
        const types = config[key];
        for (let type in types) {
          make_class(selector(prefix, path) + " > :where([" + $mol_dom_qname(type) + "])", [], types[type]);
        }
      } else if (key === "@") {
        const attrs = config[key];
        for (let name in attrs) {
          for (let val in attrs[name]) {
            make_class(selector(prefix, path) + ":where([" + name + "=" + JSON.stringify(val) + "])", [], attrs[name][val]);
          }
        }
      } else if (key === "@media") {
        const media = config[key];
        for (let query in media) {
          rules.push("}\n");
          make_class(prefix, path, media[query]);
          rules.push(`${key} ${query} {
`);
        }
      } else if (key[0] === "[" && key[key.length - 1] === "]") {
        const attr = key.slice(1, -1);
        const vals = config[key];
        for (let val in vals) {
          make_class(selector(prefix, path) + ":where([" + attr + "=" + JSON.stringify(val) + "])", [], vals[val]);
        }
      } else {
        make_class(selector(prefix, path) + key, [], config[key]);
      }
    }
    if (props.length) {
      rules.push(`${selector(prefix, path)} {
${props.reverse().join("")}}
`);
    }
  }, "make_class");
  make_class("", [], config0);
  return rules.reverse().join("");
}
__name($mol_style_sheet, "$mol_style_sheet");

// mol/style/define/define.ts
$.$mol_view = $mol_view;
$.$mol_style_attach = $mol_style_attach;
$.$mol_style_sheet = $mol_style_sheet;
function $mol_style_define(Component, config) {
  return $mol_style_attach(
    Component.name,
    $mol_style_sheet(Component, config)
  );
}
__name($mol_style_define, "$mol_style_define");

// mol/scroll/scroll.view.css.ts
$.$mol_style_unit = $mol_style_unit;
$.$mol_style_define = $mol_style_define;
$.$mol_view = $mol_view;
var { per, rem, px } = $mol_style_unit;
$mol_style_define($mol_scroll, {
  display: "grid",
  overflow: "auto",
  flex: {
    direction: "column",
    grow: 1,
    shrink: 1
    // basis: 0,
  },
  outline: "none",
  alignSelf: "stretch",
  boxSizing: "border-box",
  willChange: "scroll-position",
  scroll: {
    padding: [rem(0.75), 0]
  },
  maxHeight: per(100),
  maxWidth: per(100),
  webkitOverflowScrolling: "touch",
  contain: "content",
  ">": {
    $mol_view: {
      transform: "translateZ(0)",
      // enforce gpu scroll in all agents
      gridArea: "1/1"
    }
  },
  "::before": {
    display: "none"
  },
  "::after": {
    display: "none"
  },
  "::-webkit-scrollbar": {
    width: rem(0.25),
    height: rem(0.25)
  },
  "@media": {
    "print": {
      overflow: "visible",
      contain: "none",
      maxHeight: "unset"
    }
  }
});

// mol/page/page.view.tree
$.$mol_view = $mol_view;
$.$mol_mem = $mol_mem;
var $mol_page2 = class extends $.$mol_view {
  static {
    __name(this, "$mol_page");
  }
  tabindex() {
    return -1;
  }
  Logo() {
    return null;
  }
  title_content() {
    return [this.Logo(), this.title()];
  }
  Title() {
    const obj = new this.$.$mol_view();
    obj.dom_name = () => "h1";
    obj.sub = () => this.title_content();
    return obj;
  }
  tools() {
    return [];
  }
  Tools() {
    const obj = new this.$.$mol_view();
    obj.sub = () => this.tools();
    return obj;
  }
  head() {
    return [this.Title(), this.Tools()];
  }
  Head() {
    const obj = new this.$.$mol_view();
    obj.minimal_height = () => 64;
    obj.dom_name = () => "header";
    obj.sub = () => this.head();
    return obj;
  }
  body_scroll_top(next) {
    return this.Body().scroll_top(next);
  }
  body() {
    return [];
  }
  Body_content() {
    const obj = new this.$.$mol_view();
    obj.sub = () => this.body();
    return obj;
  }
  body_content() {
    return [this.Body_content()];
  }
  Body() {
    const obj = new this.$.$mol_scroll();
    obj.sub = () => this.body_content();
    return obj;
  }
  foot() {
    return [];
  }
  Foot() {
    const obj = new this.$.$mol_view();
    obj.dom_name = () => "footer";
    obj.sub = () => this.foot();
    return obj;
  }
  dom_name() {
    return "article";
  }
  field() {
    return { ...super.field(), "tabIndex": this.tabindex() };
  }
  sub() {
    return [
      this.Head(),
      this.Body(),
      this.Foot()
    ];
  }
};
$.$mol_page = $mol_page2;
$mol_mem($.$mol_page.prototype, "Title");
$mol_mem($.$mol_page.prototype, "Tools");
$mol_mem($.$mol_page.prototype, "Head");
$mol_mem($.$mol_page.prototype, "Body_content");
$mol_mem($.$mol_page.prototype, "Body");
$mol_mem($.$mol_page.prototype, "Foot");

// mol/style/func/func.ts
$.$mol_style_unit = $mol_style_unit;
$.$mol_decor = $mol_decor;
var { per: per2 } = $mol_style_unit;
var $mol_style_func = class _$mol_style_func extends $mol_decor {
  constructor(name, value) {
    super(value);
    this.name = name;
  }
  static {
    __name(this, "$mol_style_func");
  }
  prefix() {
    return this.name + "(";
  }
  postfix() {
    return ")";
  }
  static linear_gradient(value) {
    return new _$mol_style_func("linear-gradient", value);
  }
  static calc(value) {
    return new _$mol_style_func("calc", value);
  }
  static vary(name, defaultValue) {
    return new _$mol_style_func("var", defaultValue ? [name, defaultValue] : name);
  }
  static url(href) {
    return new _$mol_style_func("url", JSON.stringify(href));
  }
  static hsla(hue, saturation, lightness, alpha) {
    return new _$mol_style_func(
      "hsla",
      [hue, per2(saturation), per2(lightness), alpha]
    );
  }
  static clamp(min, mid, max) {
    return new _$mol_style_func(
      "clamp",
      [min, mid, max]
    );
  }
  static rgba(red, green, blue, alpha) {
    return new _$mol_style_func(
      "rgba",
      [red, green, blue, alpha]
    );
  }
  static scale(zoom) {
    return new _$mol_style_func("scale", [zoom]);
  }
  static linear(...breakpoints) {
    return new _$mol_style_func(
      "linear",
      breakpoints.map(
        (e) => Array.isArray(e) ? String(e[0]) + " " + (typeof e[1] === "number" ? e[1] + "%" : e[1].toString()) : String(e)
      )
    );
  }
  static cubic_bezier(x1, y1, x2, y2) {
    return new _$mol_style_func("cubic-bezier", [x1, y1, x2, y2]);
  }
  static steps(value, step_position) {
    return new _$mol_style_func("steps", [value, step_position]);
  }
  static blur(value) {
    return new _$mol_style_func("blur", value ?? "");
  }
  static brightness(value) {
    return new _$mol_style_func("brightness", value ?? "");
  }
  static contrast(value) {
    return new _$mol_style_func("contrast", value ?? "");
  }
  static drop_shadow(color, x_offset, y_offset, blur_radius) {
    return new _$mol_style_func(
      "drop-shadow",
      blur_radius ? [color, x_offset, y_offset, blur_radius] : [color, x_offset, y_offset]
    );
  }
  static grayscale(value) {
    return new _$mol_style_func("grayscale", value ?? "");
  }
  static hue_rotate(value) {
    return new _$mol_style_func("hue-rotate", value ?? "");
  }
  static invert(value) {
    return new _$mol_style_func("invert", value ?? "");
  }
  static opacity(value) {
    return new _$mol_style_func("opacity", value ?? "");
  }
  static sepia(value) {
    return new _$mol_style_func("sepia", value ?? "");
  }
  static saturate(value) {
    return new _$mol_style_func("saturate", value ?? "");
  }
};

// mol/style/prop/prop.ts
$.$mol_style_func = $mol_style_func;
function $mol_style_prop(prefix, postfixes) {
  const record = postfixes.reduce((record_obj, postfix) => {
    record_obj[postfix] = $mol_style_func.vary(`--${prefix}_${postfix}`);
    return record_obj;
  }, {});
  return record;
}
__name($mol_style_prop, "$mol_style_prop");

// mol/theme/theme.ts
$.$mol_style_prop = $mol_style_prop;
var $mol_theme = $mol_style_prop(
  "mol_theme",
  [
    "back",
    "hover",
    "card",
    "current",
    "special",
    "text",
    "control",
    "shade",
    "line",
    "focus",
    "field",
    "image"
  ]
);

// mol/gap/gap.ts
$.$mol_style_prop = $mol_style_prop;
var $mol_gap = $mol_style_prop(
  "mol_gap",
  [
    "block",
    "text",
    "round",
    "space",
    "blur"
  ]
);

// mol/page/page.view.css.ts
$.$mol_style_unit = $mol_style_unit;
$.$mol_style_func = $mol_style_func;
$.$mol_style_define = $mol_style_define;
$.$mol_theme = $mol_theme;
$.$mol_gap = $mol_gap;
var { per: per3, rem: rem2 } = $mol_style_unit;
var { calc } = $mol_style_func;
$mol_style_define($mol_page, {
  display: "flex",
  flex: {
    basis: "auto",
    direction: "column"
  },
  position: "relative",
  alignSelf: "stretch",
  maxWidth: per3(100),
  maxHeight: per3(100),
  boxSizing: "border-box",
  color: $mol_theme.text,
  // zIndex: 0 ,
  ":focus": {
    outline: "none"
  },
  Head: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    flex: "none",
    position: "relative",
    margin: 0,
    minHeight: rem2(4),
    padding: $mol_gap.block,
    background: {
      color: $mol_theme.card
    },
    border: {
      radius: $mol_gap.round
    },
    boxShadow: `0 0.5rem 0.5rem -0.5rem hsla(0,0%,0%,.25)`,
    zIndex: 2
  },
  Title: {
    minHeight: rem2(2),
    margin: 0,
    padding: $mol_gap.text,
    gap: $mol_gap.text,
    wordBreak: "normal",
    textShadow: "0 0",
    font: {
      size: "inherit",
      weight: "normal"
    },
    flex: {
      grow: 1,
      shrink: 1,
      basis: "auto"
    }
  },
  Tools: {
    flex: {
      basis: "auto",
      grow: 1e3,
      shrink: 1
    },
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    flexWrap: "wrap"
  },
  Body: {
    flex: {
      grow: 1e3,
      shrink: 1,
      basis: per3(100)
    }
  },
  Body_content: {
    padding: $mol_gap.block,
    flex: {
      direction: "column",
      shrink: 1,
      grow: 1
    },
    justify: {
      self: "stretch"
    }
  },
  Foot: {
    display: "flex",
    justifyContent: "space-between",
    flex: "none",
    margin: 0,
    background: {
      color: $mol_theme.card
    },
    border: {
      radius: $mol_gap.round
    },
    boxShadow: `0 -0.5rem 0.5rem -0.5rem hsla(0,0%,0%,.25)`,
    zIndex: 1,
    padding: $mol_gap.block,
    ":empty": {
      display: "none"
    }
  }
});

// mol/speck/speck.view.tree
$.$mol_view = $mol_view;
var $mol_speck = class extends $.$mol_view {
  static {
    __name(this, "$mol_speck");
  }
  theme() {
    return "$mol_theme_accent";
  }
  value() {
    return null;
  }
  attr() {
    return { ...super.attr(), "mol_theme": this.theme() };
  }
  style() {
    return { ...super.style(), "minHeight": "1em" };
  }
  sub() {
    return [this.value()];
  }
};
$.$mol_speck = $mol_speck;

// mol/button/button.view.tree
$.$mol_view = $mol_view;
$.$mol_mem = $mol_mem;
var $mol_button = class extends $.$mol_view {
  static {
    __name(this, "$mol_button");
  }
  event_activate(next) {
    if (next !== void 0)
      return next;
    return null;
  }
  clicks(next) {
    if (next !== void 0)
      return next;
    return null;
  }
  event_key_press(next) {
    if (next !== void 0)
      return next;
    return null;
  }
  disabled() {
    return false;
  }
  tab_index() {
    return 0;
  }
  hint() {
    return "";
  }
  hint_safe() {
    return this.hint();
  }
  error() {
    return "";
  }
  enabled() {
    return true;
  }
  click(next) {
    if (next !== void 0)
      return next;
    return null;
  }
  event_click(next) {
    if (next !== void 0)
      return next;
    return null;
  }
  event() {
    return {
      ...super.event(),
      "click": (next) => this.event_activate(next),
      "dblclick": (next) => this.clicks(next),
      "keydown": (next) => this.event_key_press(next)
    };
  }
  attr() {
    return {
      ...super.attr(),
      "disabled": this.disabled(),
      "role": "button",
      "tabindex": this.tab_index(),
      "title": this.hint_safe()
    };
  }
  sub() {
    return [this.title()];
  }
  Speck() {
    const obj = new this.$.$mol_speck();
    obj.value = () => this.error();
    return obj;
  }
};
$.$mol_button = $mol_button;
$mol_mem($.$mol_button.prototype, "event_activate");
$mol_mem($.$mol_button.prototype, "clicks");
$mol_mem($.$mol_button.prototype, "event_key_press");
$mol_mem($.$mol_button.prototype, "click");
$mol_mem($.$mol_button.prototype, "event_click");
$mol_mem($.$mol_button.prototype, "Speck");

// mol/keyboard/code/code.ts
var $mol_keyboard_code = /* @__PURE__ */ (($mol_keyboard_code2) => {
  $mol_keyboard_code2[$mol_keyboard_code2["backspace"] = 8] = "backspace";
  $mol_keyboard_code2[$mol_keyboard_code2["tab"] = 9] = "tab";
  $mol_keyboard_code2[$mol_keyboard_code2["enter"] = 13] = "enter";
  $mol_keyboard_code2[$mol_keyboard_code2["shift"] = 16] = "shift";
  $mol_keyboard_code2[$mol_keyboard_code2["ctrl"] = 17] = "ctrl";
  $mol_keyboard_code2[$mol_keyboard_code2["alt"] = 18] = "alt";
  $mol_keyboard_code2[$mol_keyboard_code2["pause"] = 19] = "pause";
  $mol_keyboard_code2[$mol_keyboard_code2["capsLock"] = 20] = "capsLock";
  $mol_keyboard_code2[$mol_keyboard_code2["escape"] = 27] = "escape";
  $mol_keyboard_code2[$mol_keyboard_code2["space"] = 32] = "space";
  $mol_keyboard_code2[$mol_keyboard_code2["pageUp"] = 33] = "pageUp";
  $mol_keyboard_code2[$mol_keyboard_code2["pageDown"] = 34] = "pageDown";
  $mol_keyboard_code2[$mol_keyboard_code2["end"] = 35] = "end";
  $mol_keyboard_code2[$mol_keyboard_code2["home"] = 36] = "home";
  $mol_keyboard_code2[$mol_keyboard_code2["left"] = 37] = "left";
  $mol_keyboard_code2[$mol_keyboard_code2["up"] = 38] = "up";
  $mol_keyboard_code2[$mol_keyboard_code2["right"] = 39] = "right";
  $mol_keyboard_code2[$mol_keyboard_code2["down"] = 40] = "down";
  $mol_keyboard_code2[$mol_keyboard_code2["insert"] = 45] = "insert";
  $mol_keyboard_code2[$mol_keyboard_code2["delete"] = 46] = "delete";
  $mol_keyboard_code2[$mol_keyboard_code2["key0"] = 48] = "key0";
  $mol_keyboard_code2[$mol_keyboard_code2["key1"] = 49] = "key1";
  $mol_keyboard_code2[$mol_keyboard_code2["key2"] = 50] = "key2";
  $mol_keyboard_code2[$mol_keyboard_code2["key3"] = 51] = "key3";
  $mol_keyboard_code2[$mol_keyboard_code2["key4"] = 52] = "key4";
  $mol_keyboard_code2[$mol_keyboard_code2["key5"] = 53] = "key5";
  $mol_keyboard_code2[$mol_keyboard_code2["key6"] = 54] = "key6";
  $mol_keyboard_code2[$mol_keyboard_code2["key7"] = 55] = "key7";
  $mol_keyboard_code2[$mol_keyboard_code2["key8"] = 56] = "key8";
  $mol_keyboard_code2[$mol_keyboard_code2["key9"] = 57] = "key9";
  $mol_keyboard_code2[$mol_keyboard_code2["A"] = 65] = "A";
  $mol_keyboard_code2[$mol_keyboard_code2["B"] = 66] = "B";
  $mol_keyboard_code2[$mol_keyboard_code2["C"] = 67] = "C";
  $mol_keyboard_code2[$mol_keyboard_code2["D"] = 68] = "D";
  $mol_keyboard_code2[$mol_keyboard_code2["E"] = 69] = "E";
  $mol_keyboard_code2[$mol_keyboard_code2["F"] = 70] = "F";
  $mol_keyboard_code2[$mol_keyboard_code2["G"] = 71] = "G";
  $mol_keyboard_code2[$mol_keyboard_code2["H"] = 72] = "H";
  $mol_keyboard_code2[$mol_keyboard_code2["I"] = 73] = "I";
  $mol_keyboard_code2[$mol_keyboard_code2["J"] = 74] = "J";
  $mol_keyboard_code2[$mol_keyboard_code2["K"] = 75] = "K";
  $mol_keyboard_code2[$mol_keyboard_code2["L"] = 76] = "L";
  $mol_keyboard_code2[$mol_keyboard_code2["M"] = 77] = "M";
  $mol_keyboard_code2[$mol_keyboard_code2["N"] = 78] = "N";
  $mol_keyboard_code2[$mol_keyboard_code2["O"] = 79] = "O";
  $mol_keyboard_code2[$mol_keyboard_code2["P"] = 80] = "P";
  $mol_keyboard_code2[$mol_keyboard_code2["Q"] = 81] = "Q";
  $mol_keyboard_code2[$mol_keyboard_code2["R"] = 82] = "R";
  $mol_keyboard_code2[$mol_keyboard_code2["S"] = 83] = "S";
  $mol_keyboard_code2[$mol_keyboard_code2["T"] = 84] = "T";
  $mol_keyboard_code2[$mol_keyboard_code2["U"] = 85] = "U";
  $mol_keyboard_code2[$mol_keyboard_code2["V"] = 86] = "V";
  $mol_keyboard_code2[$mol_keyboard_code2["W"] = 87] = "W";
  $mol_keyboard_code2[$mol_keyboard_code2["X"] = 88] = "X";
  $mol_keyboard_code2[$mol_keyboard_code2["Y"] = 89] = "Y";
  $mol_keyboard_code2[$mol_keyboard_code2["Z"] = 90] = "Z";
  $mol_keyboard_code2[$mol_keyboard_code2["metaLeft"] = 91] = "metaLeft";
  $mol_keyboard_code2[$mol_keyboard_code2["metaRight"] = 92] = "metaRight";
  $mol_keyboard_code2[$mol_keyboard_code2["select"] = 93] = "select";
  $mol_keyboard_code2[$mol_keyboard_code2["numpad0"] = 96] = "numpad0";
  $mol_keyboard_code2[$mol_keyboard_code2["numpad1"] = 97] = "numpad1";
  $mol_keyboard_code2[$mol_keyboard_code2["numpad2"] = 98] = "numpad2";
  $mol_keyboard_code2[$mol_keyboard_code2["numpad3"] = 99] = "numpad3";
  $mol_keyboard_code2[$mol_keyboard_code2["numpad4"] = 100] = "numpad4";
  $mol_keyboard_code2[$mol_keyboard_code2["numpad5"] = 101] = "numpad5";
  $mol_keyboard_code2[$mol_keyboard_code2["numpad6"] = 102] = "numpad6";
  $mol_keyboard_code2[$mol_keyboard_code2["numpad7"] = 103] = "numpad7";
  $mol_keyboard_code2[$mol_keyboard_code2["numpad8"] = 104] = "numpad8";
  $mol_keyboard_code2[$mol_keyboard_code2["numpad9"] = 105] = "numpad9";
  $mol_keyboard_code2[$mol_keyboard_code2["multiply"] = 106] = "multiply";
  $mol_keyboard_code2[$mol_keyboard_code2["add"] = 107] = "add";
  $mol_keyboard_code2[$mol_keyboard_code2["subtract"] = 109] = "subtract";
  $mol_keyboard_code2[$mol_keyboard_code2["decimal"] = 110] = "decimal";
  $mol_keyboard_code2[$mol_keyboard_code2["divide"] = 111] = "divide";
  $mol_keyboard_code2[$mol_keyboard_code2["F1"] = 112] = "F1";
  $mol_keyboard_code2[$mol_keyboard_code2["F2"] = 113] = "F2";
  $mol_keyboard_code2[$mol_keyboard_code2["F3"] = 114] = "F3";
  $mol_keyboard_code2[$mol_keyboard_code2["F4"] = 115] = "F4";
  $mol_keyboard_code2[$mol_keyboard_code2["F5"] = 116] = "F5";
  $mol_keyboard_code2[$mol_keyboard_code2["F6"] = 117] = "F6";
  $mol_keyboard_code2[$mol_keyboard_code2["F7"] = 118] = "F7";
  $mol_keyboard_code2[$mol_keyboard_code2["F8"] = 119] = "F8";
  $mol_keyboard_code2[$mol_keyboard_code2["F9"] = 120] = "F9";
  $mol_keyboard_code2[$mol_keyboard_code2["F10"] = 121] = "F10";
  $mol_keyboard_code2[$mol_keyboard_code2["F11"] = 122] = "F11";
  $mol_keyboard_code2[$mol_keyboard_code2["F12"] = 123] = "F12";
  $mol_keyboard_code2[$mol_keyboard_code2["numLock"] = 144] = "numLock";
  $mol_keyboard_code2[$mol_keyboard_code2["scrollLock"] = 145] = "scrollLock";
  $mol_keyboard_code2[$mol_keyboard_code2["semicolon"] = 186] = "semicolon";
  $mol_keyboard_code2[$mol_keyboard_code2["equals"] = 187] = "equals";
  $mol_keyboard_code2[$mol_keyboard_code2["comma"] = 188] = "comma";
  $mol_keyboard_code2[$mol_keyboard_code2["dash"] = 189] = "dash";
  $mol_keyboard_code2[$mol_keyboard_code2["period"] = 190] = "period";
  $mol_keyboard_code2[$mol_keyboard_code2["forwardSlash"] = 191] = "forwardSlash";
  $mol_keyboard_code2[$mol_keyboard_code2["graveAccent"] = 192] = "graveAccent";
  $mol_keyboard_code2[$mol_keyboard_code2["bracketOpen"] = 219] = "bracketOpen";
  $mol_keyboard_code2[$mol_keyboard_code2["slashBack"] = 220] = "slashBack";
  $mol_keyboard_code2[$mol_keyboard_code2["slashBackLeft"] = 226] = "slashBackLeft";
  $mol_keyboard_code2[$mol_keyboard_code2["bracketClose"] = 221] = "bracketClose";
  $mol_keyboard_code2[$mol_keyboard_code2["quoteSingle"] = 222] = "quoteSingle";
  return $mol_keyboard_code2;
})($mol_keyboard_code || {});

// mol/button/button.view.ts
$.$mol_mem = $mol_mem;
$.$mol_fail_hidden = $mol_fail_hidden;
$.$mol_keyboard_code = $mol_keyboard_code;
$.$mol_fail_log = $mol_fail_log;
var $mol_button_sfunc = /* @__PURE__ */ __name(function($b) {
  if (this)
    this.$ = $b;
  class $mol_button2 extends $.$mol_button {
    static {
      __name(this, "$mol_button");
    }
    status(next = [null]) {
      return next;
    }
    disabled() {
      return !this.enabled();
    }
    event_activate(next) {
      console.log("AT");
      if (!next)
        return;
      if (!this.enabled())
        return;
      try {
        this.event_click(next);
        this.click(next);
        this.status([null]);
      } catch (error) {
        Promise.resolve().then(() => this.status([error]));
        $mol_fail_hidden(error);
      }
    }
    event_key_press(event) {
      if (event.keyCode === 13 /* enter */) {
        return this.event_activate(event);
      }
    }
    tab_index() {
      return this.enabled() ? super.tab_index() : -1;
    }
    error() {
      const [error] = this.status();
      if (!error)
        return "";
      if (error instanceof Promise) {
        return $mol_fail_hidden(error);
      }
      return String(error.message ?? error);
    }
    hint_safe() {
      try {
        return this.hint();
      } catch (error) {
        $mol_fail_log(error);
        return "";
      }
    }
    sub_visible() {
      return [
        ...this.error() ? [this.Speck()] : [],
        ...this.sub()
      ];
    }
  }
  __decorateClass([
    $mol_mem
  ], $mol_button2.prototype, "status", 1);
  $b.$mol_button = $mol_button2;
}, "$mol_button_sfunc");
$mol_button_sfunc($);

// mol/button/typed/typed.view.tree
var $mol_button_typed = class extends $.$mol_button {
  static {
    __name(this, "$mol_button_typed");
  }
  minimal_height() {
    return 40;
  }
  minimal_width() {
    return 40;
  }
};
$.$mol_button_typed = $mol_button_typed;

// mol/button/major/major.view.tree
var $mol_button_major = class extends $.$mol_button_typed {
  static {
    __name(this, "$mol_button_major");
  }
  attr() {
    return { ...super.attr(), "mol_theme": "$mol_theme_accent" };
  }
};
$.$mol_button_major = $mol_button_major;

// mol/vite/vite.view.tree
$.$mol_mem = $mol_mem;
var $mol_vite = class extends $.$mol_page {
  static {
    __name(this, "$mol_vite");
  }
  b() {
    const obj = new this.$.$mol_button_major();
    obj.title = () => "RUN ME !!!";
    obj.click = (next) => this.click(next);
    return obj;
  }
  body() {
    return [this.b()];
  }
};
$.$mol_vite = $mol_vite;
$mol_mem($.$mol_vite.prototype, "b");

// node_modules/js-confetti/dist/es/index.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
__name(_classCallCheck, "_classCallCheck");
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
__name(_defineProperties, "_defineProperties");
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
__name(_createClass, "_createClass");
function normalizeComputedStyleValue(string) {
  return +string.replace(/px/, "");
}
__name(normalizeComputedStyleValue, "normalizeComputedStyleValue");
function fixDPR(canvas) {
  var dpr = window.devicePixelRatio;
  var computedStyles = getComputedStyle(canvas);
  var width = normalizeComputedStyleValue(computedStyles.getPropertyValue("width"));
  var height = normalizeComputedStyleValue(computedStyles.getPropertyValue("height"));
  canvas.setAttribute("width", (width * dpr).toString());
  canvas.setAttribute("height", (height * dpr).toString());
}
__name(fixDPR, "fixDPR");
function generateRandomNumber(min, max) {
  var fractionDigits = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  var randomNumber = Math.random() * (max - min) + min;
  return Math.floor(randomNumber * Math.pow(10, fractionDigits)) / Math.pow(10, fractionDigits);
}
__name(generateRandomNumber, "generateRandomNumber");
function generateRandomArrayElement(arr) {
  return arr[generateRandomNumber(0, arr.length)];
}
__name(generateRandomArrayElement, "generateRandomArrayElement");
var FREE_FALLING_OBJECT_ACCELERATION = 125e-5;
var MIN_DRAG_FORCE_COEFFICIENT = 5e-4;
var MAX_DRAG_FORCE_COEFFICIENT = 9e-4;
var ROTATION_SLOWDOWN_ACCELERATION = 1e-5;
var INITIAL_SHAPE_RADIUS = 6;
var INITIAL_EMOJI_SIZE = 80;
var MIN_INITIAL_CONFETTI_SPEED = 0.9;
var MAX_INITIAL_CONFETTI_SPEED = 1.7;
var MIN_FINAL_X_CONFETTI_SPEED = 0.2;
var MAX_FINAL_X_CONFETTI_SPEED = 0.6;
var MIN_INITIAL_ROTATION_SPEED = 0.03;
var MAX_INITIAL_ROTATION_SPEED = 0.07;
var MIN_CONFETTI_ANGLE = 15;
var MAX_CONFETTI_ANGLE = 82;
var MAX_CONFETTI_POSITION_SHIFT = 150;
var SHAPE_VISIBILITY_TRESHOLD = 100;
var DEFAULT_CONFETTI_NUMBER = 250;
var DEFAULT_EMOJIS_NUMBER = 40;
var DEFAULT_CONFETTI_COLORS = ["#fcf403", "#62fc03", "#f4fc03", "#03e7fc", "#03fca5", "#a503fc", "#fc03ad", "#fc03c2"];
function getWindowWidthCoefficient(canvasWidth) {
  var HD_SCREEN_WIDTH = 1920;
  return Math.log(canvasWidth) / Math.log(HD_SCREEN_WIDTH);
}
__name(getWindowWidthCoefficient, "getWindowWidthCoefficient");
var ConfettiShape = /* @__PURE__ */ function() {
  function ConfettiShape2(args) {
    _classCallCheck(this, ConfettiShape2);
    var initialPosition = args.initialPosition, direction = args.direction, confettiRadius = args.confettiRadius, confettiColors = args.confettiColors, emojis = args.emojis, emojiSize = args.emojiSize, canvasWidth = args.canvasWidth;
    var randomConfettiSpeed = generateRandomNumber(MIN_INITIAL_CONFETTI_SPEED, MAX_INITIAL_CONFETTI_SPEED, 3);
    var initialSpeed = randomConfettiSpeed * getWindowWidthCoefficient(canvasWidth);
    this.confettiSpeed = {
      x: initialSpeed,
      y: initialSpeed
    };
    this.finalConfettiSpeedX = generateRandomNumber(MIN_FINAL_X_CONFETTI_SPEED, MAX_FINAL_X_CONFETTI_SPEED, 3);
    this.rotationSpeed = emojis.length ? 0.01 : generateRandomNumber(MIN_INITIAL_ROTATION_SPEED, MAX_INITIAL_ROTATION_SPEED, 3) * getWindowWidthCoefficient(canvasWidth);
    this.dragForceCoefficient = generateRandomNumber(MIN_DRAG_FORCE_COEFFICIENT, MAX_DRAG_FORCE_COEFFICIENT, 6);
    this.radius = {
      x: confettiRadius,
      y: confettiRadius
    };
    this.initialRadius = confettiRadius;
    this.rotationAngle = direction === "left" ? generateRandomNumber(0, 0.2, 3) : generateRandomNumber(-0.2, 0, 3);
    this.emojiSize = emojiSize;
    this.emojiRotationAngle = generateRandomNumber(0, 2 * Math.PI);
    this.radiusYUpdateDirection = "down";
    var angle = direction === "left" ? generateRandomNumber(MAX_CONFETTI_ANGLE, MIN_CONFETTI_ANGLE) * Math.PI / 180 : generateRandomNumber(-MIN_CONFETTI_ANGLE, -MAX_CONFETTI_ANGLE) * Math.PI / 180;
    this.absCos = Math.abs(Math.cos(angle));
    this.absSin = Math.abs(Math.sin(angle));
    var positionShift = generateRandomNumber(-MAX_CONFETTI_POSITION_SHIFT, 0);
    var shiftedInitialPosition = {
      x: initialPosition.x + (direction === "left" ? -positionShift : positionShift) * this.absCos,
      y: initialPosition.y - positionShift * this.absSin
    };
    this.currentPosition = Object.assign({}, shiftedInitialPosition);
    this.initialPosition = Object.assign({}, shiftedInitialPosition);
    this.color = emojis.length ? null : generateRandomArrayElement(confettiColors);
    this.emoji = emojis.length ? generateRandomArrayElement(emojis) : null;
    this.createdAt = (/* @__PURE__ */ new Date()).getTime();
    this.direction = direction;
  }
  __name(ConfettiShape2, "ConfettiShape");
  _createClass(ConfettiShape2, [{
    key: "draw",
    value: /* @__PURE__ */ __name(function draw(canvasContext) {
      var currentPosition = this.currentPosition, radius = this.radius, color = this.color, emoji = this.emoji, rotationAngle = this.rotationAngle, emojiRotationAngle = this.emojiRotationAngle, emojiSize = this.emojiSize;
      var dpr = window.devicePixelRatio;
      if (color) {
        canvasContext.fillStyle = color;
        canvasContext.beginPath();
        canvasContext.ellipse(currentPosition.x * dpr, currentPosition.y * dpr, radius.x * dpr, radius.y * dpr, rotationAngle, 0, 2 * Math.PI);
        canvasContext.fill();
      } else if (emoji) {
        canvasContext.font = "".concat(emojiSize, "px serif");
        canvasContext.save();
        canvasContext.translate(dpr * currentPosition.x, dpr * currentPosition.y);
        canvasContext.rotate(emojiRotationAngle);
        canvasContext.textAlign = "center";
        canvasContext.fillText(emoji, 0, 0);
        canvasContext.restore();
      }
    }, "draw")
  }, {
    key: "updatePosition",
    value: /* @__PURE__ */ __name(function updatePosition(iterationTimeDelta, currentTime) {
      var confettiSpeed = this.confettiSpeed, dragForceCoefficient = this.dragForceCoefficient, finalConfettiSpeedX = this.finalConfettiSpeedX, radiusYUpdateDirection = this.radiusYUpdateDirection, rotationSpeed = this.rotationSpeed, createdAt = this.createdAt, direction = this.direction;
      var timeDeltaSinceCreation = currentTime - createdAt;
      if (confettiSpeed.x > finalConfettiSpeedX)
        this.confettiSpeed.x -= dragForceCoefficient * iterationTimeDelta;
      this.currentPosition.x += confettiSpeed.x * (direction === "left" ? -this.absCos : this.absCos) * iterationTimeDelta;
      this.currentPosition.y = this.initialPosition.y - confettiSpeed.y * this.absSin * timeDeltaSinceCreation + FREE_FALLING_OBJECT_ACCELERATION * Math.pow(timeDeltaSinceCreation, 2) / 2;
      this.rotationSpeed -= this.emoji ? 1e-4 : ROTATION_SLOWDOWN_ACCELERATION * iterationTimeDelta;
      if (this.rotationSpeed < 0)
        this.rotationSpeed = 0;
      if (this.emoji) {
        this.emojiRotationAngle += this.rotationSpeed * iterationTimeDelta % (2 * Math.PI);
        return;
      }
      if (radiusYUpdateDirection === "down") {
        this.radius.y -= iterationTimeDelta * rotationSpeed;
        if (this.radius.y <= 0) {
          this.radius.y = 0;
          this.radiusYUpdateDirection = "up";
        }
      } else {
        this.radius.y += iterationTimeDelta * rotationSpeed;
        if (this.radius.y >= this.initialRadius) {
          this.radius.y = this.initialRadius;
          this.radiusYUpdateDirection = "down";
        }
      }
    }, "updatePosition")
  }, {
    key: "getIsVisibleOnCanvas",
    value: /* @__PURE__ */ __name(function getIsVisibleOnCanvas(canvasHeight) {
      return this.currentPosition.y < canvasHeight + SHAPE_VISIBILITY_TRESHOLD;
    }, "getIsVisibleOnCanvas")
  }]);
  return ConfettiShape2;
}();
function createCanvas() {
  var canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "1000";
  canvas.style.pointerEvents = "none";
  document.body.appendChild(canvas);
  return canvas;
}
__name(createCanvas, "createCanvas");
function normalizeConfettiConfig(confettiConfig) {
  var _confettiConfig$confe = confettiConfig.confettiRadius, confettiRadius = _confettiConfig$confe === void 0 ? INITIAL_SHAPE_RADIUS : _confettiConfig$confe, _confettiConfig$confe2 = confettiConfig.confettiNumber, confettiNumber = _confettiConfig$confe2 === void 0 ? confettiConfig.confettiesNumber || (confettiConfig.emojis ? DEFAULT_EMOJIS_NUMBER : DEFAULT_CONFETTI_NUMBER) : _confettiConfig$confe2, _confettiConfig$confe3 = confettiConfig.confettiColors, confettiColors = _confettiConfig$confe3 === void 0 ? DEFAULT_CONFETTI_COLORS : _confettiConfig$confe3, _confettiConfig$emoji = confettiConfig.emojis, emojis = _confettiConfig$emoji === void 0 ? confettiConfig.emojies || [] : _confettiConfig$emoji, _confettiConfig$emoji2 = confettiConfig.emojiSize, emojiSize = _confettiConfig$emoji2 === void 0 ? INITIAL_EMOJI_SIZE : _confettiConfig$emoji2;
  if (confettiConfig.emojies)
    console.error("emojies argument is deprecated, please use emojis instead");
  if (confettiConfig.confettiesNumber)
    console.error("confettiesNumber argument is deprecated, please use confettiNumber instead");
  return {
    confettiRadius,
    confettiNumber,
    confettiColors,
    emojis,
    emojiSize
  };
}
__name(normalizeConfettiConfig, "normalizeConfettiConfig");
var ConfettiBatch = /* @__PURE__ */ function() {
  function ConfettiBatch2(canvasContext) {
    var _this = this;
    _classCallCheck(this, ConfettiBatch2);
    this.canvasContext = canvasContext;
    this.shapes = [];
    this.promise = new Promise(function(completionCallback) {
      return _this.resolvePromise = completionCallback;
    });
  }
  __name(ConfettiBatch2, "ConfettiBatch");
  _createClass(ConfettiBatch2, [{
    key: "getBatchCompletePromise",
    value: /* @__PURE__ */ __name(function getBatchCompletePromise() {
      return this.promise;
    }, "getBatchCompletePromise")
  }, {
    key: "addShapes",
    value: /* @__PURE__ */ __name(function addShapes() {
      var _this$shapes;
      (_this$shapes = this.shapes).push.apply(_this$shapes, arguments);
    }, "addShapes")
  }, {
    key: "complete",
    value: /* @__PURE__ */ __name(function complete() {
      var _a;
      if (this.shapes.length) {
        return false;
      }
      (_a = this.resolvePromise) === null || _a === void 0 ? void 0 : _a.call(this);
      return true;
    }, "complete")
  }, {
    key: "processShapes",
    value: /* @__PURE__ */ __name(function processShapes(time, canvasHeight, cleanupInvisibleShapes) {
      var _this2 = this;
      var timeDelta = time.timeDelta, currentTime = time.currentTime;
      this.shapes = this.shapes.filter(function(shape) {
        shape.updatePosition(timeDelta, currentTime);
        shape.draw(_this2.canvasContext);
        if (!cleanupInvisibleShapes) {
          return true;
        }
        return shape.getIsVisibleOnCanvas(canvasHeight);
      });
    }, "processShapes")
  }]);
  return ConfettiBatch2;
}();
var JSConfetti = /* @__PURE__ */ function() {
  function JSConfetti2() {
    var jsConfettiConfig = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _classCallCheck(this, JSConfetti2);
    this.activeConfettiBatches = [];
    this.canvas = jsConfettiConfig.canvas || createCanvas();
    this.canvasContext = this.canvas.getContext("2d");
    this.requestAnimationFrameRequested = false;
    this.lastUpdated = (/* @__PURE__ */ new Date()).getTime();
    this.iterationIndex = 0;
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }
  __name(JSConfetti2, "JSConfetti");
  _createClass(JSConfetti2, [{
    key: "loop",
    value: /* @__PURE__ */ __name(function loop() {
      this.requestAnimationFrameRequested = false;
      fixDPR(this.canvas);
      var currentTime = (/* @__PURE__ */ new Date()).getTime();
      var timeDelta = currentTime - this.lastUpdated;
      var canvasHeight = this.canvas.offsetHeight;
      var cleanupInvisibleShapes = this.iterationIndex % 10 === 0;
      this.activeConfettiBatches = this.activeConfettiBatches.filter(function(batch) {
        batch.processShapes({
          timeDelta,
          currentTime
        }, canvasHeight, cleanupInvisibleShapes);
        if (!cleanupInvisibleShapes) {
          return true;
        }
        return !batch.complete();
      });
      this.iterationIndex++;
      this.queueAnimationFrameIfNeeded(currentTime);
    }, "loop")
  }, {
    key: "queueAnimationFrameIfNeeded",
    value: /* @__PURE__ */ __name(function queueAnimationFrameIfNeeded(currentTime) {
      if (this.requestAnimationFrameRequested) {
        return;
      }
      if (this.activeConfettiBatches.length < 1) {
        return;
      }
      this.requestAnimationFrameRequested = true;
      this.lastUpdated = currentTime || (/* @__PURE__ */ new Date()).getTime();
      requestAnimationFrame(this.loop);
    }, "queueAnimationFrameIfNeeded")
  }, {
    key: "addConfetti",
    value: /* @__PURE__ */ __name(function addConfetti() {
      var confettiConfig = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var _normalizeConfettiCon = normalizeConfettiConfig(confettiConfig), confettiRadius = _normalizeConfettiCon.confettiRadius, confettiNumber = _normalizeConfettiCon.confettiNumber, confettiColors = _normalizeConfettiCon.confettiColors, emojis = _normalizeConfettiCon.emojis, emojiSize = _normalizeConfettiCon.emojiSize;
      var canvasRect = this.canvas.getBoundingClientRect();
      var canvasWidth = canvasRect.width;
      var canvasHeight = canvasRect.height;
      var yPosition = canvasHeight * 5 / 7;
      var leftConfettiPosition = {
        x: 0,
        y: yPosition
      };
      var rightConfettiPosition = {
        x: canvasWidth,
        y: yPosition
      };
      var confettiGroup = new ConfettiBatch(this.canvasContext);
      for (var i = 0; i < confettiNumber / 2; i++) {
        var confettiOnTheRight = new ConfettiShape({
          initialPosition: leftConfettiPosition,
          direction: "right",
          confettiRadius,
          confettiColors,
          confettiNumber,
          emojis,
          emojiSize,
          canvasWidth
        });
        var confettiOnTheLeft = new ConfettiShape({
          initialPosition: rightConfettiPosition,
          direction: "left",
          confettiRadius,
          confettiColors,
          confettiNumber,
          emojis,
          emojiSize,
          canvasWidth
        });
        confettiGroup.addShapes(confettiOnTheRight, confettiOnTheLeft);
      }
      this.activeConfettiBatches.push(confettiGroup);
      this.queueAnimationFrameIfNeeded();
      return confettiGroup.getBatchCompletePromise();
    }, "addConfetti")
  }, {
    key: "clearCanvas",
    value: /* @__PURE__ */ __name(function clearCanvas() {
      this.activeConfettiBatches = [];
    }, "clearCanvas")
  }, {
    key: "destroyCanvas",
    value: /* @__PURE__ */ __name(function destroyCanvas() {
      this.canvas.remove();
    }, "destroyCanvas")
  }]);
  return JSConfetti2;
}();
var es_default = JSConfetti;

// mol/vite/ctl/ctl.ts
function $mol_vite_ctl_run() {
  new es_default().addConfetti();
}
__name($mol_vite_ctl_run, "$mol_vite_ctl_run");

// mol/vite/vite.view.ts
$.$mol_vite_ctl_run = $mol_vite_ctl_run;
var $mol_vite_sfunc = /* @__PURE__ */ __name(function($b) {
  if (this)
    this.$ = $b;
  class $mol_vite2 extends $.$mol_vite {
    static {
      __name(this, "$mol_vite");
    }
    click() {
      console.log("CLICK");
      $mol_vite_ctl_run();
    }
  }
  $b.$mol_vite = $mol_vite2;
}, "$mol_vite_sfunc");
$mol_vite_sfunc($);
