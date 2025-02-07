import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Clergy } from '../models/clergy.model';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClergyService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'YOUR_SUPABASE_URL',
      'YOUR_SUPABASE_KEY'
    );
  }

  searchClergy(query: string): Observable<Clergy[]> {
    return from(this.supabase
      .from('clergy')
      .select('*')
      .or(`name.ilike.%${query}%, diocese.ilike.%${query}%`)
      .eq('status', 'approved')
      .order('name')
      .limit(10));
  }

  getPendingClergy(): Observable<Clergy[]> {
    return from(this.supabase
      .from('clergy')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false }));
  }

  getStatistics(): Observable<any> {
    return from(this.supabase
      .from('clergy')
      .select('*'))
      .pipe(
        map(clergy => ({
          total: clergy.length,
          priests: clergy.filter(c => c.type === 'priest').length,
          bishops: clergy.filter(c => c.type === 'bishop').length,
          deacons: clergy.filter(c => c.type === 'deacon').length
        }))
      );
  }

  getClergy(id: string): Observable<Clergy> {
    return from(this.supabase
      .from('clergy')
      .select('*')
      .eq('id', id)
      .single());
  }

  createClergy(clergy: Partial<Clergy>): Observable<Clergy> {
    return from(this.supabase
      .from('clergy')
      .insert([{ ...clergy, status: 'pending' }])
      .single());
  }

  updateClergy(id: string, clergy: Partial<Clergy>): Observable<Clergy> {
    return from(this.supabase
      .from('clergy')
      .update(clergy)
      .eq('id', id)
      .single());
  }

  deleteClergy(id: string): Observable<void> {
    return from(this.supabase
      .from('clergy')
      .delete()
      .eq('id', id));
  }

  uploadFile(file: File, bucket: string): Promise<string> {
    const fileName = `${Date.now()}-${file.name}`;
    return this.supabase.storage
      .from(bucket)
      .upload(fileName, file)
      .then(({ data }) => data.path);
  }
}