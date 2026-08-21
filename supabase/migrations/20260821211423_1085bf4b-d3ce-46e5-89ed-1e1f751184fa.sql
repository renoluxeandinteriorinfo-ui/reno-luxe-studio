CREATE POLICY "Users read own visualization files" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'visualizations' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users upload own visualization files" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'visualizations' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users delete own visualization files" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'visualizations' AND (storage.foldername(name))[1] = auth.uid()::text);