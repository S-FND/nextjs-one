// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ysyytjgrbmsfykgbjdgo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzeXl0amdyYm1zZnlrZ2JqZGdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NzY2MDUsImV4cCI6MjA2MDE1MjYwNX0.7ylq7NxJAnlMHYc5skre89M8zZ-do8FJdEqQGilX0TA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);