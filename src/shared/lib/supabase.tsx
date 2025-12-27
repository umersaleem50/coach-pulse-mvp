import { supabaseUrl } from "@/constants";
import { createClient } from "@supabase/supabase-js";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnZmpqcWFydmh5c2FtbnVwcmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyMTU4OTgsImV4cCI6MjA2MDc5MTg5OH0.vLTHM_q4kv0awqKG4mTq9QGh-QHDYmny8xB8MJtrq_4";
if (!supabaseKey) throw new Error("Please provide supabase key.");
export const supabase = createClient(supabaseUrl, supabaseKey);
