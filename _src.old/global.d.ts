import { Database as DB } from '@/_src.old/lib/database.types';

declare global {
  type Database = DB;
  type Persona = DB['public']['Tables']['Personas']['Row'];
  type Chat = DB['public']['Tables']['Chats']['Row'];
  type Message = DB['public']['Tables']['Messages']['Row'];
}
