"use strict";
(() => {
  // mam_namespace:H:/GITHUB/mam/mol/ambient/ambient.ts
  var $mol_ambient_ref = Symbol("$mol_ambient_ref");

  // mam_namespace:H:/GITHUB/mam/mol/delegate/delegate.ts
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
  Reflect.defineProperty(
    $mol_delegate,
    Symbol.hasInstance,
    {
      value: (obj) => instances.has(obj)
    }
  );

  // mam_namespace:H:/GITHUB/mam/mol/owning/owning.ts
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
  function $mol_owning_check(owner, having) {
    if (!$mol_owning_allow(having))
      return false;
    if ($mol_owning_map.get(having) !== owner)
      return false;
    return true;
  }
  function $mol_owning_catch(owner, having) {
    if (!$mol_owning_allow(having))
      return false;
    if ($mol_owning_map.get(having))
      return false;
    $mol_owning_map.set(having, owner);
    return true;
  }

  // mam_namespace:H:/GITHUB/mam/mol/fail/hidden/hidden.ts
  function $mol_fail_hidden(error) {
    throw error;
  }

  // mam_namespace:H:/GITHUB/mam/mol/func/name/name.ts
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

  // mam_namespace:H:/GITHUB/mam/mol/object2/object2.ts
  $.$mol_ambient_ref = $mol_ambient_ref;
  $.$mol_owning_get = $mol_owning_get;
  $.$mol_fail_hidden = $mol_fail_hidden;
  $.$mol_func_name = $mol_func_name;
  var $mol_object2 = class _$mol_object2 {
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

  // mam_namespace:H:/GITHUB/mam/mol/object/object.ts
  $.$mol_object2 = $mol_object2;
  var $mol_object_field = Symbol("$mol_object_field");
  var $mol_object = class extends $mol_object2 {
    static make(config) {
      return super.create((obj) => {
        for (let key in config)
          obj[key] = config[key];
      });
    }
  };

  // mam_namespace:H:/GITHUB/mam/mol/fail/fail.ts
  function $mol_fail(error) {
    throw error;
  }

  // mam_namespace:H:/GITHUB/mam/mol/wire/wire.ts
  var $mol_wire_auto_sub = null;
  function $mol_wire_auto(next = $mol_wire_auto_sub) {
    return $mol_wire_auto_sub = next;
  }

  // mam_namespace:H:/GITHUB/mam/mol/wire/cursor/cursor.ts
  var $mol_wire_cursor = /* @__PURE__ */ (($mol_wire_cursor2) => {
    $mol_wire_cursor2[$mol_wire_cursor2["stale"] = -1] = "stale";
    $mol_wire_cursor2[$mol_wire_cursor2["doubt"] = -2] = "doubt";
    $mol_wire_cursor2[$mol_wire_cursor2["fresh"] = -3] = "fresh";
    $mol_wire_cursor2[$mol_wire_cursor2["final"] = -4] = "final";
    return $mol_wire_cursor2;
  })($mol_wire_cursor || {});

  // mam_namespace:H:/GITHUB/mam/mol/wire/pub/pub.ts
  $.$mol_fail = $mol_fail;
  $.$mol_wire_auto = $mol_wire_auto;
  $.$mol_wire_cursor = $mol_wire_cursor;
  var $mol_wire_pub = class extends Object {
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

  // mam_namespace:H:/GITHUB/mam/mol/dev/format/format.ts
  (void 0)($)["devtoolsFormatters"] ||= [];
  function $mol_dev_format_register(config) {
    $["devtoolsFormatters"].push(config);
  }
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

  // mam_namespace:H:/GITHUB/mam/mol/wire/pub/sub/sub.ts
  $.$mol_wire_pub = $mol_wire_pub;
  $.$mol_wire_cursor = $mol_wire_cursor;
  $.$mol_wire_auto = $mol_wire_auto;
  $.$mol_fail = $mol_fail;
  $.$mol_dev_format_head = $mol_dev_format_head;
  $.$mol_dev_format_native = $mol_dev_format_native;
  var $mol_wire_pub_sub = class extends $mol_wire_pub {
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

  // mam_namespace:H:/GITHUB/mam/mol/after/frame/frame.web.ts
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
    static _promise = null;
    static get promise() {
      if (this._promise)
        return this._promise;
      return this._promise = new Promise((done) => {
        const complete = () => {
          this._promise = null;
          done();
        };
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

  // mam_namespace:H:/GITHUB/mam/mol/promise/like/like.ts
  function $mol_promise_like(val) {
    return val && typeof val === "object" && "then" in val && typeof val.then === "function";
  }

  // mam_namespace:H:/GITHUB/mam/mol/wire/fiber/fiber.ts
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
          const put = (res) => {
            if (this.cache === result)
              this.put(res);
            return res;
          };
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

  // mam_namespace:H:/GITHUB/mam/mol/guid/guid.ts
  function $mol_guid(length = 8, exists = () => false) {
    for (; ; ) {
      let id = Math.random().toString(36).substring(2, length + 2).toUpperCase();
      if (exists(id))
        continue;
      return id;
    }
  }

  // mam_namespace:H:/GITHUB/mam/mol/key/key.ts
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

  // mam_namespace:H:/GITHUB/mam/mol/compare/deep/deep.ts
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
  function compare_set(left, right) {
    if (left.size !== right.size)
      return false;
    return compare_iterator(left.values(), right.values());
  }
  function compare_map(left, right) {
    if (left.size !== right.size)
      return false;
    return compare_iterator(left.keys(), right.keys()) && compare_iterator(left.values(), right.values());
  }
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
  function compare_primitive(left, right) {
    return Object.is(
      left[Symbol.toPrimitive]("default"),
      right[Symbol.toPrimitive]("default")
    );
  }

  // mam_namespace:H:/GITHUB/mam/mol/log3/log3.web.ts
  $.$mol_log3_stack = $mol_log3_stack;
  $.$mol_log3_come = $mol_log3_come;
  $.$mol_log3_done = $mol_log3_done;
  $.$mol_log3_fail = $mol_log3_fail;
  $.$mol_log3_warn = $mol_log3_warn;
  $.$mol_log3_rise = $mol_log3_rise;
  $.$mol_log3_area = $mol_log3_area;
  function $mol_log3_web_make(level, color) {
    return function $mol_log3_logger(event) {
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
    };
  }
  $.$mol_log3_come = $mol_log3_web_make("info", "royalblue");
  $.$mol_log3_done = $mol_log3_web_make("info", "forestgreen");
  $.$mol_log3_fail = $mol_log3_web_make("error", "orangered");
  $.$mol_log3_warn = $mol_log3_web_make("warn", "goldenrod");
  $.$mol_log3_rise = $mol_log3_web_make("log", "magenta");
  $.$mol_log3_area = $mol_log3_web_make("group", "cyan");

  // mam_namespace:H:/GITHUB/mam/mol/log3/log3.ts
  var $mol_log3_come;
  var $mol_log3_done;
  var $mol_log3_fail;
  var $mol_log3_warn;
  var $mol_log3_rise;
  var $mol_log3_area;
  var $mol_log3_stack = [];

  // mam_namespace:H:/GITHUB/mam/mol/wire/task/task.ts
  $.$mol_wire_fiber = $mol_wire_fiber;
  $.$mol_wire_auto = $mol_wire_auto;
  $.$mol_compare_deep = $mol_compare_deep;
  $.$mol_log3_warn = $mol_log3_warn;
  $.$mol_promise_like = $mol_promise_like;
  $.$mol_wire_cursor = $mol_wire_cursor;
  var $mol_wire_task = class _$mol_wire_task extends $mol_wire_fiber {
    static getter(task) {
      return function $mol_wire_task_get(host, args) {
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
      };
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

  // mam_namespace:H:/GITHUB/mam/mol/wire/method/method.ts
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
    const value = function(...args) {
      const fiber = temp(this ?? null, args);
      return fiber.sync();
    };
    Object.defineProperty(value, "name", { value: orig.name + " " });
    Object.assign(value, { orig });
    const descr2 = { ...descr, value };
    Reflect.defineProperty(host, field, descr2);
    return descr2;
  }

  // mam_namespace:H:/GITHUB/mam/mol/fail/catch/catch.ts
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

  // mam_namespace:H:/GITHUB/mam/mol/fail/log/log.ts
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

  // mam_namespace:H:/GITHUB/mam/mol/wire/atom/atom.ts
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
  var $mol_wire_atom = class _$mol_wire_atom extends $mol_wire_fiber {
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
    @$mol_wire_method
    resync(args) {
      return this.put(this.task.call(this.host, ...args));
    }
    @$mol_wire_method
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

  // mam_namespace:H:/GITHUB/mam/mol/wire/solo/solo.ts
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

  // mam_namespace:H:/GITHUB/mam/mol/wire/plex/plex.ts
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

  // mam_namespace:H:/GITHUB/mam/mol/mem/mem.ts
  $.$mol_wire_solo = $mol_wire_solo;
  $.$mol_wire_plex = $mol_wire_plex;
  var $mol_mem = $mol_wire_solo;
  var $mol_mem_key = $mol_wire_plex;

  // mam_namespace:H:/GITHUB/mam/mol/window/window.web.ts
  $.$mol_object = $mol_object;
  $.$mol_mem = $mol_mem;
  var $mol_window = class extends $mol_object {
    @$mol_mem
    static size() {
      this.resizes();
      return {
        width: self.innerWidth,
        height: self.innerHeight
      };
    }
    @$mol_mem
    static resizes(next) {
      return next;
    }
  };
  self.addEventListener("resize", (event) => $mol_window.resizes(event));

  // mam_namespace:H:/GITHUB/mam/mol/dom/context/context.ts
  var $mol_dom_context = window;

  // mam_namespace:H:/GITHUB/mam/mol/dom/context/context.web.ts
  $.$mol_dom_context = $mol_dom_context;
  $.$mol_dom_context = self;

  // mam_namespace:H:/GITHUB/mam/mol/after/tick/tick.ts
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
    promise;
    cancelled = false;
    destructor() {
      this.cancelled = true;
    }
  };

  // mam_namespace:H:/GITHUB/mam/mol/view/selection/selection.ts
  $.$mol_object = $mol_object;
  $.$mol_mem = $mol_mem;
  $.$mol_dom_context = $mol_dom_context;
  $.$mol_after_tick = $mol_after_tick;
  var $mol_view_selection = class extends $mol_object {
    @$mol_mem
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

  // mam_namespace:H:/GITHUB/mam/mol/maybe/maybe.ts
  function $mol_maybe(value) {
    return value == null ? [] : [value];
  }

  // mam_namespace:H:/GITHUB/mam/mol/view/selection/selection.web.ts
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

  // mam_namespace:H:/GITHUB/mam/mol/wrapper/wrapper.ts
  $.$mol_object2 = $mol_object2;
  var $mol_wrapper = class extends $mol_object2 {
    static wrap;
    static run(task) {
      return this.func(task)();
    }
    static func(func) {
      return this.wrap(func);
    }
    static get class() {
      return (Class) => {
        const construct = (target, args) => new Class(...args);
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

  // mam_namespace:H:/GITHUB/mam/mol/memo/memo.ts
  $.$mol_wrapper = $mol_wrapper;
  var $mol_memo = class extends $mol_wrapper {
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

  // mam_namespace:H:/GITHUB/mam/mol/dom/qname/qname.ts
  function $mol_dom_qname(name) {
    return name.replace(/\W/g, "").replace(/^(?=\d+)/, "_");
  }

  // mam_namespace:H:/GITHUB/mam/mol/wire/probe/probe.ts
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

  // mam_namespace:H:/GITHUB/mam/mol/wire/watch/watch.ts
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

  // mam_namespace:H:/GITHUB/mam/mol/const/const.ts
  $.$mol_dev_format_head = $mol_dev_format_head;
  $.$mol_dev_format_auto = $mol_dev_format_auto;
  $.$mol_dev_format_span = $mol_dev_format_span;
  function $mol_const(value) {
    const getter = () => value;
    getter["()"] = value;
    getter[Symbol.toStringTag] = value;
    getter[$mol_dev_format_head] = () => $mol_dev_format_span({}, "()=> ", $mol_dev_format_auto(value));
    return getter;
  }

  // mam_namespace:H:/GITHUB/mam/mol/wire/solid/solid.ts
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
  var nothing = () => {
  };
  var sub = new $mol_wire_pub_sub();

  // mam_namespace:H:/GITHUB/mam/mol/dom/render/attributes/attributes.ts
  function $mol_dom_render_attributes(el, attrs) {
    for (let name in attrs) {
      let val = attrs[name];
      if (val === void 0) {
        continue;
      }
      if (val === null || val === false) {
        if (!el.hasAttribute(name))
          continue;
        el.removeAttribute(name);
      } else {
        const str = String(val);
        if (el.getAttribute(name) === str)
          continue;
        el.setAttribute(name, str);
      }
    }
  }

  // mam_namespace:H:/GITHUB/mam/mol/dom/render/events/events.ts
  function $mol_dom_render_events(el, events, passive = false) {
    for (let name in events) {
      el.addEventListener(name, events[name], { passive });
    }
  }

  // mam_namespace:H:/GITHUB/mam/mol/dom/render/styles/styles.ts
  function $mol_dom_render_styles(el, styles) {
    for (let name in styles) {
      let val = styles[name];
      const style = el.style;
      const kebab = (name2) => name2.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase());
      if (typeof val === "number") {
        style.setProperty(kebab(name), `${val}px`);
      } else {
        style.setProperty(kebab(name), val);
      }
    }
  }

  // mam_namespace:H:/GITHUB/mam/mol/dom/render/children/children.ts
  $.$mol_dom_context = $mol_dom_context;
  function $mol_dom_render_children(el, childNodes) {
    const node_set = new Set(childNodes);
    let nextNode = el.firstChild;
    for (let view of childNodes) {
      if (view == null)
        continue;
      if (view instanceof $mol_dom_context.Node) {
        while (true) {
          if (!nextNode) {
            el.appendChild(view);
            break;
          }
          if (nextNode == view) {
            nextNode = nextNode.nextSibling;
            break;
          } else {
            if (node_set.has(nextNode)) {
              el.insertBefore(view, nextNode);
              break;
            } else {
              const nn = nextNode.nextSibling;
              el.removeChild(nextNode);
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
          el.insertBefore(textNode, nextNode);
        }
      }
    }
    while (nextNode) {
      const currNode = nextNode;
      nextNode = currNode.nextSibling;
      el.removeChild(currNode);
    }
  }

  // mam_namespace:H:/GITHUB/mam/mol/dom/render/fields/fields.ts
  function $mol_dom_render_fields(el, fields) {
    for (let key in fields) {
      const val = fields[key];
      if (val === void 0)
        continue;
      el[key] = val;
    }
  }

  // mam_namespace:H:/GITHUB/mam/mol/wire/async/async.ts
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
        return function $mol_wire_async2(...args) {
          fiber2?.destructor();
          fiber2 = temp2(obj2, args);
          return fiber2.async();
        };
      },
      apply(obj2, self2, args) {
        fiber?.destructor();
        fiber = temp(self2, args);
        return fiber.async();
      }
    });
  }

  // mam_namespace:H:/GITHUB/mam/mol/view/view/view.ts
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
  var $mol_view = class _$mol_view extends $mol_object {
    @$mol_mem_key
    static Root(id) {
      return new this();
    }
    @$mol_mem
    autorun() {
      try {
        this.dom_tree();
        document.title = this.title();
      } catch (error) {
        $mol_fail_log(error);
      }
    }
    @$mol_mem
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
    @$mol_mem
    title() {
      return this.toString().match(/.*\.(\w+)/)?.[1] ?? this.toString();
    }
    @$mol_mem
    focused(next) {
      let node = this.dom_node();
      const value = $mol_view_selection.focused(next === void 0 ? void 0 : next ? [node] : []);
      return value.indexOf(node) !== -1;
    }
    state_key(suffix = "") {
      return this.$.$mol_view_state_key(suffix);
    }
    @$mol_memo.method
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
    @$mol_mem
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
    @$mol_mem
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
    @$mol_mem
    view_rect() {
      if ($mol_wire_probe(() => this.view_rect()) === void 0) {
        $mol_wire_watch();
        return null;
      } else {
        const { width, height, left, right, top, bottom } = this.dom_node().getBoundingClientRect();
        return { width, height, left, right, top, bottom };
      }
    }
    @$mol_memo.method
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
    @$mol_mem
    dom_node(next) {
      $mol_wire_solid();
      const node = this.dom_node_external(next);
      $mol_dom_render_attributes(node, this.attr_static());
      const events = this.event_async();
      $mol_dom_render_events(node, events);
      return node;
    }
    @$mol_mem
    dom_final() {
      this.render();
      const sub2 = this.sub_visible();
      if (!sub2)
        return;
      for (const el of sub2) {
        if (el && typeof el === "object" && "dom_final" in el) {
          el["dom_final"]();
        }
      }
      return this.dom_node();
    }
    @$mol_mem
    dom_tree(next) {
      const node = this.dom_node(next);
      render:
        try {
          $mol_dom_render_attributes(node, { mol_view_error: null });
          try {
            this.render();
          } finally {
            for (let plugin of this.plugins()) {
              plugin.dom_tree();
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
    @$mol_mem
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
    @$mol_mem
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
      for (const el of sub2)
        if (el && typeof el === "object" && "dom_tree" in el)
          el["dom_tree"]();
      $mol_dom_render_fields(node, this.field());
    }
    @$mol_memo.method
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
    @$mol_memo.method
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
    @$mol_memo.method
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
    @$mol_mem
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
    @$mol_mem
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

  // mam_namespace:H:/GITHUB/mam/mol/view/view/view.web.ts
  $.$mol_dom_context = $mol_dom_context;
  $.$mol_view = $mol_view;
  $mol_dom_context.document?.addEventListener(
    "DOMContentLoaded",
    () => $mol_view.autobind(),
    { once: true }
  );

  // mam_namespace:H:/GITHUB/mam/mol/dom/listener/listener.ts
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
    destructor() {
      this._node.removeEventListener(this._event, this._handler, this._config);
      super.destructor();
    }
  };

  // mam_namespace:H:/GITHUB/mam/mol/print/print.ts
  $.$mol_object = $mol_object;
  $.$mol_mem = $mol_mem;
  $.$mol_dom_listener = $mol_dom_listener;
  $.$mol_dom_context = $mol_dom_context;
  var $mol_print = class extends $mol_object {
    @$mol_mem
    static before() {
      return new $mol_dom_listener(this.$.$mol_dom_context, "beforeprint", () => {
        this.active(true);
      });
    }
    @$mol_mem
    static after() {
      return new $mol_dom_listener(this.$.$mol_dom_context, "afterprint", () => {
        this.active(false);
      });
    }
    @$mol_mem
    static active(next) {
      this.before();
      this.after();
      return next || false;
    }
  };

  // mam_namespace:H:/GITHUB/mam/mol/scroll/scroll.view.ts
  $.$mol_mem = $mol_mem;
  $.$mol_print = $mol_print;
  var $mol_scroll = class extends $.$mol_scroll {
    @$mol_mem
    scroll_top(next, cache) {
      const el = this.dom_node();
      if (next !== void 0 && !cache)
        el.scrollTop = next;
      return el.scrollTop;
    }
    @$mol_mem
    scroll_left(next, cache) {
      const el = this.dom_node();
      if (next !== void 0 && !cache)
        el.scrollLeft = next;
      return el.scrollLeft;
    }
    event_scroll(next) {
      const el = this.dom_node();
      this.scroll_left(el.scrollLeft, "cache");
      this.scroll_top(el.scrollTop, "cache");
    }
    minimal_height() {
      return this.$.$mol_print.active() ? null : 0;
    }
    minimal_width() {
      return this.$.$mol_print.active() ? null : 0;
    }
  };

  // mam_namespace:H:/GITHUB/mam/mol/scroll/scroll.view.tree
  $.$mol_view = $mol_view;
  $.$mol_mem = $mol_mem;
  var $mol_scroll2 = class extends $.$mol_view {
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
    tabindex() {
      return -1;
    }
    event_scroll(next) {
      if (next !== void 0)
        return next;
      return null;
    }
  };
  $.$mol_scroll = $mol_scroll2;
  $mol_mem($.$mol_scroll.prototype, "scroll_top");
  $mol_mem($.$mol_scroll.prototype, "scroll_left");
  $mol_mem($.$mol_scroll.prototype, "event_scroll");

  // mam_namespace:H:/GITHUB/mam/mol/page/page.view.tree
  $.$mol_view = $mol_view;
  $.$mol_mem = $mol_mem;
  var $mol_page = class extends $.$mol_view {
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
  };
  $.$mol_page = $mol_page;
  $mol_mem($.$mol_page.prototype, "Title");
  $mol_mem($.$mol_page.prototype, "Tools");
  $mol_mem($.$mol_page.prototype, "Head");
  $mol_mem($.$mol_page.prototype, "Body_content");
  $mol_mem($.$mol_page.prototype, "Body");
  $mol_mem($.$mol_page.prototype, "Foot");

  // mam_namespace:H:/GITHUB/mam/mol/button/button.view.ts
  $.$mol_mem = $mol_mem;
  $.$mol_fail_hidden = $mol_fail_hidden;
  $.$mol_fail_log = $mol_fail_log;
  var $mol_button = class extends $.$mol_button {
    @$mol_mem
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
      if (event.keyCode === $mol_keyboard_code.enter) {
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
  };

  // mam_namespace:H:/GITHUB/mam/mol/speck/speck.view.tree
  $.$mol_view = $mol_view;
  var $mol_speck = class extends $.$mol_view {
    attr() {
      return { ...super.attr(), "mol_theme": this.theme() };
    }
    style() {
      return { ...super.style(), "minHeight": "1em" };
    }
    sub() {
      return [this.value()];
    }
    theme() {
      return "$mol_theme_accent";
    }
    value() {
      return null;
    }
  };
  $.$mol_speck = $mol_speck;

  // mam_namespace:H:/GITHUB/mam/mol/button/button.view.tree
  $.$mol_view = $mol_view;
  $.$mol_mem = $mol_mem;
  var $mol_button2 = class extends $.$mol_view {
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
  };
  $.$mol_button = $mol_button2;
  $mol_mem($.$mol_button.prototype, "click");
  $mol_mem($.$mol_button.prototype, "event_click");
  $mol_mem($.$mol_button.prototype, "Speck");
  $mol_mem($.$mol_button.prototype, "event_activate");
  $mol_mem($.$mol_button.prototype, "clicks");
  $mol_mem($.$mol_button.prototype, "event_key_press");

  // mam_namespace:H:/GITHUB/mam/mol/button/typed/typed.view.tree
  var $mol_button_typed = class extends $.$mol_button {
    minimal_height() {
      return 40;
    }
    minimal_width() {
      return 40;
    }
  };
  $.$mol_button_typed = $mol_button_typed;

  // mam_namespace:H:/GITHUB/mam/mol/button/major/major.view.tree
  var $mol_button_major = class extends $.$mol_button_typed {
    attr() {
      return { ...super.attr(), "mol_theme": "$mol_theme_accent" };
    }
  };
  $.$mol_button_major = $mol_button_major;

  // mam_namespace:H:/GITHUB/mam/mol/vite/vite.view.tree
  $.$mol_mem = $mol_mem;
  var $mol_vite = class extends $.$mol_page {
    body() {
      return [this.b()];
    }
    b() {
      const obj = new this.$.$mol_button_major();
      obj.title = () => "RUN";
      obj.click = (next) => this.click(next);
      return obj;
    }
  };
  $.$mol_vite = $mol_vite;
  $mol_mem($.$mol_vite.prototype, "b");

  // mam_namespace:H:/GITHUB/mam/mol/vite/vite.view.ts
  var $mol_vite2 = class extends $.$mol_vite {
    click() {
      console.log("CLICK");
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
    }
    counter = 1;
    auto() {
      setInterval(() => {
        this.text("TIME " + this.counter++);
      }, 1e3);
    }
  };
})();
