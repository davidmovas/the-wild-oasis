import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://bouqxkgsnepqhipsejmy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvdXF4a2dzbmVwcWhpcHNlam15Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjgwODE5MiwiZXhwIjoyMDY4Mzg0MTkyfQ.wXi7i1xsuuo6KKgH46Br-a-NA9JYRDzgUtym4B4kctQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;