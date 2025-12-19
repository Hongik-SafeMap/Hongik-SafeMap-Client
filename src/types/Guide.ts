export interface Actions {
  title: string;
  guide: string;
}

export interface GuideItem {
  id: string;
  title: string;
  detail: string;
  category: string;
  actions: Actions[];
  supplies: string[];
  warnings: string[];
}
