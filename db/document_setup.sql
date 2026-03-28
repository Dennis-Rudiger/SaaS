-- 1. Create storage bucket for documents if it doesn't exist
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true) ON CONFLICT (id) DO NOTHING;

-- 2. Policies for documents table
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON public.documents;
CREATE POLICY "Enable all access for authenticated users" ON public.documents FOR ALL USING (auth.role() = 'authenticated');

-- 3. Policies for storage objects
DROP POLICY IF EXISTS "Enable all access for documents storage" ON storage.objects;
CREATE POLICY "Enable all access for documents storage" ON storage.objects FOR ALL USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

-- 4. Fix foreign key relationship to public.profiles so that the frontend join works
ALTER TABLE public.documents DROP CONSTRAINT IF EXISTS documents_uploaded_by_fkey;
ALTER TABLE public.documents ADD CONSTRAINT documents_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.profiles(id);

-- 5. Force schema cache to reload
NOTIFY pgrst, 'reload schema';
