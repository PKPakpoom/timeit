import { serverSupabaseClient } from '#supabase/server';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email } = body;

    const client = await serverSupabaseClient(event);
    if (email) {
        const { data, error } = await client.from('Users').select().eq('email', email);
        if (error) {
            return error
        }
        return data
    }


})