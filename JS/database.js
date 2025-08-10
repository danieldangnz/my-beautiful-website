import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseUrl = 'https://crrfadlheitbizixayvs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNycmZhZGxoZWl0Yml6aXhheXZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MTc4NDIsImV4cCI6MjA3MDM5Mzg0Mn0.woCsvy34DTUi4PODaWEOTSpBSB7oSNZ0OCfV845nI-M';
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getMessageFromDB() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return data;  
}





export async function insertMessageToDB(name, email, message) {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      { name: name, email: email, message: message }
    ]);

  if (error) {
    console.error('Error inserting message:', error);
    return null;
  }

  return data;
}

export async function deleteMessageFromDB(id) {
  const { data, error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting message:', error);
    return null;
  }

  return data;
}

export async function updateMessageInDB(id, name, email, message) {
  const { data, error } = await supabase
    .from('messages')
    .update({ name: name, email: email, message: message })
    .eq('id', id);

  if (error) {
    console.error('Error updating message:', error);
    return null;
  }

  return data;
}

export async function getMessageById(id) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching message by ID:', error);
    return null;
  }

  return data;
}

export async function getMessagesByEmail(email) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('email', email);

  if (error) {
    console.error('Error fetching messages by email:', error);
    return [];
  }

  return data;
}

export async function getMessagesByName(name) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .ilike('name', `%${name}%`);

  if (error) {
    console.error('Error fetching messages by name:', error);
    return [];
  }

  return data;
}

export async function getMessagesByDateRange(startDate, endDate) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .gte('created_at', startDate)
    .lte('created_at', endDate);

  if (error) {
    console.error('Error fetching messages by date range:', error);
    return [];
  }

  return data;
}

export async function getMessagesByKeyword(keyword) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .ilike('message', `%${keyword}%`);

  if (error) {
    console.error('Error fetching messages by keyword:', error);
    return [];
  }

  return data;
}

export async function getMessagesByPagination(page, pageSize) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (error) {
    console.error('Error fetching messages with pagination:', error);
    return [];
  }

  return data;
}

export async function getMessagesBySorting(sortBy, sortOrder) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order(sortBy, { ascending: sortOrder === 'asc' });

  if (error) {
    console.error('Error fetching messages with sorting:', error);
    return [];
  }

  return data;
}

export async function getMessagesByFilter(filter) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .match(filter);

  if (error) {
    console.error('Error fetching messages with filter:', error);
    return [];
  }

  return data;
}

export async function getMessagesByComplexQuery(query) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(query);

  if (error) {
    console.error('Error fetching messages with complex query:', error);
    return [];
  }

  return data;
}

