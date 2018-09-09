declare module 'genui' {
  export type ActionProps = {
    key: string;
    content: string;
    positive?: boolean;
    color?: string;
    icon?: string;
  };

  export interface PickerItem {
    value: string;
    label: string;
  }

  export class Icon extends React.Component<any> {}
  export class Button extends React.Component<any> {}
  export class TableBuilder extends React.Component<any> {}
  export class TableCell extends React.Component<any> {}
  export class TableHeaderCell extends React.Component<any> {}
  export class TableBody extends React.Component<any> {}
  export class TableFooter extends React.Component<any> {}
  export class TableHeader extends React.Component<any> {}
  export class TableRow extends React.Component<any> {}
  export class Table extends React.Component<any> {
    static Cell: typeof TableCell;
    static Body: typeof TableBody;
    static Footer: typeof TableFooter;
    static Header: typeof TableHeader;
    static HeaderCell: typeof TableHeaderCell;
    static Row: typeof TableRow;
  }

  export class TableList extends React.Component<any> {}
  export class Box extends React.Component<any> {}
  export class Label extends React.Component<any> {}
  export class Input extends React.Component<any> {}
  export class LabelAdder extends React.Component<any> {}
  export class Dropdown extends React.Component<any> {}
  export class Heading extends React.Component<any> {}
  export class StatusColor extends React.Component<any> {}
  export class Badge extends React.Component<any> {}
  export class Modal extends React.Component<any> {}
  export class Portal extends React.Component<any> {}
  export class Field extends React.Component<any> {}
  export class Confirm extends React.Component<any> {}
  export class ListContent extends React.Component<any> {}
  export class ListHeader extends React.Component<any> {}
  export class ListIcon extends React.Component<any> {}
  export class ListItem extends React.Component<any> {}
  export class List extends React.Component<any> {
    static Content: typeof ListContent;
    static Header: typeof ListHeader;
    static Icon: typeof ListIcon;
    static Item: typeof ListItem;
  }
  export class MessageHeader extends React.Component<any> {}
  export class Message extends React.Component<any> {
    static Header: typeof MessageHeader;
  }
  export class Picker extends React.Component<any> {}
  export class Select extends React.Component<any> {}
}
