var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/mol_tree2/web.js
var require_web = __commonJS({
  "node_modules/mol_tree2/web.js"(exports, module) {
    "use strict";
    var $node = $node || {};
    void function(module2) {
      var exports2 = module2.exports = this;
      function require3(id) {
        return $node[id.replace(/^.\//, "../")];
      }
      ;
      ;
      "use strict";
      Error.stackTraceLimit = 50;
      var $4;
      /* @__PURE__ */ (function($5) {
      })($4 || ($4 = {}));
      module2.exports = $4;
      ;
      $node["../mam.ts"] = $node["../mam.ts"] = module2.exports;
    }.call({}, {});
    var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var $3 = typeof module === "object" ? module["exports"] = globalThis : globalThis;
    $3.$$ = $3;
    var $3;
    (function($4) {
      $4.$mol_ambient_ref = Symbol("$mol_ambient_ref");
      function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this || $4);
      }
      $4.$mol_ambient = $mol_ambient;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      const instances = /* @__PURE__ */ new WeakSet();
      function $mol_delegate2(proto, target) {
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
          apply: (_, self, args) => Reflect.apply(target(), self, args),
          construct: (_, args, retarget) => Reflect.construct(target(), args, retarget),
          defineProperty: (_, field, descr) => Reflect.defineProperty(target(), field, descr),
          deleteProperty: (_, field) => Reflect.deleteProperty(target(), field)
        });
        instances.add(proxy);
        return proxy;
      }
      $4.$mol_delegate = $mol_delegate2;
      Reflect.defineProperty($mol_delegate2, Symbol.hasInstance, {
        value: (obj) => instances.has(obj)
      });
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      $4.$mol_owning_map = /* @__PURE__ */ new WeakMap();
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
      $4.$mol_owning_allow = $mol_owning_allow;
      function $mol_owning_get2(having, Owner) {
        if (!$mol_owning_allow(having))
          return null;
        while (true) {
          const owner = $4.$mol_owning_map.get(having);
          if (!owner)
            return owner;
          if (!Owner)
            return owner;
          if (owner instanceof Owner)
            return owner;
          having = owner;
        }
      }
      $4.$mol_owning_get = $mol_owning_get2;
      function $mol_owning_check(owner, having) {
        if (!$mol_owning_allow(having))
          return false;
        if ($4.$mol_owning_map.get(having) !== owner)
          return false;
        return true;
      }
      $4.$mol_owning_check = $mol_owning_check;
      function $mol_owning_catch(owner, having) {
        if (!$mol_owning_allow(having))
          return false;
        if ($4.$mol_owning_map.get(having))
          return false;
        $4.$mol_owning_map.set(having, owner);
        return true;
      }
      $4.$mol_owning_catch = $mol_owning_catch;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_fail2(error) {
        throw error;
      }
      $4.$mol_fail = $mol_fail2;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_fail_hidden2(error) {
        throw error;
      }
      $4.$mol_fail_hidden = $mol_fail_hidden2;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      const named = /* @__PURE__ */ new WeakSet();
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
      $4.$mol_func_name = $mol_func_name;
      function $mol_func_name_from(target, source) {
        Object.defineProperty(target, "name", { value: source.name });
        return target;
      }
      $4.$mol_func_name_from = $mol_func_name_from;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      class $mol_object22 {
        static $ = $4;
        [Symbol.toStringTag];
        [$mol_ambient_ref] = null;
        get $() {
          if (this[$mol_ambient_ref])
            return this[$mol_ambient_ref];
          const owner = $mol_owning_get(this);
          return this[$mol_ambient_ref] = owner?.$ || $mol_object22.$;
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
        toString() {
          return this[Symbol.toStringTag] || this.constructor.name + "<>";
        }
      }
      $4.$mol_object2 = $mol_object22;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      class $mol_span2 extends $mol_object2 {
        uri;
        source;
        row;
        col;
        length;
        constructor(uri, source, row, col, length) {
          super();
          this.uri = uri;
          this.source = source;
          this.row = row;
          this.col = col;
          this.length = length;
          this[Symbol.toStringTag] = `${this.uri}#${this.row}:${this.col}/${this.length}`;
        }
        static unknown = $mol_span2.begin("?");
        static begin(uri, source = "") {
          return new $mol_span2(uri, source, 1, 1, 0);
        }
        static end(uri, source) {
          return new $mol_span2(uri, source, 1, source.length + 1, 0);
        }
        static entire(uri, source) {
          return new $mol_span2(uri, source, 1, 1, source.length);
        }
        toString() {
          return this[Symbol.toStringTag];
        }
        toJSON() {
          return {
            uri: this.uri,
            row: this.row,
            col: this.col,
            length: this.length
          };
        }
        error(message, Class = Error) {
          return new Class(`${message} (${this})`);
        }
        span(row, col, length) {
          return new $mol_span2(this.uri, this.source, row, col, length);
        }
        after(length = 0) {
          return new $mol_span2(this.uri, this.source, this.row, this.col + this.length, length);
        }
        slice(begin2, end2 = -1) {
          let len = this.length;
          if (begin2 < 0)
            begin2 += len;
          if (end2 < 0)
            end2 += len;
          if (begin2 < 0 || begin2 > len)
            this.$.$mol_fail(this.error(`Begin value '${begin2}' out of range`, RangeError));
          if (end2 < 0 || end2 > len)
            this.$.$mol_fail(this.error(`End value '${end2}' out of range`, RangeError));
          if (end2 < begin2)
            this.$.$mol_fail(this.error(`End value '${end2}' can't be less than begin value`, RangeError));
          return this.span(this.row, this.col + begin2, end2 - begin2);
        }
      }
      $4.$mol_span = $mol_span2;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      class $mol_error_syntax extends SyntaxError {
        reason;
        line;
        span;
        constructor(reason, line, span) {
          super(`${reason}
${span}
${line.substring(0, span.col - 1).replace(/\S/g, " ")}${"".padEnd(span.length, "!")}
${line}`);
          this.reason = reason;
          this.line = line;
          this.span = span;
        }
      }
      $4.$mol_error_syntax = $mol_error_syntax;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_tree2_from_string(str, uri = "?") {
        const span = $mol_span.entire(uri, str);
        var root = $mol_tree2.list([], span);
        var stack = [root];
        var pos = 0, row = 0, min_indent = 0;
        while (str.length > pos) {
          var indent = 0;
          var line_start = pos;
          row++;
          while (str.length > pos && str[pos] == "	") {
            indent++;
            pos++;
          }
          if (!root.kids.length) {
            min_indent = indent;
          }
          indent -= min_indent;
          if (indent < 0 || indent >= stack.length) {
            const sp = span.span(row, 1, pos - line_start);
            while (str.length > pos && str[pos] != "\n") {
              pos++;
            }
            if (indent < 0) {
              if (str.length > pos) {
                this.$mol_fail(new this.$mol_error_syntax(`Too few tabs`, str.substring(line_start, pos), sp));
              }
            } else {
              this.$mol_fail(new this.$mol_error_syntax(`Too many tabs`, str.substring(line_start, pos), sp));
            }
          }
          stack.length = indent + 1;
          var parent = stack[indent];
          while (str.length > pos && str[pos] != "\\" && str[pos] != "\n") {
            var error_start = pos;
            while (str.length > pos && (str[pos] == " " || str[pos] == "	")) {
              pos++;
            }
            if (pos > error_start) {
              let line_end = str.indexOf("\n", pos);
              if (line_end === -1)
                line_end = str.length;
              const sp = span.span(row, error_start - line_start + 1, pos - error_start);
              this.$mol_fail(new this.$mol_error_syntax(`Wrong nodes separator`, str.substring(line_start, line_end), sp));
            }
            var type_start = pos;
            while (str.length > pos && str[pos] != "\\" && str[pos] != " " && str[pos] != "	" && str[pos] != "\n") {
              pos++;
            }
            if (pos > type_start) {
              let next = new $mol_tree2(str.slice(type_start, pos), "", [], span.span(row, type_start - line_start + 1, pos - type_start));
              const parent_kids = parent.kids;
              parent_kids.push(next);
              parent = next;
            }
            if (str.length > pos && str[pos] == " ") {
              pos++;
            }
          }
          if (str.length > pos && str[pos] == "\\") {
            var data_start = pos;
            while (str.length > pos && str[pos] != "\n") {
              pos++;
            }
            let next = new $mol_tree2("", str.slice(data_start + 1, pos), [], span.span(row, data_start - line_start + 2, pos - data_start - 1));
            const parent_kids = parent.kids;
            parent_kids.push(next);
            parent = next;
          }
          if (str.length === pos && stack.length > 0) {
            const sp = span.span(row, pos - line_start + 1, 1);
            this.$mol_fail(new this.$mol_error_syntax(`Unexpected EOF, LF required`, str.substring(line_start, str.length), sp));
          }
          stack.push(parent);
          pos++;
        }
        return root;
      }
      $4.$mol_tree2_from_string = $mol_tree2_from_string;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_tree2_to_string(tree) {
        let output = [];
        function dump(tree2, prefix = "") {
          if (tree2.type.length) {
            if (!prefix.length) {
              prefix = "	";
            }
            output.push(tree2.type);
            if (tree2.kids.length == 1) {
              output.push(" ");
              dump(tree2.kids[0], prefix);
              return;
            }
            output.push("\n");
          } else if (tree2.value.length || prefix.length) {
            output.push("\\" + tree2.value + "\n");
          }
          for (const kid of tree2.kids) {
            output.push(prefix);
            dump(kid, prefix + "	");
          }
        }
        dump(tree);
        return output.join("");
      }
      $4.$mol_tree2_to_string = $mol_tree2_to_string;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      class $mol_tree22 extends Object {
        type;
        value;
        kids;
        span;
        constructor(type, value, kids, span) {
          super();
          this.type = type;
          this.value = value;
          this.kids = kids;
          this.span = span;
          this[Symbol.toStringTag] = type || "\\" + value;
        }
        static list(kids, span = $mol_span.unknown) {
          return new $mol_tree22("", "", kids, span);
        }
        list(kids) {
          return $mol_tree22.list(kids, this.span);
        }
        static data(value, kids = [], span = $mol_span.unknown) {
          const chunks = value.split("\n");
          if (chunks.length > 1) {
            let kid_span = span.span(span.row, span.col, 0);
            const data = chunks.map((chunk) => {
              kid_span = kid_span.after(chunk.length);
              return new $mol_tree22("", chunk, [], kid_span);
            });
            kids = [...data, ...kids];
            value = "";
          }
          return new $mol_tree22("", value, kids, span);
        }
        data(value, kids = []) {
          return $mol_tree22.data(value, kids, this.span);
        }
        static struct(type, kids = [], span = $mol_span.unknown) {
          if (/[ \n\t\\]/.test(type)) {
            $$.$mol_fail(span.error(`Wrong type ${JSON.stringify(type)}`));
          }
          return new $mol_tree22(type, "", kids, span);
        }
        struct(type, kids = []) {
          return $mol_tree22.struct(type, kids, this.span);
        }
        clone(kids, span = this.span) {
          return new $mol_tree22(this.type, this.value, kids, span);
        }
        text() {
          var values = [];
          for (var kid of this.kids) {
            if (kid.type)
              continue;
            values.push(kid.value);
          }
          return this.value + values.join("\n");
        }
        static fromString(str, uri = "unknown") {
          return $$.$mol_tree2_from_string(str, uri);
        }
        toString() {
          return $$.$mol_tree2_to_string(this);
        }
        insert(value, ...path) {
          if (path.length === 0)
            return value;
          const type = path[0];
          if (typeof type === "string") {
            let replaced = false;
            const sub = this.kids.map((item, index) => {
              if (item.type !== type)
                return item;
              replaced = true;
              return item.insert(value, ...path.slice(1));
            }).filter(Boolean);
            if (!replaced && value) {
              sub.push(this.struct(type, []).insert(value, ...path.slice(1)));
            }
            return this.clone(sub);
          } else if (typeof type === "number") {
            const sub = this.kids.slice();
            sub[type] = (sub[type] || this.list([])).insert(value, ...path.slice(1));
            return this.clone(sub.filter(Boolean));
          } else {
            const kids = (this.kids.length === 0 ? [this.list([])] : this.kids).map((item) => item.insert(value, ...path.slice(1))).filter(Boolean);
            return this.clone(kids);
          }
        }
        select(...path) {
          let next = [this];
          for (const type of path) {
            if (!next.length)
              break;
            const prev = next;
            next = [];
            for (var item of prev) {
              switch (typeof type) {
                case "string":
                  for (var child of item.kids) {
                    if (child.type == type) {
                      next.push(child);
                    }
                  }
                  break;
                case "number":
                  if (type < item.kids.length)
                    next.push(item.kids[type]);
                  break;
                default:
                  next.push(...item.kids);
              }
            }
          }
          return this.list(next);
        }
        filter(path, value) {
          const sub = this.kids.filter((item) => {
            var found = item.select(...path);
            if (value === void 0) {
              return Boolean(found.kids.length);
            } else {
              return found.kids.some((child) => child.value == value);
            }
          });
          return this.clone(sub);
        }
        hack_self(belt, context = {}) {
          let handle = belt[this.type] || belt[""];
          if (!handle || handle === Object.prototype[this.type]) {
            handle = (input, belt2, context2) => [
              input.clone(input.hack(belt2, context2), context2.span)
            ];
          }
          try {
            return handle(this, belt, context);
          } catch (error) {
            error.message += `
${this.clone([])}${this.span}`;
            $mol_fail_hidden(error);
          }
        }
        hack(belt, context = {}) {
          return [].concat(...this.kids.map((child) => child.hack_self(belt, context)));
        }
        error(message, Class = Error) {
          return this.span.error(`${message}
${this.clone([])}`, Class);
        }
      }
      $4.$mol_tree2 = $mol_tree22;
      class $mol_tree2_empty extends $mol_tree22 {
        constructor() {
          super("", "", [], $mol_span.unknown);
        }
      }
      $4.$mol_tree2_empty = $mol_tree2_empty;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_tree2_from_json(json, span = $mol_span.unknown) {
        if (typeof json === "boolean" || typeof json === "number" || json === null) {
          return new $mol_tree2(String(json), "", [], span);
        }
        if (typeof json === "string") {
          return $mol_tree2.data(json, [], span);
        }
        if (Array.isArray(json)) {
          const sub2 = json.map((json2) => $mol_tree2_from_json(json2, span));
          return new $mol_tree2("/", "", sub2, span);
        }
        if (ArrayBuffer.isView(json)) {
          const buf = new Uint8Array(json.buffer, json.byteOffset, json.byteLength);
          return $mol_tree2.data(String.fromCharCode(...buf), [], span);
        }
        if (json instanceof Date) {
          return new $mol_tree2("", json.toISOString(), [], span);
        }
        if (typeof json.toJSON === "function") {
          return $mol_tree2_from_json(json.toJSON());
        }
        if (json.toString !== Object.prototype.toString) {
          return $mol_tree2.data(json.toString(), [], span);
        }
        if (json instanceof Error) {
          const { name, message, stack } = json;
          json = { ...json, name, message, stack };
        }
        const sub = [];
        for (var key in json) {
          const val = json[key];
          if (val === void 0)
            continue;
          const subsub = $mol_tree2_from_json(val, span);
          if (/^[^\n\t\\ ]+$/.test(key)) {
            sub.push(new $mol_tree2(key, "", [subsub], span));
          } else {
            sub.push($mol_tree2.data(key, [subsub], span));
          }
        }
        return new $mol_tree2("*", "", sub, span);
      }
      $4.$mol_tree2_from_json = $mol_tree2_from_json;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      class $mol_view_tree2_error extends Error {
        spans;
        constructor(message, spans) {
          super(message);
          this.spans = spans;
        }
        toJSON() {
          return {
            message: this.message,
            spans: this.spans
          };
        }
      }
      $4.$mol_view_tree2_error = $mol_view_tree2_error;
      class $mol_view_tree2_error_suggestions2 {
        suggestions;
        constructor(suggestions) {
          this.suggestions = suggestions;
        }
        toString() {
          return this.suggestions.map((suggestion) => `\`${suggestion}\``).join(", ");
        }
        toJSON() {
          return this.suggestions;
        }
      }
      $4.$mol_view_tree2_error_suggestions = $mol_view_tree2_error_suggestions2;
      function $mol_view_tree2_error_str2(strings, ...parts) {
        const spans = [];
        for (const part of parts) {
          if (part instanceof $mol_span)
            spans.push(part);
          if (Array.isArray(part) && part.length > 0 && part[0] instanceof $mol_span)
            spans.push(...part);
        }
        return new $mol_view_tree2_error(join(strings, parts), spans);
      }
      $4.$mol_view_tree2_error_str = $mol_view_tree2_error_str2;
      function join(strings, objects) {
        let result = "";
        let obj_pos = 0;
        let obj_len = objects.length;
        for (const str of strings) {
          result += str;
          if (obj_pos < obj_len) {
            const obj = objects[obj_pos++];
            if (Array.isArray(obj))
              result += obj.map((item) => `\`${item}\``).join(", ");
            else
              result += `\`${String(obj)}\``;
          }
        }
        return result;
      }
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_view_tree2_child(tree) {
        if (tree.kids.length === 0) {
          return this.$mol_fail($mol_view_tree2_error_str`Required one child at ${tree.span}`);
        }
        if (tree.kids.length > 1) {
          return this.$mol_fail($mol_view_tree2_error_str`Should be only one child at ${tree.span}`);
        }
        return tree.kids[0];
      }
      $4.$mol_view_tree2_child = $mol_view_tree2_child;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_view_tree2_classes2(defs) {
        return defs.clone(defs.hack({
          "-": () => []
        }));
      }
      $4.$mol_view_tree2_classes = $mol_view_tree2_classes2;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_view_tree2_normalize(defs) {
        return defs.clone($mol_view_tree2_classes(defs).kids.map((cl) => cl.clone([
          this.$mol_view_tree2_class_super(cl).clone(this.$mol_view_tree2_class_props(cl))
        ])));
      }
      $4.$mol_view_tree2_normalize = $mol_view_tree2_normalize;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      class $mol_regexp2 extends RegExp {
        groups;
        constructor(source, flags = "gsu", groups = []) {
          super(source, flags);
          this.groups = groups;
        }
        *[Symbol.matchAll](str) {
          const index = this.lastIndex;
          this.lastIndex = 0;
          try {
            while (this.lastIndex < str.length) {
              const found = this.exec(str);
              if (!found)
                break;
              yield found;
            }
          } finally {
            this.lastIndex = index;
          }
        }
        [Symbol.match](str) {
          const res = [...this[Symbol.matchAll](str)].filter((r) => r.groups).map((r) => r[0]);
          if (!res.length)
            return null;
          return res;
        }
        [Symbol.split](str) {
          const res = [];
          let token_last = null;
          for (let token of this[Symbol.matchAll](str)) {
            if (token.groups && (token_last ? token_last.groups : true))
              res.push("");
            res.push(token[0]);
            token_last = token;
          }
          if (!res.length)
            res.push("");
          return res;
        }
        test(str) {
          return Boolean(str.match(this));
        }
        exec(str) {
          const from = this.lastIndex;
          if (from >= str.length)
            return null;
          const res = super.exec(str);
          if (res === null) {
            this.lastIndex = str.length;
            if (!str)
              return null;
            return Object.assign([str.slice(from)], {
              index: from,
              input: str
            });
          }
          if (from === this.lastIndex) {
            $mol_fail(new Error("Captured empty substring"));
          }
          const groups = {};
          const skipped = str.slice(from, this.lastIndex - res[0].length);
          if (skipped) {
            this.lastIndex = this.lastIndex - res[0].length;
            return Object.assign([skipped], {
              index: from,
              input: res.input
            });
          }
          for (let i = 0; i < this.groups.length; ++i) {
            const group = this.groups[i];
            groups[group] = groups[group] || res[i + 1] || "";
          }
          return Object.assign(res, { groups });
        }
        generate(params) {
          return null;
        }
        get native() {
          return new RegExp(this.source, this.flags);
        }
        static repeat(source, min = 0, max = Number.POSITIVE_INFINITY) {
          const regexp = $mol_regexp2.from(source);
          const upper = Number.isFinite(max) ? max : "";
          const str = `(?:${regexp.source}){${min},${upper}}?`;
          const regexp2 = new $mol_regexp2(str, regexp.flags, regexp.groups);
          regexp2.generate = (params) => {
            const res = regexp.generate(params);
            if (res)
              return res;
            if (min > 0)
              return res;
            return "";
          };
          return regexp2;
        }
        static repeat_greedy(source, min = 0, max = Number.POSITIVE_INFINITY) {
          const regexp = $mol_regexp2.from(source);
          const upper = Number.isFinite(max) ? max : "";
          const str = `(?:${regexp.source}){${min},${upper}}`;
          const regexp2 = new $mol_regexp2(str, regexp.flags, regexp.groups);
          regexp2.generate = (params) => {
            const res = regexp.generate(params);
            if (res)
              return res;
            if (min > 0)
              return res;
            return "";
          };
          return regexp2;
        }
        static vary(sources) {
          const groups = [];
          const chunks = sources.map((source) => {
            const regexp = $mol_regexp2.from(source);
            groups.push(...regexp.groups);
            return regexp.source;
          });
          return new $mol_regexp2(`(?:${chunks.join("|")})`, "", groups);
        }
        static optional(source) {
          return $mol_regexp2.repeat_greedy(source, 0, 1);
        }
        static force_after(source) {
          const regexp = $mol_regexp2.from(source);
          return new $mol_regexp2(`(?=${regexp.source})`, regexp.flags, regexp.groups);
        }
        static forbid_after(source) {
          const regexp = $mol_regexp2.from(source);
          return new $mol_regexp2(`(?!${regexp.source})`, regexp.flags, regexp.groups);
        }
        static from(source, { ignoreCase, multiline } = {
          ignoreCase: false,
          multiline: false
        }) {
          let flags = "gsu";
          if (multiline)
            flags += "m";
          if (ignoreCase)
            flags += "i";
          if (typeof source === "number") {
            const src = `\\u{${source.toString(16)}}`;
            const regexp = new $mol_regexp2(src, flags);
            regexp.generate = () => src;
            return regexp;
          }
          if (typeof source === "string") {
            const src = source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const regexp = new $mol_regexp2(src, flags);
            regexp.generate = () => source;
            return regexp;
          } else if (source instanceof $mol_regexp2) {
            const regexp = new $mol_regexp2(source.source, flags, source.groups);
            regexp.generate = (params) => source.generate(params);
            return regexp;
          }
          if (source instanceof RegExp) {
            const test = new RegExp("|" + source.source);
            const groups = Array.from({ length: test.exec("").length - 1 }, (_, i) => String(i + 1));
            const regexp = new $mol_regexp2(source.source, source.flags, groups);
            regexp.generate = () => "";
            return regexp;
          }
          if (Array.isArray(source)) {
            const patterns = source.map((src) => Array.isArray(src) ? $mol_regexp2.optional(src) : $mol_regexp2.from(src));
            const chunks = patterns.map((pattern) => pattern.source);
            const groups = [];
            let index = 0;
            for (const pattern of patterns) {
              for (let group of pattern.groups) {
                if (Number(group) >= 0) {
                  groups.push(String(index++));
                } else {
                  groups.push(group);
                }
              }
            }
            const regexp = new $mol_regexp2(chunks.join(""), flags, groups);
            regexp.generate = (params) => {
              let res = "";
              for (const pattern of patterns) {
                let sub = pattern.generate(params);
                if (sub === null)
                  return "";
                res += sub;
              }
              return res;
            };
            return regexp;
          } else {
            const groups = [];
            const chunks = Object.keys(source).map((name) => {
              groups.push(name);
              const regexp2 = $mol_regexp2.from(source[name]);
              groups.push(...regexp2.groups);
              return `(${regexp2.source})`;
            });
            const regexp = new $mol_regexp2(`(?:${chunks.join("|")})`, flags, groups);
            const validator = new RegExp("^" + regexp.source + "$", flags);
            regexp.generate = (params) => {
              for (let option in source) {
                if (option in params) {
                  if (typeof params[option] === "boolean") {
                    if (!params[option])
                      continue;
                  } else {
                    const str = String(params[option]);
                    if (str.match(validator))
                      return str;
                    $mol_fail(new Error(`Wrong param: ${option}=${str}`));
                  }
                } else {
                  if (typeof source[option] !== "object")
                    continue;
                }
                const res = $mol_regexp2.from(source[option]).generate(params);
                if (res)
                  return res;
              }
              return null;
            };
            return regexp;
          }
        }
        static unicode_only(...category) {
          return new $mol_regexp2(`\\p{${category.join("=")}}`);
        }
        static unicode_except(...category) {
          return new $mol_regexp2(`\\P{${category.join("=")}}`);
        }
        static char_range(from, to) {
          return new $mol_regexp2(`${$mol_regexp2.from(from).source}-${$mol_regexp2.from(to).source}`);
        }
        static char_only(...allowed) {
          const regexp = allowed.map((f) => $mol_regexp2.from(f).source).join("");
          return new $mol_regexp2(`[${regexp}]`);
        }
        static char_except(...forbidden) {
          const regexp = forbidden.map((f) => $mol_regexp2.from(f).source).join("");
          return new $mol_regexp2(`[^${regexp}]`);
        }
        static decimal_only = $mol_regexp2.from(/\d/gsu);
        static decimal_except = $mol_regexp2.from(/\D/gsu);
        static latin_only = $mol_regexp2.from(/\w/gsu);
        static latin_except = $mol_regexp2.from(/\W/gsu);
        static space_only = $mol_regexp2.from(/\s/gsu);
        static space_except = $mol_regexp2.from(/\S/gsu);
        static word_break_only = $mol_regexp2.from(/\b/gsu);
        static word_break_except = $mol_regexp2.from(/\B/gsu);
        static tab = $mol_regexp2.from(/\t/gsu);
        static slash_back = $mol_regexp2.from(/\\/gsu);
        static nul = $mol_regexp2.from(/\0/gsu);
        static char_any = $mol_regexp2.from(/./gsu);
        static begin = $mol_regexp2.from(/^/gsu);
        static end = $mol_regexp2.from(/$/gsu);
        static or = $mol_regexp2.from(/|/gsu);
        static line_end = $mol_regexp2.from({
          win_end: [["\r"], "\n"],
          mac_end: "\r"
        });
      }
      $4.$mol_regexp = $mol_regexp2;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      const { begin: begin2, end: end2, latin_only: latin_only2, or: or2, optional: optional2, repeat_greedy: repeat_greedy2 } = $mol_regexp;
      $4.$mol_view_tree2_prop_signature = $mol_regexp.from([
        begin2,
        { name: repeat_greedy2(latin_only2, 1) },
        { key: optional2(["*", repeat_greedy2(latin_only2, 0)]) },
        { next: optional2(["?", repeat_greedy2(latin_only2, 0)]) },
        end2
      ]);
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_view_tree2_prop_parts2(prop) {
        const groups = [...prop.type.matchAll($mol_view_tree2_prop_signature)][0]?.groups;
        if (!groups) {
          this.$mol_fail($mol_view_tree2_error_str`Required prop like some*? at ${prop.span}`);
        }
        return {
          name: groups.name,
          key: groups.key,
          next: groups.next ? "?" : ""
        };
      }
      $4.$mol_view_tree2_prop_parts = $mol_view_tree2_prop_parts2;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      const regular_regex = /^\w+$/;
      function $mol_view_tree2_prop_quote(name) {
        if (regular_regex.test(name.value))
          return name;
        return name.data(JSON.stringify(name.value));
      }
      $4.$mol_view_tree2_prop_quote = $mol_view_tree2_prop_quote;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      const class_regex = /^[$A-Z][$\w<>\[\]()"'?|]+$/;
      function $mol_view_tree2_class_match2(klass) {
        if (!klass?.type)
          return false;
        if (klass.type === "NaN" || klass.type === "Infinity")
          return false;
        return class_regex.test(klass.type);
      }
      $4.$mol_view_tree2_class_match = $mol_view_tree2_class_match2;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      const err2 = $mol_view_tree2_error_str;
      function $mol_view_tree2_class_super(klass) {
        if (!$mol_view_tree2_class_match(klass))
          return this.$mol_fail(err2`Wrong class name at ${klass.span}`);
        const superclass = klass.kids.length === 1 ? klass.kids[0] : void 0;
        if (!superclass)
          return this.$mol_fail(err2`No super class at ${klass.span}`);
        if (!$mol_view_tree2_class_match(superclass))
          return this.$mol_fail(err2`Wrong super class name ${JSON.stringify(superclass.type).replace(/(^"|"$)/g, "")} at ${superclass.span}`);
        return superclass;
      }
      $4.$mol_view_tree2_class_super = $mol_view_tree2_class_super;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      const err2 = $mol_view_tree2_error_str;
      function $mol_view_tree2_class_props(klass) {
        let props = this.$mol_view_tree2_class_super(klass);
        props = props.clone(props.hack({
          "": (node, belt) => {
            const normal = node.type.replace(/!\w+/, "*");
            if (node.type === normal)
              return [node.clone(node.hack(belt))];
            return [node.struct(normal, node.hack(belt))];
          }
        }));
        const props_inner = {};
        const add_inner = (prop) => {
          const { name } = this.$mol_view_tree2_prop_parts(prop);
          const prev = props_inner[name];
          if (prev && prev.kids[0]?.toString() !== prop.kids[0]?.toString()) {
            this.$mol_fail(err2`Need an equal default values at ${prev.span} vs ${prop.span}`);
          }
          props_inner[name] = prop;
        };
        const upper = (operator, belt, context) => {
          const prop = this.$mol_view_tree2_child(operator);
          const defs = prop.hack(belt, { factory: prop });
          if (defs.length)
            add_inner(prop.clone(defs));
          return [operator.clone([prop.clone([])])];
        };
        const props_root = props.hack({
          "<=": upper,
          "<=>": upper,
          "^": (operator, belt, context) => {
            if (operator.kids.length === 0)
              return [operator];
            return upper(operator, belt, context);
          },
          "": (left, belt, context) => {
            let right;
            const operator = left.kids[0];
            if (operator?.type === "=>" && context.factory) {
              right = operator.kids[0];
              if (!right)
                this.$mol_fail(err2`Need a child ${operator.span}`);
              if (!context.factory)
                this.$mol_fail(err2`Need a parent ${left.span}`);
              add_inner(right.clone([
                right.struct("=", [
                  context.factory.clone([left.clone([])])
                ])
              ]));
            }
            if (right)
              context = { factory: right.clone([]) };
            else if (operator && !context.factory && $mol_view_tree2_class_match(operator)) {
              context = { factory: left.clone([]) };
            }
            const hacked = left.clone(left.hack(belt, context));
            return [hacked];
          }
        }, { factory: void 0 });
        for (const prop of props_root)
          add_inner(prop);
        return Object.values(props_inner);
      }
      $4.$mol_view_tree2_class_props = $mol_view_tree2_class_props;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      const err2 = $mol_view_tree2_error_str;
      function $mol_view_tree2_value_type(val) {
        switch (val.type) {
          case "true":
            return "bool";
          case "false":
            return "bool";
          case "null":
            return "null";
          case "*":
            return "dict";
          case "@":
            return "locale";
          case "":
            return "string";
          case "<=":
            return "get";
          case "<=>":
            return "bind";
          case "=>":
            return "put";
        }
        const first_char = val.type && val.type[0];
        if (first_char === "/")
          return "list";
        if (Number(val.type).toString() == val.type)
          return "number";
        if (/^[$A-Z]/.test(first_char))
          return "object";
        return this.$mol_fail(err2`Unknown value type ${val.type} at ${val.span}`);
      }
      $4.$mol_view_tree2_value_type = $mol_view_tree2_value_type;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      const err2 = $mol_view_tree2_error_str;
      function $mol_view_tree2_value(value) {
        const type = value.type;
        const kids = value.kids;
        if (type === "") {
          if (kids.length === 0)
            return value.data(JSON.stringify(value.value));
          return value.data(JSON.stringify(kids.map((node) => node.value).join("\n")));
        }
        if (kids.length !== 0)
          return this.$mol_fail(err2`Kids are not allowed at ${value.span}, use ${example}`);
        if (type === "false" || type === "true")
          return value.data(type);
        if (type === "null")
          return value.data(type);
        if (Number(type).toString() === type.replace(/^\+/, ""))
          return value.data(type);
        return this.$mol_fail(err2`Value ${value.toString()} not allowed at ${value.span}, use ${example}`);
      }
      $4.$mol_view_tree2_value = $mol_view_tree2_value;
      const example = new $mol_view_tree2_error_suggestions([
        "false",
        "true",
        "123",
        "null",
        "\\some"
      ]);
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_view_tree2_value_number2(type) {
        return type.match(/[\+\-]*NaN/) || !Number.isNaN(Number(type));
      }
      $4.$mol_view_tree2_value_number = $mol_view_tree2_value_number2;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_tree2_js_to_text2(js) {
        function sequence(open, separator, close) {
          return (input, belt) => [
            input.struct("line", [
              ...open ? [input.data(open)] : [],
              input.struct(separator && input.kids.length > 2 ? "indent" : "line", [].concat(...input.kids.map((kid, index) => [
                kid.struct("line", [
                  ...kid.list([kid]).hack(belt),
                  ...separator && index < input.kids.length - 1 ? [input.data(separator)] : []
                ])
              ]))),
              ...close ? [input.data(close)] : []
            ])
          ];
        }
        function block(open, separator, close) {
          return (input, belt) => [
            ...open ? [input.data(open)] : [],
            ...input.kids.length === 0 ? [] : [input.struct("indent", input.kids.map((kid, index) => kid.struct("line", [
              ...kid.list([kid]).hack(belt),
              ...separator ? [input.data(separator)] : []
            ])))],
            ...close ? [input.data(close)] : []
          ];
        }
        function duplet(open, separator, close) {
          return (input, belt) => [
            input.struct("line", [
              ...open ? [input.data(open)] : [],
              ...input.list(input.kids.slice(0, 1)).hack(belt),
              ...separator && input.kids.length > 1 ? [input.data(separator)] : [],
              ...input.list(input.kids.slice(1, 2)).hack(belt),
              ...close ? [input.data(close)] : []
            ])
          ];
        }
        function triplet(open, separator12, separator23, close) {
          return (input, belt) => [
            input.struct("line", [
              ...open ? [input.data(open)] : [],
              ...input.list(input.kids.slice(0, 1)).hack(belt),
              ...separator12 && input.kids.length > 1 ? [input.data(separator12)] : [],
              ...input.list(input.kids.slice(1, 2)).hack(belt),
              ...separator23 && input.kids.length > 2 ? [input.data(separator23)] : [],
              ...input.list(input.kids.slice(2, 3)).hack(belt),
              ...close ? [input.data(close)] : []
            ])
          ];
        }
        return js.list(js.hack({
          "+": sequence("+"),
          "-": sequence("-"),
          "!": sequence("!"),
          "~": sequence("~"),
          "return": sequence("return "),
          "break": sequence("break "),
          "continue": sequence("continue "),
          "yield": sequence("yield "),
          "yield*": sequence("yield* "),
          "await": sequence("await "),
          "void": sequence("void "),
          "delete": sequence("delete "),
          "typeof": sequence("typeof "),
          "new": sequence("new "),
          "...": sequence("..."),
          "@++": sequence("", "", "++"),
          "@--": sequence("", "", "--"),
          "(in)": sequence("(", " in ", ")"),
          "(instanceof)": sequence("(", " instanceof ", ")"),
          "(+)": sequence("(", " + ", ")"),
          "(-)": sequence("(", " - ", ")"),
          "(*)": sequence("(", " * ", ")"),
          "(/)": sequence("(", " / ", ")"),
          "(%)": sequence("(", " % ", ")"),
          "(**)": sequence("(", " ** ", ")"),
          "(<)": sequence("(", " < ", ")"),
          "(<=)": sequence("(", " <= ", ")"),
          "(>)": sequence("(", " > ", ")"),
          "(>=)": sequence("(", " >= ", ")"),
          "(==)": sequence("(", " == ", ")"),
          "(!=)": sequence("(", " != ", ")"),
          "(===)": sequence("(", " === ", ")"),
          "(!==)": sequence("(", " !== ", ")"),
          "(<<)": sequence("(", " << ", ")"),
          "(>>)": sequence("(", " >> ", ")"),
          "(>>>)": sequence("(", " >>> ", ")"),
          "(&)": sequence("(", " & ", ")"),
          "(|)": sequence("(", " | ", ")"),
          "(^)": sequence("(", " ^ ", ")"),
          "(&&)": sequence("(", " && ", ")"),
          "(||)": sequence("(", " || ", ")"),
          "(,)": sequence("(", ", ", ")"),
          "{;}": block("{", ";", "}"),
          ";": block("", ";", ""),
          "[,]": sequence("[", ", ", "]"),
          "{,}": sequence("{", ", ", "}"),
          "()": sequence("(", "", ")"),
          "{}": block("{", "", "}"),
          "[]": (input, belt) => {
            const first = input.kids[0];
            if (first.type)
              return sequence("[", "", "]")(input, belt);
            else
              return [input.data("." + first.text())];
          },
          ":": (input, belt) => {
            const first = input.kids[0];
            if (first.type)
              return duplet("[", "]: ")(input, belt);
            else
              return duplet("", ": ")(input, belt);
          },
          "let": duplet("let ", " = "),
          "const": duplet("const ", " = "),
          "var": duplet("var ", " = "),
          "=": duplet("", " = "),
          "+=": duplet("", " += "),
          "-=": duplet("", " -= "),
          "*=": duplet("", " *= "),
          "/=": duplet("", " /= "),
          "%=": duplet("", " %= "),
          "**=": duplet("", " **= "),
          "<<=": duplet("", " <<= "),
          ">>=": duplet("", " >>= "),
          ">>>=": duplet("", " >>>= "),
          "&=": duplet("", " &= "),
          "|=": duplet("", " |= "),
          "^=": duplet("", " ^= "),
          "&&=": duplet("", " &&= "),
          "||=": duplet("", " ||= "),
          "=>": duplet("", " => "),
          "async=>": duplet("async ", " => "),
          "function": triplet("function "),
          "function*": triplet("function* "),
          "async": triplet("async function "),
          "async*": triplet("async function* "),
          "class": triplet("class ", " "),
          "extends": sequence("extends ", "", " "),
          "if": triplet("if", " ", "else"),
          "?:": triplet("", " ? ", " : "),
          ".": (input, belt) => {
            const first = input.kids[0];
            if (first.type)
              return triplet("[", "]")(input, belt);
            else
              return [
                input.data(first.text()),
                ...input.list(input.kids.slice(1)).hack(belt)
              ];
          },
          "get": triplet("get [", "]"),
          "set": triplet("set [", "]"),
          "static": triplet("static [", "]"),
          "/./": sequence(),
          ".global": sequence("g"),
          ".multiline": sequence("m"),
          ".ignoreCase": sequence("i"),
          ".source": (input, belt) => [
            input.data("/"),
            input.data(JSON.stringify(input.text()).slice(1, -1)),
            input.data("/")
          ],
          "``": (input, belt) => {
            return [
              input.struct("line", [
                input.data("`"),
                ...[].concat(...input.kids.map((kid) => {
                  if (kid.type) {
                    return [
                      kid.data("${"),
                      ...kid.list([kid]).hack(belt),
                      kid.data("}")
                    ];
                  } else {
                    return [
                      input.data(JSON.stringify(kid.text()).slice(1, -1))
                    ];
                  }
                })),
                input.data("`")
              ])
            ];
          },
          "": (input, belt) => {
            if (!input.type)
              return [
                input.data(JSON.stringify(input.text()))
              ];
            if (/^[\w$#][\w0-9$]*$/i.test(input.type))
              return [
                input.data(input.type)
              ];
            if ($mol_view_tree2_value_number(input.type))
              return [
                input.data(input.type)
              ];
            $mol_fail(new SyntaxError(`Wrong node type`));
          }
        }));
      }
      $4.$mol_tree2_js_to_text = $mol_tree2_js_to_text2;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_tree2_span_imprint(tree) {
        const sources = /* @__PURE__ */ new Map();
        const res = tree.clone(tree.hack({
          "": (input, belt) => {
            if (!sources.has(input.span.uri)) {
              sources.set(input.span.uri, tree.struct(input.span.uri, [
                tree.data(input.span.source)
              ]));
            }
            return [
              input.clone([
                input.data(input.span.toString()),
                ...input.hack(belt)
              ])
            ];
          }
        }));
        return tree.clone([
          ...sources.values(),
          res
        ]);
      }
      $4.$mol_tree2_span_imprint = $mol_tree2_span_imprint;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_tree2_span_reuse(tree) {
        const sources = /* @__PURE__ */ new Map();
        return tree.clone(tree.hack({
          "": (input, belt) => {
            if (input.type) {
              sources.set(input.type, input.kids[0].text());
              return [];
            }
            return input.hack({
              "": (input2, belt2) => {
                const kids = input2.list(input2.kids.slice(1)).hack(belt2);
                const [_, uri, row, col, length] = /^(.*)#(\d+):(\d+)\/(\d+)$/.exec(input2.kids[0].text());
                const span = new $mol_span(uri, sources.get(uri), Number(row), Number(col), Number(length));
                return [
                  new $mol_tree2(input2.type, input2.value, kids, span)
                ];
              }
            });
          }
        }));
      }
      $4.$mol_tree2_span_reuse = $mol_tree2_span_reuse;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_tree2_text_to_string(text) {
        let res = "";
        function visit(text2, prefix, inline) {
          if (text2.type === "indent") {
            if (inline)
              res += "\n";
            for (let kid of text2.kids) {
              visit(kid, prefix + "	", false);
            }
            if (inline)
              res += prefix;
          } else if (text2.type === "line") {
            if (!inline)
              res += prefix;
            for (let kid of text2.kids) {
              visit(kid, prefix, true);
            }
            if (!inline)
              res += "\n";
          } else {
            if (!inline)
              res += prefix;
            res += text2.text();
            if (!inline)
              res += "\n";
          }
        }
        for (let kid of text.kids) {
          visit(kid, "", false);
        }
        return res;
      }
      $4.$mol_tree2_text_to_string = $mol_tree2_text_to_string;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      function $mol_vlq_encode2(val) {
        const sign = val < 0 ? 1 : 0;
        if (sign)
          val = -val;
        let index = sign | (val & 15) << 1;
        val >>>= 4;
        let res = "";
        while (val) {
          index |= 1 << 5;
          res += alphabet[index];
          if (!val)
            break;
          index = val & 31;
          val >>>= 5;
        }
        res += alphabet[index];
        return res;
      }
      $4.$mol_vlq_encode = $mol_vlq_encode2;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_tree2_text_to_sourcemap(tree) {
        let col = 1;
        let prev_span;
        let prev_index = 0;
        let prev_col = 1;
        let mappings = "";
        let line = [];
        const file_indexes = /* @__PURE__ */ new Map();
        const file_sources = /* @__PURE__ */ new Map();
        function span2index(span) {
          if (file_indexes.has(span.uri))
            return file_indexes.get(span.uri);
          const index = file_indexes.size;
          file_indexes.set(span.uri, index);
          file_sources.set(span.uri, span.source);
          return index;
        }
        function next_line() {
          if (!line.length)
            return;
          mappings += line.join(",") + ";";
          line = [];
          col = 1;
          prev_col = 1;
        }
        function visit(text, prefix, inline) {
          function indent() {
            col += prefix;
          }
          if (inline && text.type === "indent")
            next_line();
          if (prev_span !== text.span || col === 1) {
            const index = span2index(text.span);
            line.push($mol_vlq_encode(col - prev_col) + $mol_vlq_encode(index - prev_index) + $mol_vlq_encode(text.span.row - (prev_span?.row ?? 1)) + $mol_vlq_encode(text.span.col - (prev_span?.col ?? 1)));
            prev_col = col;
            prev_span = text.span;
            prev_index = index;
          }
          if (text.type === "indent") {
            for (let kid of text.kids) {
              visit(kid, prefix + 1, false);
            }
            if (inline)
              next_line();
          } else if (text.type === "line") {
            if (!inline)
              indent();
            for (let kid of text.kids) {
              visit(kid, prefix, true);
            }
            if (!inline)
              next_line();
          } else {
            if (!inline)
              indent();
            col += text.text().length;
            if (!inline)
              next_line();
          }
        }
        for (let kid of tree.kids) {
          visit(kid, 0, false);
        }
        next_line();
        const map = {
          version: 3,
          sources: [...file_sources.keys()],
          sourcesContent: [...file_sources.values()],
          mappings
        };
        return map;
      }
      $4.$mol_tree2_text_to_sourcemap = $mol_tree2_text_to_sourcemap;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_sourcemap_url(uri, type = "js") {
        if (type === "css")
          return `
/*# sourceMappingURL=${uri}*/`;
        return `
//# sourceMappingURL=${uri}`;
      }
      $4.$mol_sourcemap_url = $mol_sourcemap_url;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      const prefix = "# sourceMappingURL=data:application/json,";
      const end_comment = " */";
      function $mol_sourcemap_dataurl_decode(data) {
        const index = data.lastIndexOf(prefix);
        if (index === -1)
          return void 0;
        data = data.substring(index + prefix.length);
        if (data.endsWith(end_comment))
          data = data.substring(0, data.length - end_comment.length);
        const decoded = this.decodeURIComponent(data);
        try {
          const map = JSON.parse(decoded);
          if (!map)
            return void 0;
          if (typeof map.mappings === "string" && map.mappings.startsWith(";;")) {
            map.mappings = map.mappings.substring(2);
          }
          return map;
        } catch (e) {
          if (e instanceof Error)
            e.message += ", origin=" + decoded;
          $mol_fail_hidden(e);
        }
      }
      $4.$mol_sourcemap_dataurl_decode = $mol_sourcemap_dataurl_decode;
      function $mol_sourcemap_dataurl_encode(map, type = "js") {
        const str = JSON.stringify({ ...map, mappings: ";;" + map.mappings });
        return this.$mol_sourcemap_url("data:application/json," + this.encodeURIComponent(str), type);
      }
      $4.$mol_sourcemap_dataurl_encode = $mol_sourcemap_dataurl_encode;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_tree2_text_to_string_mapped(text, type) {
        const code = this.$mol_tree2_text_to_string(text);
        const map = this.$mol_tree2_text_to_sourcemap(text);
        const chunk = this.$mol_sourcemap_dataurl_encode(map, type);
        return code + chunk;
      }
      $4.$mol_tree2_text_to_string_mapped = $mol_tree2_text_to_string_mapped;
      function $mol_tree2_text_to_string_mapped_js(text) {
        return this.$mol_tree2_text_to_string_mapped(text, "js");
      }
      $4.$mol_tree2_text_to_string_mapped_js = $mol_tree2_text_to_string_mapped_js;
      function $mol_tree2_text_to_string_mapped_css(text) {
        return this.$mol_tree2_text_to_string_mapped(text, "css");
      }
      $4.$mol_tree2_text_to_string_mapped_css = $mol_tree2_text_to_string_mapped_css;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_guard_defined2(value) {
        return value !== null && value !== void 0;
      }
      $4.$mol_guard_defined = $mol_guard_defined2;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_tree2_text_to_sourcemap_vis(text) {
        const code = this.$mol_tree2_text_to_string(text);
        const map = this.$mol_tree2_text_to_sourcemap(text);
        const uri = [
          "https://sokra.github.io/source-map-visualization/#base64",
          btoa(code),
          btoa(JSON.stringify(map)),
          ...map.sourcesContent?.filter($mol_guard_defined).map(btoa) ?? []
        ].join(",");
        return uri;
      }
      $4.$mol_tree2_text_to_sourcemap_vis = $mol_tree2_text_to_sourcemap_vis;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_tree2_to_json(tree) {
        if (!tree.type) {
          if (tree.kids.every((kid) => !kid.type))
            return tree.text();
          if (tree.kids.length !== 1)
            this.$mol_fail(new Error(`Multiple json root at ${tree.span}`));
          return this.$mol_tree2_to_json(tree.kids[0]);
        }
        if (tree.type === "-")
          return void 0;
        if (tree.type === "true")
          return true;
        if (tree.type === "false")
          return false;
        if (tree.type === "null")
          return null;
        if (tree.type === "*") {
          const obj = {};
          for (const kid of tree.kids) {
            if (kid.type === "-")
              continue;
            const key = kid.type || kid.clone(kid.kids.slice(0, -1)).text();
            const val2 = this.$mol_tree2_to_json(kid.kids[kid.kids.length - 1]);
            if (val2 !== void 0)
              obj[key] = val2;
          }
          return obj;
        }
        if (tree.type === "/") {
          const res = [];
          for (const kid of tree.kids) {
            if (kid.type === "-")
              continue;
            var val = this.$mol_tree2_to_json(kid);
            if (val !== void 0)
              res.push(val);
          }
          return res;
        }
        const numb = Number(tree.type);
        if (!Number.isNaN(numb) || tree.type === "NaN")
          return numb;
        this.$mol_fail(new Error(`Unknown json type (${tree.type}) at ${tree.span}`));
      }
      $4.$mol_tree2_to_json = $mol_tree2_to_json;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      async function $mol_tree2_to_stream(tree, output, prefix = "") {
        const pause = () => {
          return new Promise((done) => {
            output.once("drain", () => done(null));
          });
        };
        let out = "";
        if (tree.type.length) {
          if (!prefix.length) {
            prefix = "	";
          }
          out += tree.type;
          if (tree.kids.length == 1) {
            output.write(out + " ");
            await $mol_tree2_to_stream(tree.kids[0], output, prefix);
            return;
          }
          out += "\n";
        } else if (tree.value.length || prefix.length) {
          out += "\\" + tree.value + "\n";
        }
        output.write(out);
        for (const kid of tree.kids) {
          if (!output.write(prefix))
            await pause();
          await $mol_tree2_to_stream(kid, output, prefix + "	");
        }
      }
      $4.$mol_tree2_to_stream = $mol_tree2_to_stream;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function $mol_tree2_xml_from_dom(dom) {
        switch (dom.nodeType) {
          case dom.DOCUMENT_NODE: {
            let kids = [];
            for (const kid of dom.childNodes) {
              kids.push($mol_tree2_xml_from_dom(kid));
            }
            return $mol_tree2.list(kids);
          }
          case dom.PROCESSING_INSTRUCTION_NODE: {
            return $mol_tree2.struct("?", [
              $mol_tree2.struct(dom.nodeName, dom.nodeValue.split(" ").map((chunk) => {
                const [, name, value] = /^(.*?)(?:="(.*?)")?$/.exec(chunk);
                const kids = value ? [$mol_tree2.data(value)] : [];
                return $mol_tree2.struct(name, kids);
              }))
            ]);
          }
          case dom.DOCUMENT_TYPE_NODE: {
            const dom2 = dom;
            return $mol_tree2.struct("!", [
              $mol_tree2.struct("DOCTYPE", [
                $mol_tree2.struct(dom2.name)
              ])
            ]);
          }
          case dom.ELEMENT_NODE: {
            let kids = [];
            for (const attr of dom.attributes) {
              kids.push($mol_tree2.struct("@", [
                $mol_tree2.struct(attr.nodeName, [
                  $mol_tree2.data(attr.nodeValue)
                ])
              ]));
            }
            for (const kid of dom.childNodes) {
              const k = $mol_tree2_xml_from_dom(kid);
              if (k.type || k.value)
                kids.push(k);
            }
            return $mol_tree2.struct(dom.nodeName, kids);
          }
          case dom.COMMENT_NODE: {
            return $mol_tree2.struct("--", [
              $mol_tree2.data(dom.nodeValue)
            ]);
          }
          case dom.TEXT_NODE: {
            if (!dom.nodeValue.trim())
              return $mol_tree2.list([]);
            return $mol_tree2.data(dom.nodeValue.replace(/\s+/g, " "));
          }
        }
        return $mol_fail(new Error(`Unsupported node ${dom.nodeName}`));
      }
      $4.$mol_tree2_xml_from_dom = $mol_tree2_xml_from_dom;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      const mapping = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "&": "&amp;"
      };
      function $mol_html_encode2(text) {
        return text.replace(/[&<">]/gi, (str) => mapping[str]);
      }
      $4.$mol_html_encode = $mol_html_encode2;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      function attrs_belt(separator) {
        return {
          "": (input) => [
            input.data(" "),
            input.data($mol_html_encode(input.type)),
            ...input.value ? [
              input.data('"'),
              input.data($mol_html_encode(input.value)),
              input.data('"')
            ] : [],
            ...input.hack({
              "": (input2) => {
                if (!input2.type)
                  return [
                    input2.data(separator),
                    input2.data('"'),
                    input2.data($mol_html_encode(input2.text())),
                    input2.data('"')
                  ];
                $mol_fail(new SyntaxError("Wrong attribute value"));
              }
            })
          ]
        };
      }
      function $mol_tree2_xml_to_text(xml) {
        return xml.list(xml.hack({
          "@": (input, belt) => [],
          "--": (input, belt) => [
            xml.struct("line", [
              input.data("<!-- "),
              ...input.hack(belt),
              input.data(" -->")
            ])
          ],
          "?": (input, belt) => [
            xml.struct("line", [
              input.data("<?"),
              input.kids[0].data(input.kids[0].type),
              ...input.kids[0].hack(attrs_belt("=")),
              input.data("?>")
            ])
          ],
          "!": (input, belt) => [
            xml.struct("line", [
              input.data("<!"),
              input.kids[0].data(input.kids[0].type),
              ...input.kids[0].hack(attrs_belt(" ")),
              input.data(">")
            ])
          ],
          "": (input, belt) => {
            if (!input.type)
              return [
                input.data($mol_html_encode(input.text()))
              ];
            const attrs = input.select("@", null).hack(attrs_belt("="));
            const content = input.hack(belt);
            return [
              input.struct("line", [
                input.data(`<`),
                input.data(input.type),
                ...attrs,
                ...content.length ? [
                  input.data(`>`),
                  input.struct("indent", content),
                  input.data(`</`),
                  input.data(input.type),
                  input.data(`>`)
                ] : [
                  input.data(` />`)
                ]
              ])
            ];
          }
        }));
      }
      $4.$mol_tree2_xml_to_text = $mol_tree2_xml_to_text;
    })($3 || ($3 = {}));
  }
});

// node_modules/mol_regexp/web.js
var require_web2 = __commonJS({
  "node_modules/mol_regexp/web.js"(exports, module) {
    "use strict";
    var $node = $node || {};
    void function(module2) {
      var exports2 = module2.exports = this;
      function require3(id) {
        return $node[id.replace(/^.\//, "../")];
      }
      ;
      ;
      "use strict";
      Error.stackTraceLimit = 50;
      var $4;
      /* @__PURE__ */ (function($5) {
      })($4 || ($4 = {}));
      module2.exports = $4;
      ;
      $node["../mam.ts"] = $node["../mam.ts"] = module2.exports;
    }.call({}, {});
    var __decorate = exports && exports.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if (d = decorators[i])
            r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var $3 = typeof module === "object" ? module["exports"] = globalThis : globalThis;
    $3.$$ = $3;
    var $3;
    (function($4) {
      function $mol_fail2(error) {
        throw error;
      }
      $4.$mol_fail = $mol_fail2;
    })($3 || ($3 = {}));
    var $3;
    (function($4) {
      class $mol_regexp2 extends RegExp {
        groups;
        constructor(source, flags = "gsu", groups = []) {
          super(source, flags);
          this.groups = groups;
        }
        *[Symbol.matchAll](str) {
          const index = this.lastIndex;
          this.lastIndex = 0;
          try {
            while (this.lastIndex < str.length) {
              const found = this.exec(str);
              if (!found)
                break;
              yield found;
            }
          } finally {
            this.lastIndex = index;
          }
        }
        [Symbol.match](str) {
          const res = [...this[Symbol.matchAll](str)].filter((r) => r.groups).map((r) => r[0]);
          if (!res.length)
            return null;
          return res;
        }
        [Symbol.split](str) {
          const res = [];
          let token_last = null;
          for (let token of this[Symbol.matchAll](str)) {
            if (token.groups && (token_last ? token_last.groups : true))
              res.push("");
            res.push(token[0]);
            token_last = token;
          }
          if (!res.length)
            res.push("");
          return res;
        }
        test(str) {
          return Boolean(str.match(this));
        }
        exec(str) {
          const from = this.lastIndex;
          if (from >= str.length)
            return null;
          const res = super.exec(str);
          if (res === null) {
            this.lastIndex = str.length;
            if (!str)
              return null;
            return Object.assign([str.slice(from)], {
              index: from,
              input: str
            });
          }
          if (from === this.lastIndex) {
            $mol_fail(new Error("Captured empty substring"));
          }
          const groups = {};
          const skipped = str.slice(from, this.lastIndex - res[0].length);
          if (skipped) {
            this.lastIndex = this.lastIndex - res[0].length;
            return Object.assign([skipped], {
              index: from,
              input: res.input
            });
          }
          for (let i = 0; i < this.groups.length; ++i) {
            const group = this.groups[i];
            groups[group] = groups[group] || res[i + 1] || "";
          }
          return Object.assign(res, { groups });
        }
        generate(params) {
          return null;
        }
        get native() {
          return new RegExp(this.source, this.flags);
        }
        static repeat(source, min = 0, max = Number.POSITIVE_INFINITY) {
          const regexp = $mol_regexp2.from(source);
          const upper = Number.isFinite(max) ? max : "";
          const str = `(?:${regexp.source}){${min},${upper}}?`;
          const regexp2 = new $mol_regexp2(str, regexp.flags, regexp.groups);
          regexp2.generate = (params) => {
            const res = regexp.generate(params);
            if (res)
              return res;
            if (min > 0)
              return res;
            return "";
          };
          return regexp2;
        }
        static repeat_greedy(source, min = 0, max = Number.POSITIVE_INFINITY) {
          const regexp = $mol_regexp2.from(source);
          const upper = Number.isFinite(max) ? max : "";
          const str = `(?:${regexp.source}){${min},${upper}}`;
          const regexp2 = new $mol_regexp2(str, regexp.flags, regexp.groups);
          regexp2.generate = (params) => {
            const res = regexp.generate(params);
            if (res)
              return res;
            if (min > 0)
              return res;
            return "";
          };
          return regexp2;
        }
        static vary(sources) {
          const groups = [];
          const chunks = sources.map((source) => {
            const regexp = $mol_regexp2.from(source);
            groups.push(...regexp.groups);
            return regexp.source;
          });
          return new $mol_regexp2(`(?:${chunks.join("|")})`, "", groups);
        }
        static optional(source) {
          return $mol_regexp2.repeat_greedy(source, 0, 1);
        }
        static force_after(source) {
          const regexp = $mol_regexp2.from(source);
          return new $mol_regexp2(`(?=${regexp.source})`, regexp.flags, regexp.groups);
        }
        static forbid_after(source) {
          const regexp = $mol_regexp2.from(source);
          return new $mol_regexp2(`(?!${regexp.source})`, regexp.flags, regexp.groups);
        }
        static from(source, { ignoreCase, multiline } = {
          ignoreCase: false,
          multiline: false
        }) {
          let flags = "gsu";
          if (multiline)
            flags += "m";
          if (ignoreCase)
            flags += "i";
          if (typeof source === "number") {
            const src = `\\u{${source.toString(16)}}`;
            const regexp = new $mol_regexp2(src, flags);
            regexp.generate = () => src;
            return regexp;
          }
          if (typeof source === "string") {
            const src = source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const regexp = new $mol_regexp2(src, flags);
            regexp.generate = () => source;
            return regexp;
          } else if (source instanceof $mol_regexp2) {
            const regexp = new $mol_regexp2(source.source, flags, source.groups);
            regexp.generate = (params) => source.generate(params);
            return regexp;
          }
          if (source instanceof RegExp) {
            const test = new RegExp("|" + source.source);
            const groups = Array.from({ length: test.exec("").length - 1 }, (_, i) => String(i + 1));
            const regexp = new $mol_regexp2(source.source, source.flags, groups);
            regexp.generate = () => "";
            return regexp;
          }
          if (Array.isArray(source)) {
            const patterns = source.map((src) => Array.isArray(src) ? $mol_regexp2.optional(src) : $mol_regexp2.from(src));
            const chunks = patterns.map((pattern) => pattern.source);
            const groups = [];
            let index = 0;
            for (const pattern of patterns) {
              for (let group of pattern.groups) {
                if (Number(group) >= 0) {
                  groups.push(String(index++));
                } else {
                  groups.push(group);
                }
              }
            }
            const regexp = new $mol_regexp2(chunks.join(""), flags, groups);
            regexp.generate = (params) => {
              let res = "";
              for (const pattern of patterns) {
                let sub = pattern.generate(params);
                if (sub === null)
                  return "";
                res += sub;
              }
              return res;
            };
            return regexp;
          } else {
            const groups = [];
            const chunks = Object.keys(source).map((name) => {
              groups.push(name);
              const regexp2 = $mol_regexp2.from(source[name]);
              groups.push(...regexp2.groups);
              return `(${regexp2.source})`;
            });
            const regexp = new $mol_regexp2(`(?:${chunks.join("|")})`, flags, groups);
            const validator = new RegExp("^" + regexp.source + "$", flags);
            regexp.generate = (params) => {
              for (let option in source) {
                if (option in params) {
                  if (typeof params[option] === "boolean") {
                    if (!params[option])
                      continue;
                  } else {
                    const str = String(params[option]);
                    if (str.match(validator))
                      return str;
                    $mol_fail(new Error(`Wrong param: ${option}=${str}`));
                  }
                } else {
                  if (typeof source[option] !== "object")
                    continue;
                }
                const res = $mol_regexp2.from(source[option]).generate(params);
                if (res)
                  return res;
              }
              return null;
            };
            return regexp;
          }
        }
        static unicode_only(...category) {
          return new $mol_regexp2(`\\p{${category.join("=")}}`);
        }
        static unicode_except(...category) {
          return new $mol_regexp2(`\\P{${category.join("=")}}`);
        }
        static char_range(from, to) {
          return new $mol_regexp2(`${$mol_regexp2.from(from).source}-${$mol_regexp2.from(to).source}`);
        }
        static char_only(...allowed) {
          const regexp = allowed.map((f) => $mol_regexp2.from(f).source).join("");
          return new $mol_regexp2(`[${regexp}]`);
        }
        static char_except(...forbidden) {
          const regexp = forbidden.map((f) => $mol_regexp2.from(f).source).join("");
          return new $mol_regexp2(`[^${regexp}]`);
        }
        static decimal_only = $mol_regexp2.from(/\d/gsu);
        static decimal_except = $mol_regexp2.from(/\D/gsu);
        static latin_only = $mol_regexp2.from(/\w/gsu);
        static latin_except = $mol_regexp2.from(/\W/gsu);
        static space_only = $mol_regexp2.from(/\s/gsu);
        static space_except = $mol_regexp2.from(/\S/gsu);
        static word_break_only = $mol_regexp2.from(/\b/gsu);
        static word_break_except = $mol_regexp2.from(/\B/gsu);
        static tab = $mol_regexp2.from(/\t/gsu);
        static slash_back = $mol_regexp2.from(/\\/gsu);
        static nul = $mol_regexp2.from(/\0/gsu);
        static char_any = $mol_regexp2.from(/./gsu);
        static begin = $mol_regexp2.from(/^/gsu);
        static end = $mol_regexp2.from(/$/gsu);
        static or = $mol_regexp2.from(/|/gsu);
        static line_end = $mol_regexp2.from({
          win_end: [["\r"], "\n"],
          mac_end: "\r"
        });
      }
      $4.$mol_regexp = $mol_regexp2;
    })($3 || ($3 = {}));
  }
});

// vite-plugin-mam/tree2js.ts
var import_mol_tree2 = __toESM(require_web(), 1);
var import_mol_regexp = __toESM(require_web2(), 1);
var { begin, end, latin_only, or, optional, repeat_greedy } = import_mol_regexp.default.$mol_regexp;
var $mol_view_tree2_prop_signature2 = import_mol_regexp.default.$mol_regexp.from([
  begin,
  { name: repeat_greedy(latin_only, 1) },
  { key: optional(["*", repeat_greedy(latin_only, 0)]) },
  { next: optional(["?", repeat_greedy(latin_only, 0)]) },
  end
]);
function $mol_view_tree2_prop_parts(prop) {
  const groups = [...prop.type.matchAll($mol_view_tree2_prop_signature2)][0]?.groups;
  if (!groups) {
    import_mol_tree2.default.$mol_fail(
      import_mol_tree2.default.$mol_view_tree2_error_str`Required prop like some*? at ${prop.span}`
    );
  }
  return {
    name: groups.name,
    key: groups.key,
    next: groups.next ? "?" : ""
  };
}
var err = import_mol_tree2.default.$mol_view_tree2_error_str;
function name_of(prop) {
  return $mol_view_tree2_prop_parts(prop).name;
}
function params_of(prop, bidi = true) {
  const { key, next } = $mol_view_tree2_prop_parts(prop);
  return prop.struct("(,)", [
    ...key ? [prop.struct("id")] : [],
    ...bidi && next ? [prop.struct("next")] : []
  ]);
}
function args_of(prop, bidi = true) {
  const { key, next } = $mol_view_tree2_prop_parts(prop);
  return prop.struct("(,)", [
    ...key ? key.length > 1 ? [prop.data(key.slice(1))] : [prop.struct("id")] : [],
    ...bidi && next ? [prop.struct("next")] : []
  ]);
}
function call_method_name(child) {
  return child.struct("[]", [
    child.data(name_of.call(this, child))
  ]);
}
function call_of(bind, bidi = true) {
  if (bind.kids.length === 0) {
    return import_mol_tree2.default.$mol_fail(
      err`Required one child at ${bind.span}`
    );
  }
  const chain = [bind.struct("this")];
  for (const child of bind.kids) {
    chain.push(
      call_method_name.call(this, child),
      args_of.call(this, child, bidi)
    );
  }
  return bind.struct("()", chain);
}
var localized_string = import_mol_tree2.default.$mol_tree2_from_string(`
		()
			this
			[] \\$
			[] \\$mol_locale
			[] \\text
			(,) #key
	`, "localized_string");
function klass_body(acc, prop) {
  const { klass, members, addons } = acc;
  const { name, key, next } = $mol_view_tree2_prop_parts(prop);
  const decorate = () => {
    return prop.struct("()", [
      prop.struct(key ? "$mol_mem_key" : "$mol_mem"),
      prop.struct("(,)", [
        prop.struct("()", [
          klass.struct("$"),
          prop.struct("[]", [
            klass.data(klass.type)
          ]),
          prop.struct("[]", [
            prop.data("prototype")
          ])
        ]),
        prop.data(name)
      ])
    ]);
  };
  const op = prop.kids[0];
  const is_delegate = op?.type === "<=>" || op?.type === "=";
  if (!is_delegate && next)
    addons.push(decorate());
  const val = prop.hack({
    "@": (locale, belt, context) => {
      const chain = context.chain?.join("_");
      return localized_string.hack({
        "#key": (key2) => [locale.data(`${klass.type}_${name}${chain ? `_${chain}` : ""}`)]
      });
    },
    "<=": (bind) => [call_of.call(this, bind, false)],
    "<=>": (bind) => [call_of.call(this, bind, true)],
    "=>": (bind) => [],
    "^": (ref) => [
      ref.struct("...", [
        ref.struct("()", [
          ref.struct(ref.kids[0]?.type ? "this" : "super"),
          ref.struct("[]", [
            ref.data(ref.kids[0]?.type ? name_of.call(this, ref.kids[0]) : name)
          ]),
          ref.kids[0]?.type ? params_of.call(this, ref.kids[0]) : ref.struct("(,)")
        ])
      ])
    ],
    "=": (bind) => [bind.struct("()", [
      bind.struct("this"),
      call_method_name.call(this, bind.kids[0]),
      params_of.call(this, bind.kids[0]),
      call_method_name.call(this, bind.kids[0].kids[0]),
      args_of.call(this, bind.kids[0].kids[0])
    ])],
    "": (input, belt, context) => {
      if (input.type[0] === "*") {
        return [
          input.struct(
            "{,}",
            input.kids.map((field) => {
              if (field.type === "^")
                return field.list([field]).hack(belt)[0];
              const field_name = (field.type || field.value).replace(/\?\w*$/, "");
              return field.struct(":", [
                field.data(field_name),
                field.kids[0].type === "<=>" ? field.struct("=>", [
                  params_of.call(this, field),
                  ...field.hack(belt)
                ]) : field.hack(belt, { ...context, chain: [...context.chain ?? [], field_name] })[0]
              ]);
            }).filter(import_mol_tree2.default.$mol_guard_defined)
          )
        ];
      }
      if (input.type[0] === "/")
        return [
          input.struct("[,]", input.hack(belt))
        ];
      if (input.type && import_mol_tree2.default.$mol_view_tree2_value_number(input.type))
        return [
          input
        ];
      if (import_mol_tree2.default.$mol_view_tree2_class_match(input)) {
        if (!next)
          addons.push(decorate());
        const overrides = [];
        for (const over of input.kids) {
          if (over.type[0] === "/")
            continue;
          const bind = over.kids[0];
          if (bind.type === "=>")
            continue;
          const over_name = name_of.call(this, over);
          const body = [
            args_of.call(this, over),
            over.struct("()", over.hack(belt, { chain: [over.type] }))
          ];
          overrides.push(
            over.struct("=", [
              over.struct("()", [
                over.struct("obj"),
                over.struct("[]", [
                  over.data(over_name)
                ])
              ]),
              over.struct("=>", body)
            ])
          );
        }
        return [
          input.struct("const", [
            input.struct("obj"),
            input.struct("new", [
              input.struct("this"),
              input.struct("[]", [
                input.data("$")
              ]),
              input.struct("[]", [
                input.data(input.type.replace(/<.+>/g, ""))
              ]),
              input.struct("(,)", input.select("/", null).hack(belt))
            ])
          ]),
          ...overrides,
          input.struct("obj")
        ];
      }
      return [input];
    }
  });
  members.push(
    prop.struct(".", [
      prop.data(name),
      params_of.call(this, prop),
      prop.struct("{;}", [
        ...next && !is_delegate ? [
          prop.struct("if", [
            prop.struct("(!==)", [
              prop.struct("next"),
              prop.struct("undefined")
            ]),
            prop.struct("return", [
              prop.struct("next")
            ])
          ])
        ] : [],
        ...val.slice(0, -1),
        prop.struct("return", val.slice(-1))
      ])
    ])
  );
  return acc;
}
function $mol_view_tree2_to_js(descr) {
  descr = import_mol_tree2.default.$mol_view_tree2_classes(descr);
  const definitions = [];
  for (const klass of descr.kids) {
    const parent = klass.kids[0];
    const props = import_mol_tree2.default.$mol_view_tree2_class_props(klass);
    const addons = [];
    const members = [];
    const acc = { klass, addons, members };
    for (const prop of props) {
      try {
        klass_body.call(this, acc, prop);
      } catch (e) {
        e.message += ` at ${prop.span}`;
        $mol_fail_hidden(e);
      }
    }
    definitions.push(
      klass.struct("class", [
        klass.struct(klass.type),
        parent.struct("extends", [
          parent.struct("()", [
            parent.struct("$"),
            parent.struct("[]", [
              parent.data(parent.type)
            ])
          ])
        ]),
        klass.struct("{}", members)
      ]),
      klass.struct("=", [
        klass.struct("()", [
          klass.struct("$"),
          klass.struct("[]", [
            klass.data(klass.type)
          ])
        ]),
        klass.struct(klass.type)
      ]),
      ...addons,
      parent.struct("export", [
        klass.struct("{,}", [
          parent.struct(klass.type)
        ])
      ])
    );
  }
  return descr.list([
    descr.struct(";", definitions)
  ]);
}

// vite-plugin-mam/text.ts
function $mol_tree2_js_to_text(js) {
  function sequence(open, separator, close) {
    return (input, belt) => [
      input.struct("line", [
        ...open ? [input.data(open)] : [],
        input.struct(
          separator && input.kids.length > 2 ? "indent" : "line",
          [].concat(
            ...input.kids.map((kid, index) => [
              kid.struct("line", [
                ...kid.list([kid]).hack(belt),
                ...separator && index < input.kids.length - 1 ? [input.data(separator)] : []
              ])
            ])
          )
        ),
        ...close ? [input.data(close)] : []
      ])
    ];
  }
  function block(open, separator, close) {
    return (input, belt) => [
      ...open ? [input.data(open)] : [],
      ...input.kids.length === 0 ? [] : [input.struct(
        "indent",
        input.kids.map(
          (kid, index) => kid.struct("line", [
            ...kid.list([kid]).hack(belt),
            ...separator ? [input.data(separator)] : []
          ])
        )
      )],
      ...close ? [input.data(close)] : []
    ];
  }
  function duplet(open, separator, close) {
    return (input, belt) => [
      input.struct("line", [
        ...open ? [input.data(open)] : [],
        ...input.list(input.kids.slice(0, 1)).hack(belt),
        ...separator && input.kids.length > 1 ? [input.data(separator)] : [],
        ...input.list(input.kids.slice(1, 2)).hack(belt),
        ...close ? [input.data(close)] : []
      ])
    ];
  }
  function triplet(open, separator12, separator23, close) {
    return (input, belt) => [
      input.struct("line", [
        ...open ? [input.data(open)] : [],
        ...input.list(input.kids.slice(0, 1)).hack(belt),
        ...separator12 && input.kids.length > 1 ? [input.data(separator12)] : [],
        ...input.list(input.kids.slice(1, 2)).hack(belt),
        ...separator23 && input.kids.length > 2 ? [input.data(separator23)] : [],
        ...input.list(input.kids.slice(2, 3)).hack(belt),
        ...close ? [input.data(close)] : []
      ])
    ];
  }
  return js.list(js.hack({
    "+": sequence("+"),
    "-": sequence("-"),
    "!": sequence("!"),
    "~": sequence("~"),
    "export": sequence("export "),
    "return": sequence("return "),
    "break": sequence("break "),
    "continue": sequence("continue "),
    "yield": sequence("yield "),
    "yield*": sequence("yield* "),
    "await": sequence("await "),
    "void": sequence("void "),
    "delete": sequence("delete "),
    "typeof": sequence("typeof "),
    "new": sequence("new "),
    "...": sequence("..."),
    "@++": sequence("", "", "++"),
    "@--": sequence("", "", "--"),
    "(in)": sequence("(", " in ", ")"),
    "(instanceof)": sequence("(", " instanceof ", ")"),
    "(+)": sequence("(", " + ", ")"),
    "(-)": sequence("(", " - ", ")"),
    "(*)": sequence("(", " * ", ")"),
    "(/)": sequence("(", " / ", ")"),
    "(%)": sequence("(", " % ", ")"),
    "(**)": sequence("(", " ** ", ")"),
    "(<)": sequence("(", " < ", ")"),
    "(<=)": sequence("(", " <= ", ")"),
    "(>)": sequence("(", " > ", ")"),
    "(>=)": sequence("(", " >= ", ")"),
    "(==)": sequence("(", " == ", ")"),
    "(!=)": sequence("(", " != ", ")"),
    "(===)": sequence("(", " === ", ")"),
    "(!==)": sequence("(", " !== ", ")"),
    "(<<)": sequence("(", " << ", ")"),
    "(>>)": sequence("(", " >> ", ")"),
    "(>>>)": sequence("(", " >>> ", ")"),
    "(&)": sequence("(", " & ", ")"),
    "(|)": sequence("(", " | ", ")"),
    "(^)": sequence("(", " ^ ", ")"),
    "(&&)": sequence("(", " && ", ")"),
    "(||)": sequence("(", " || ", ")"),
    "(,)": sequence("(", ", ", ")"),
    "{;}": block("{", ";", "}"),
    ";": block("", ";", ""),
    "[,]": sequence("[", ", ", "]"),
    "{,}": sequence("{", ", ", "}"),
    "()": sequence("(", "", ")"),
    "{}": block("{", "", "}"),
    "[]": (input, belt) => {
      const first = input.kids[0];
      if (first.type)
        return sequence("[", "", "]")(input, belt);
      else
        return [input.data("." + first.text())];
    },
    ":": (input, belt) => {
      const first = input.kids[0];
      if (first.type)
        return duplet("[", "]: ")(input, belt);
      else
        return duplet("", ": ")(input, belt);
    },
    "let": duplet("let ", " = "),
    "const": duplet("const ", " = "),
    "var": duplet("var ", " = "),
    "=": duplet("", " = "),
    "+=": duplet("", " += "),
    "-=": duplet("", " -= "),
    "*=": duplet("", " *= "),
    "/=": duplet("", " /= "),
    "%=": duplet("", " %= "),
    "**=": duplet("", " **= "),
    "<<=": duplet("", " <<= "),
    ">>=": duplet("", " >>= "),
    ">>>=": duplet("", " >>>= "),
    "&=": duplet("", " &= "),
    "|=": duplet("", " |= "),
    "^=": duplet("", " ^= "),
    "&&=": duplet("", " &&= "),
    "||=": duplet("", " ||= "),
    "=>": duplet("", " => "),
    "async=>": duplet("async ", " => "),
    "function": triplet("function "),
    "function*": triplet("function* "),
    "async": triplet("async function "),
    "async*": triplet("async function* "),
    "class": triplet("class ", " "),
    "extends": sequence("extends ", "", " "),
    "if": triplet("if", " ", "else"),
    "?:": triplet("", " ? ", " : "),
    ".": (input, belt) => {
      const first = input.kids[0];
      if (first.type)
        return triplet("[", "]")(input, belt);
      else
        return [
          input.data(first.text()),
          ...input.list(input.kids.slice(1)).hack(belt)
        ];
    },
    "get": triplet("get [", "]"),
    "set": triplet("set [", "]"),
    "static": triplet("static [", "]"),
    "/./": sequence(),
    ".global": sequence("g"),
    ".multiline": sequence("m"),
    ".ignoreCase": sequence("i"),
    ".source": (input, belt) => [
      input.data("/"),
      input.data(JSON.stringify(input.text()).slice(1, -1)),
      input.data("/")
    ],
    "``": (input, belt) => {
      return [
        input.struct("line", [
          input.data("`"),
          ...[].concat(...input.kids.map((kid) => {
            if (kid.type) {
              return [
                kid.data("${"),
                ...kid.list([kid]).hack(belt),
                kid.data("}")
              ];
            } else {
              return [
                input.data(JSON.stringify(kid.text()).slice(1, -1))
              ];
            }
          })),
          input.data("`")
        ])
      ];
    },
    "": (input, belt) => {
      if (!input.type)
        return [
          input.data(JSON.stringify(input.text()))
        ];
      if (/^[\w$#][\w0-9$]*$/i.test(input.type))
        return [
          input.data(input.type)
          // ... input.hack( context ),
        ];
      if ($mol_view_tree2_value_number(input.type))
        return [
          input.data(input.type)
        ];
      $mol_fail(new SyntaxError(`Wrong node type`));
    }
  }));
}

// vite-plugin-mam/treepackage.ts
var import_mol_tree22 = __toESM(require_web(), 1);
var export_$ = import_mol_tree22.default;
export {
  export_$ as $,
  $mol_tree2_js_to_text,
  $mol_view_tree2_to_js
};
