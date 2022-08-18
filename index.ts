/*******************************************************************************
 * @author      : 程巍巍 (littocats@gmail.com)
 * @created     : Thursday Aug 18, 2022 09:58:45 CST
 *
 * @description : index
 *
 * [Feature]
 *
 ******************************************************************************/

namespace Phonetic {
  export interface Table {
    readonly name: string;
    readonly code: string;
    readonly data: [string, string][];
  }
}
interface Phonetic {
  attach(element: HTMLElement): Phonetic;
  detach(element: HTMLElement): Phonetic;

  table(): Phonetic.Table;
  table(table: Phonetic.Table): Phonetic;
}

function Phonetic(): Phonetic {
  const phonetic = {
    attach: $attach,
    detach: $detach,
    table: $table,
  };

  let name = "@";
  let code = "@";
  const data: [string, string][] = [];

  /**
   * 1. 存在未确定的最终结果的输入时，用于显不键入的字符
   * 2. 显示备选符号框，提示后续该键入的字符
   */
  const anchor = Anchor(data);
  setup();
  return phonetic;

  function $attach(element: Element): Phonetic {
    element.addEventListener("focus", onFocus);
    element.addEventListener("blur", onBlur);

    if (element === document.activeElement) {
      element.addEventListener("keydown", onKeyDown);
      element.addEventListener("paste", onPaste);
    }
    return phonetic;
  }
  function $detach(element: Element): Phonetic {
    element.removeEventListener("focus", onFocus);
    element.removeEventListener("blur", onBlur);
    element.removeEventListener("keydown", onKeyDown);
    element.removeEventListener("paste", onPaste);

    return phonetic;
  }

  function $table(table?: Phonetic.Table): any {
    if (table === undefined) return { name, code, data };

    name = table.name;
    code = table.code;
    data.splice(0, data.length);
    for (const entry of table.data) data.push([...entry]);

    return phonetic;
  }

  function onFocus(evt: FocusEvent) {
    const element = evt.currentTarget;
    element.addEventListener("keydown", onKeyDown);
    element.addEventListener("paste", onPaste);
  }

  function onBlur(evt: FocusEvent) {
    const element = evt.currentTarget;
    element.removeEventListener("keypress", onKeyDown);
    element.removeEventListener("paste", onPaste);
    anchor.detach();
  }

  /**
   * 1. Enter 键选取备选框中的第一个符号
   * 2. Backspace 时，如果 anchor 中的存在缓存的字符，先删缓存的字符
   * @param evt
   */
  function onKeyDown(evt: KeyboardEvent) {
    const { altKey, ctrlKey, metaKey, key, defaultPrevented } = evt;
    if (defaultPrevented || altKey || ctrlKey || metaKey) return;
    if (key === "Backspace" && anchor.remove()) return evt.preventDefault();

    // TODO:
    if (key === "Enter") {
      anchor.detach();
      return;
    }

    if (key.length !== 1) return;
    evt.preventDefault();
    evt.stopPropagation();
    anchor.append(key);
  }
  function onPaste(evt: ClipboardEvent) {
    // TODO: 过滤 table 中包含的符号，并插入到 anchor 前面
  }
}

interface Anchor {
  /**
   * 添加一个字符
   * @param char
   * @return 需要插入的输入结果
   */
  append(char: string);

  /**
   * 移除一个字符，如果没有字符可以移除了，返回 false
   */
  remove(): boolean;

  attach();
  detach();
}

function Anchor(db: [string, string][]): Anchor {
  const anchor = document.createElement("div");
  anchor.id = "phonetic";
  anchor.contentEditable = "false";
  anchor.dataset.data = "";

  return {
    append,
    remove,
    attach,
    detach,
  };

  /**
   *
   * @param char
   */
  function append(char: string) {
    let data = anchor.dataset.data;

    if (/\s/.test(char)) {
      insert((data && match(data).shift()) || ["", char]);
      anchor.dataset.data = "";
      attach();
      return;
    }

    const entries = match(data + char);
    if (entries.length === 0) {
      anchor.dataset.data = "";
      const entry = data ? find(data) : null;
      if (entry) insert(entry);
      append(char);
    } else if (entries.length === 1) {
      const entry = entries[0];
      if (entry[0] === data + char) {
        anchor.dataset.data = "";
        insert(entries[0]);
      } else {
        anchor.dataset.data += char;
      }
    } else {
      anchor.dataset.data += char;
    }

    attach();
  }

  function remove(): boolean {
    const data = anchor.dataset.data;
    anchor.dataset.data = data.slice(1, -1);
    attach();
    return data.length > 0;
  }

  // 如果 data 长度不等 0, 移动 anchor 到 caret 前
  function attach() {
    const prefix = anchor.dataset.data.trim();
    anchor.dataset.data = prefix;

    if (prefix.length === 0) return anchor.remove();
    const selection = document.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(anchor);
    range.collapse(true);

    // 如果匹配到了多个，显示备选列表
    const entries = prefix ? match(prefix) : [];
    anchor.innerHTML =
      entries.length === 0
        ? ""
        : `<div>${entries
            .map(
              ([c, s]) =>
                `<div data-prefix="${prefix}" data-suffix="${c.slice(
                  prefix.length
                )}">${s}</div>`
            )
            .join("")}</div>`;
  }

  function detach() {
    anchor.dataset.data = "";
    attach();
  }

  /**
   * 选种备选符号
   */
  function upset(index: number = 0) {}

  function match(prefix: string) {
    return db.filter(([sc]) => sc.startsWith(prefix));
  }

  function find(shortcut: string) {
    return db.find(([sc]) => sc === shortcut);
  }

  function insert(entry: [string, string]) {
    document.execCommand("insertText", false, entry[1]);
  }
}

/**
 * 向 head 中注入需要的样式
 */
function setup() {
  const id =
    setup.prototype.id ||
    (setup.prototype.id = Math.random().toString(36).slice(2));

  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.innerHTML = `
      #phonetic {
          display: inline;
          width: 0px;
          height: 0px;
          overflow: visible;
      }
      #phonetic::before {
          content: attr(data-data);
          background-color: navajowhite;
      }
      #phonetic > div {
          position: absolute;
          background-color: aliceblue;
          border: 1px solid darkgray;
          border-radius: 3px;
          padding: 3px 7px;
          display: flex;
          column-gap: 1em;
      }
      #phonetic > div > div {
          position: relative;
          line-height: 1em;
          height: 2em;
      }
      #phonetic > div > div::before,
      #phonetic > div > div::after {
          position: absolute;
          font-size: 0.7em;
          top: 50%;
      }
      #phonetic > div > div::before {
          content: attr(data-prefix);
          right: 50%;
          color: darkgrey;
      }
      #phonetic > div > div::after {
          content: attr(data-suffix);
          left: 50%;
          color: red;
      }
  `.replace(/\s\s+/g, "");
  document.head.append(style);
}

export { Phonetic };
export default Phonetic;
