CREATE POLICY "Users can update their own visualization files"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'visualizations' AND auth.uid()::text = (storage.foldername(name))[1])
WITH CHECK (bucket_id = 'visualizations' AND auth.uid()::text = (storage.foldername(name))[1]);