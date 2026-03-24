export type ProjectContentBlock =
  | {
      type: "blockTitle";
      text: string;
    }
  | {
      type: "text";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
    }
  | {
      type: "quote";
      title?: string;
      text: string;
    };

export type ProjectContentSection = {
  id: string;
  title: string;
  blocks: ProjectContentBlock[];
};