
interface BookmarksFilter {
  summary: string | null;
  description: string | null;
  created_from: Date | null;
  created_to: Date | null;
  is_done: boolean | null;
  tags: string[];
  tags_all: boolean | null;
  start: number | null;
  page_size: number | null;
}

export default BookmarksFilter;