export interface PageVisit {
  id: number;
  page_path: string;
  visit_date: string;
  visitor_country: string | null;
  total_visits: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface CreateVisitData {
  pagePath: string;
  country: string;
  date: string;
}

export interface VisitStats {
  totalPages: number;
  totalDays: number;
  totalVisits: number;
}
