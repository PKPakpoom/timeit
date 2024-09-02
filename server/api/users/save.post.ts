import { serverSupabaseClient } from '#supabase/server';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email, tasks, totalTime } = body

    const client = await serverSupabaseClient(event);
    const { data, error } = await client.from('Users').select().eq('email', email);
    if (error) {
        return error
    }
    if (data.length > 0) {
        await client.from('Users').update({ tasks, total_time: totalTime }).eq('email', email);
    } else {
        await client.from('Users').insert([{ email, tasks, total_time: totalTime }]);
    }

})