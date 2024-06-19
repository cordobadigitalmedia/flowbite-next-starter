export interface Relation {
  id: string;
}

export interface Property {
  id: string;
  type: string;
  relation: Relation[];
  has_more: boolean;
}

export interface Title {
  href: string;
  plain_text: string;
  text: {
    content: string;
    link: null | string;
  };
}

export interface Properties {
  "Sub-item": Property;
  "Parent item": Property;
  Name: {
    id: string;
    type: string;
    title: Title[];
  };
  Slug: {
    formula: {
      string: string;
    };
  };
}

export interface Parent {
  type: string;
  database_id: string;
}

export interface Page {
  object: string;
  id: string;
  parent: Parent;
  properties: Properties;
  url: string;
  public_url: string | null;
}

export interface BasePage {
  id: string;
  title: string;
  slug: string;
}

export interface TreeNode {
  id: string;
  children: TreeNode[];
  title: string;
  slug: string;
}
